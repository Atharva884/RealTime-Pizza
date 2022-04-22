const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {type: Object, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    status: {type: String, default: "order_placed"},
    paymentType: {type: String, default: "COD"},
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)