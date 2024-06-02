import * as cartModule from '/js/cart.js'
import { products } from '/data/products.js'
import {formatCurrency} from '/js/utils.js'
import { deliveryOptions } from '/data/deliveryOptions.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let cartSummryDIV = document.querySelector('.js-order-summary')


function getProductDetails(productId){
    let matchedItem

    products.forEach((product) => {
        if(productId === product.id){
            matchedItem = product
        }
    })
    return matchedItem
}

function updateCartQuatity(){
    let cartQty = 0
    cartModule.cart.forEach((cartItem) => {  
            cartQty += cartItem.quantity
    })

    document.querySelector('.js-checkout-quantity').innerHTML = cartQty+ " items"

}

function deliverOptionaHTML(cartItem){
    let html = ''
    let deliveryDate

    deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs()
        const isChecked = (deliveryOption.id === cartItem.deliveryOptionId)? 'checked' : ''
        const dateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')
        const priceString = (deliveryOption.priceCents === 0)? "FREE": `€ ${formatCurrency(deliveryOption.priceCents)} -`
        if (deliveryOption.id === cartItem.deliveryOptionId){ deliveryDate = dateString }
        
        html += `<div class="delivery-option">
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

let cartSummaryHTML = ''

cartModule.cart.forEach(cartItem => {
    const productId = cartItem.productId
    const cartItemDetails = getProductDetails(productId)

    cartSummaryHTML +=  `
    <div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date js-deliver-date">  
            ${deliverOptionaHTML(cartItem).deliveryDate}          
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${cartItemDetails.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${cartItemDetails.name}
                </div>
                <div class="product-price">
                ${formatCurrency(cartItemDetails.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-product-quantity-${productId}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                        Update
                    </span>
                    <input class="quantity-input js-input-quantity-${productId}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                        Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div>
                    ${deliverOptionaHTML(cartItem).html}
                </div>
            </div>
        </div>
    </div>
    `
});

cartSummryDIV.innerHTML = cartSummaryHTML
updateCartQuatity()

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            cartModule.removeFromCart(productId)
            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove()
            updateCartQuatity()
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
            const quantityInput = document.querySelector(`.js-product-quantity-${productId}`)
            cartItemContainer.classList.remove('is-editing-quantity')
            let newQty = Number(document.querySelector(`.js-input-quantity-${productId}`).value)
            quantityInput.innerHTML = newQty

            cartModule.cart.forEach((cartItem) => {
                if (productId === cartItem.productId){
                    cartItem.quantity = newQty
                }
            })
            localStorage.setItem('cart', JSON.stringify(cartModule.cart) )
            updateCartQuatity()
        })

    }
)