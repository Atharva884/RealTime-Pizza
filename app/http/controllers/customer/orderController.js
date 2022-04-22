const Order = require('../../../models/Order')
const moment = require('moment')

exports.order = async (req, res)=>{
    const { phone, address } = req.body
    
    // Validate
    if(!phone || !address){
        req.flash('error', 'All Fields are required')
        return res.redirect('/cart')
    }

    let order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone, address,
    })

    await order.save().then(()=>{
        req.flash('success', 'Order Placed Successful')
        delete req.session.cart
        return res.redirect('/customer/orders')
    }).catch((err)=>{
        console.log(err);
    })  
}

exports.index = async (req, res)=>{
    let data = await Order.find({customerId: req.user._id}).sort({'createdAt': -1})
    // console.log(req.user._id);
    res.render('customer/order', {data: data, moment: moment})
}