export function getDeliveryDetails(optionId){
    let matchedOption
    deliveryOptions.forEach((option) => {
        if(option.id === optionId){
            matchedOption = option
        }
    })
    return matchedOption || deliveryOptions[0]
}

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
]