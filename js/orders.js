import { getProductDetails, loadProductsFetch } from '../data/products.js'
import {formatCurrency } from './utils.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'



export const orders = JSON.parse(localStorage.getItem('orders'))
                    || []

export function addOrder(order){
    orders.unshift(order)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}

function renderOrder() {
    let ordersHTML = ''

  orders.forEach((order) => {
        ordersHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM, D')} </div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>€ ${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
        `
        const orderProducts = order.products
        orderProducts.forEach((product) => {
          let productDetails = getProductDetails(product.productId)
          
          ordersHTML += `
            <div class="product-image-container">
              <img src=" ${productDetails.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productDetails.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:  ${dayjs(product.estimatedDeliveryTime).format('MMMM, D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId= ${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
        })

    ordersHTML += `
            </div>
        </div>`
    
    document.querySelector('.js-order-grid').innerHTML = ordersHTML
    })
}


async function loadPage(){
  try {
      // throw 'error 1'
      await loadProductsFetch()
      const value = await new Promise((resolve, reject) => {
              resolve('value3')
      })

  } catch (error) {
      console.log('Unexpected error. Please try again later:' + error)
  }

  renderOrder()
}

loadPage()