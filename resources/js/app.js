const addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
import axios from "axios"

function updateCart(pizza){
    axios.post('/updateCart', pizza).then(res =>{
        console.log(res);
        cartCounter.innerText = res.data.totalQty
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza);
        updateCart(pizza)
    })
})