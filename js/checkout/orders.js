export const orders = JSON.parse(localStorage.getItem('oreders'))
                    || []

export function adOrder(order){
    orders.unshift(order)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}