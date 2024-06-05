import * as cartModule from './cart.js'
import { products, loadProductsFetch}  from '../data/products.js'


// loadProducts(renderPageHTML)

function renderPageHTML(){
  let productsGRID = document.querySelector('.js-products-grid')
  let productsHTML = ''

  products.forEach((product) => {
    productsHTML += `
      
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-id= "${product.id}">
          Add to Cart
        </button>
      </div>
      `
  }) 

  productsGRID.innerHTML = productsHTML
  cartModule.updateCartQuatity('cart')

  document.querySelectorAll('.js-add-to-cart').forEach((btn) => {
      btn.addEventListener('click', ()=>{
          const productId = btn.dataset.id        
          cartModule.addToCart(productId)
          cartModule.updateCartQuatity()
        
      })
  })
}


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
  renderPageHTML()
}


loadPage()