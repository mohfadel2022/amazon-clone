class Cart {
    
    cartItems
    #localStorageKey

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage()
// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
    }

    #loadFromStorage() {
        const storedCart = localStorage.getItem(this.#localStorageKey)
        if(storedCart){
            this.cartItems = JSON.parse(storedCart)
        } else{
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-",
                    quantity: 2,
                    deliveryOptionId: '1'
        
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 3,
                    deliveryOptionId: '3'
                    
                }
            ]
        }
        this.saveToStorage()
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems) )
    }

    addToCart(productId){
        let item = this.cartItems.find(item => item.productId === productId);
        if (item) {
            item.quantity += 1;
        } else {
            this.cartItems.push({ productId, quantity: 1 , deliveryOptionId: '1'});
        }
    
        this.saveToStorage()
    }
    
    removeFromCart(productId){
        const newCart = []
    
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newCart.push(cartItem)
            }
        })    
        this.cartItems = newCart
        this.saveToStorage()
    }

    updateDeliveryOption(productId, deliveryOptionId){

        let item = this.cartItems.find(item => item.productId === productId);
        
        if(item){
            this.cartItems.deliveryOptionId = deliveryOptionId
        }
        
        this.saveToStorage()
    }    

}




