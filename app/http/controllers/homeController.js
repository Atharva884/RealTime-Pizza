const Menu = require('../../models/Menu')

exports.home = async (req, res)=>{
    const pizzas = await Menu.find()
    // console.log(pizzas);
    res.render('home', {pizzas})
}

