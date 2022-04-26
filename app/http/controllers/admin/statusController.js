const Order = require('../../../models/Order')

exports.update = (req, res)=>{
    Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err, result)=>{
        if(err){
            return res.redirect('/admin/orders')
        }
        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderUpdated', {id: req.body.orderId, status: req.body.status})
        return res.redirect('/admin/orders')
    })   
}