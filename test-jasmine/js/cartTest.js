import { addToCart, cart, loadFromStorage } from "../../js/cart.js";

describe('Test suite: addToCart', () => {
    // beforeEach(() => {

    //     // Simula localStorage.getItem para que devuelva un array vacío
    //     spyOn(localStorage, 'getItem').and.callFake(() => {
    //         return JSON.stringify([]);
    //     });

    //     // Simula localStorage.setItem
    //     spyOn(localStorage, 'setItem');
    // });

    it('Adds an existing product to the cart', () => {

        spyOn(localStorage, 'setItem')

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                roductId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
    
            }]);
        });

        loadFromStorage()

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        // expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2)
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d')

    })

    it('Adds a new product to the cart', () => { 
        
        // Simula localStorage.getItem para que devuelva un array vacío
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        // Simula localStorage.setItem
        spyOn(localStorage, 'setItem');

        loadFromStorage()

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        // expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1)
    })
        
   
})