const express  = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const router = express.Router();


router.get('/user/cart', isLoggedIn, async (req,res)=>{
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart', {user, cssFile: "cart.css"});
})

router.post('/user/:productId/add', isLoggedIn,async (req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    await user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})

router.delete('/user/:id/remove', isLoggedIn, async (req,res)=>{
    let {id} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(id);
    let user = await User.findById(userId);
    user.cart = user.cart.filter(item => item.productId.toSring() !== id.toString());
    await user.save();
    res.redirect('/user/cart')
})

module.exports = router;
 