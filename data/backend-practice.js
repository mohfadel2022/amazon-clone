const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    
    const res = xhr.response
    console.log(res)
})

xhr.open('GET', 'https://supersimplebackend.dev/products/first')
xhr.send()

