const Order = require('../../../models/Order')

exports.update = (req, res)=>{
    Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err, result)=>{
        if(err){
            return res.redirect('/admin/orders')
        }
        return res.redirect('/admin/orders')
    })   
}