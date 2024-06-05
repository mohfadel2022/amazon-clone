import * as cartModule from '/js/cart.js'
import { getProductDetails } from '/data/products.js'
import { formatCurrency } from '/js/utils.js'
import { deliveryOptions } from '/data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

// let orderSummryDIV = document.querySelector('.js-order-summary')

function updateCheckoutQuatity(){
    let cartQty = 0
    cartModule.cart.forEach((cartItem) => {  
            cartQty += cartItem.quantity
    })

    if(document.querySelector('.js-checkout-quantity')!== null){

        document.querySelector('.js-checkout-quantity').innerHTML = cartQty+ " items"
    }

}

updateCheckoutQuatity()

function deliveryOptionaHTML(cartItem){
    let html = ''
    let deliveryDate

    deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs()
        const isChecked = (deliveryOption.id === cartItem.deliveryOptionId)? 'checked' : ''
        const dateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')
        const priceString = (deliveryOption.priceCents === 0)? "FREE": `€ ${formatCurrency(deliveryOption.priceCents)} -`
        if (deliveryOption.id === cartItem.deliveryOptionId){ deliveryDate = dateString }

        html += `<div class="delivery-option js-delivery-option"
                    data-product-id= "${cartItem.productId}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>`
    })

    return {
        'html': html,
        'deliveryDate': deliveryDate
    }

}

export function renderOrderSummary(){

    let cartSummaryHTML = ''

    cartModule.cart.forEach(cartItem => {
        const productId = cartItem.productId
        const cartItemDetails = getProductDetails(productId)

        cartSummaryHTML +=  `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date js-deliver-date">  
                Delivery date: ${deliveryOptionaHTML(cartItem).deliveryDate}          
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${cartItemDetails.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${cartItemDetails.name}
                    </div>
                    <div class="product-price">
                    ${cartItemDetails.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${productId}">
                        <span>
                            Quantity: <span class="quantity-label js-product-quantity-span-${productId}">
                            ${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" 
                            data-product-id="${productId}">
                            Update
                        </span>
                        <input class="quantity-input js-input-quantity-${productId}">
                        <span class="save-quantity-link link-primary js-save-link" 
                            data-product-id="${productId}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" 
                            data-product-id="${productId}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div>
                        ${deliveryOptionaHTML(cartItem).html}
                    </div>
                </div>
            </div>
        </div>
        `

    });
    

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML
    // updateCheckoutQuatity()


    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
                cartModule.removeFromCart(productId)

                const container = document.querySelector(`.js-cart-item-container-${productId}`)
                
                container.remove()
                updateCheckoutQuatity()
                renderPaymentSummary()

            })
        }
    )

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
                let cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
                cartItemContainer.classList.add('is-editing-quantity')
                const quantity = document.querySelector(`.js-product-quantity-${productId}`)
            })
        }
    )

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
                let cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
                const quantitySpan = document.querySelector(`.js-product-quantity-span-${productId}`)
                cartItemContainer.classList.remove('is-editing-quantity')
                let newQty = Number(document.querySelector(`.js-input-quantity-${productId}`).value)
                quantitySpan.innerText = newQty

                cartModule.cart.forEach((cartItem) => {
                    if (productId === cartItem.productId){
                        cartItem.quantity = newQty
                    }
                })
                localStorage.setItem('cart', JSON.stringify(cartModule.cart) )
                updateCheckoutQuatity()
                renderPaymentSummary()
            })

        }
    )

    document.querySelectorAll('.js-delivery-option')
        .forEach((el) => {
            el.addEventListener('click', () => {
                const {productId, deliveryOptionId}  = el.dataset
                
                cartModule.updateDeliveryOption(productId, deliveryOptionId)
                renderOrderSummary()
                renderPaymentSummary()
            })

        })
}   
