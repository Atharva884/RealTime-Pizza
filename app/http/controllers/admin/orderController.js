let Order = require('../../../models/Order')

exports.index = (req, res)=>{
    Order.find({status: {$ne: "completed"}}).sort({"createdAt": -1}).populate('customerId', '-password').exec((err, orders)=>{
        if(req.xhr) {
            return res.json(orders)
        } else {
         return res.render('admin/order')
        }
    })
}