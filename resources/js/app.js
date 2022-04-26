const addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
import { initAdmin } from './admin'
import axios from "axios"
import moment from "moment"
import Noty from 'noty'

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


// Update
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true
    statuses.forEach((status)=>{
        let dataprop = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataprop === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}

updateStatus(order)


const socket = io()
initAdmin(socket)

if(order){
    socket.emit('join', `order_${order._id}`)
}
let adminArea = document.location.pathname
if(adminArea.includes('admin')){
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data)=>{
    const UpdatedOrder = { ...order }
    UpdatedOrder.updatedAt = moment().format()
    UpdatedOrder.status = data.status
    updateStatus(UpdatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Updated',
        progressBar: false
    }).show()
    console.log(data);
})