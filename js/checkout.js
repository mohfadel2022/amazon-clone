import { loadCart } from './cart.js'
import { loadProductsFetch } from '../data/products.js'
import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
// import './cart-oop.js'
// import './cart-class.js'
// import '/data/backend-practice.js'


async function loadPage(){
    try {
        // throw 'error 1'
        await loadProductsFetch()
        const value = await new Promise((resolve, reject) => {
            // throw 'error 2'
            loadCart(() => {
                // reject('error 3')
                resolve('value3')
            })
        })

    } catch (error) {
        console.log('Unexpected error. Please try again later:' + error)
    }

    renderOrderSummary()
    renderPaymentSummary()
}


loadPage()