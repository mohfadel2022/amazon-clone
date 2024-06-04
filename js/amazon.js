import * as cartModule from '/js/cart.js'
import {products} from '/data/products.js'
import {formatCurrency} from '/js/utils.js'


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


