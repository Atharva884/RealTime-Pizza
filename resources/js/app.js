const addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
import { initAdmin } from './admin'
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
        updateCart(pizza)
    })
})

const successAlert = document.querySelector('#success-alert')
if(successAlert){
    console.log('gg');
    setTimeout(() => {
        successAlert.style.display = "none"
    }, 2000);
}

initAdmin()