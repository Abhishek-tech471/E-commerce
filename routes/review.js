const express  = require('express');
const Product = require('../models/Product.model');  
const router = express.Router();
const Review = require('../models/Review.model')


router.post('/product/:id/review',async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let {rating,comment} = req.body;
    const product = await Product.findById(id);
    const review =  new Review({rating,comment});
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/product/${id}`);
    
})

module.exports = router;