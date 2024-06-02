export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2
    }
]

export function addToCart(productId){
    let matchedItem
        
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


export function removeFromCart(productId){
    const newCart = []

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    })
    
    cart = newCart
}