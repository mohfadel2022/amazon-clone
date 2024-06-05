import { cart } from "../cart.js"
import { getProductDetails } from '../../data/products.js'
import { getDeliveryDetails } from '../../data/deliveryOptions.js'
import { formatCurrency } from "../utils.js"
import { addOrder } from "../orders.js"


let paymentSummryDIV = document.querySelector('.js-payment-summary')


function calculatePayments(){
    
    let total = 0
    let shippingCost = 0
    let itemsQty = 0

    cart.forEach((cartItem) => {
        const product = getProductDetails(cartItem.productId)
        const deliveryOption =  getDeliveryDetails(cartItem.deliveryOptionId)

        total += cartItem.quantity * product.priceCents
        shippingCost += deliveryOption.priceCents
        itemsQty += cartItem.quantity
    })
    
    const totalBeforeTax = total + shippingCost
    const tax = totalBeforeTax * 0.1
    const orderTotal = totalBeforeTax + tax

    return {
        'itemsQuatity': itemsQty,
        'total': formatCurrency(total),
        'shippingCost': formatCurrency(shippingCost),
        'totalBeforeTax': formatCurrency(totalBeforeTax),
        'tax': formatCurrency(tax),
        'orderTotal': formatCurrency(orderTotal)
    }
}

export function renderPaymentSummary(){

    const orderSummary = calculatePayments()

    paymentSummryDIV.innerHTML =  `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${orderSummary.itemsQuatity}):</div>
            <div class="payment-summary-money">€ ${orderSummary.total}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">€ ${orderSummary.shippingCost}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">€ ${orderSummary.totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">€ ${orderSummary.tax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">€ ${orderSummary.orderTotal}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
    `
    document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
            try {
                
                const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            })

            const order = await response.json()
            addOrder(order)
        } catch (error) {
            console.log(`Unexpected error ${error}. Try again later`)
        }
        window.location.href = 'orders.html'
    })
}


