export const cart = []

export function addToCart(productId){
    let matchedItem = ''
        
        cart.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchedItem = catItem
            }
        })
        if (matchedItem){
            matchedItem.quantity += 1
        } else{
            cart.push({
                productId: productId,
                quantity: 1
            })        
        }

}

export function updateCartQuatity(){
    let cartQty = 0
    cart.forEach((cartItem) => {  
            cartQty += cartItem.quantity
    })
    cartQuantity.innerHTML = cartQty
}
