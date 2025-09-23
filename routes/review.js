const express  = require('express');
const Product = require('../models/Product.model');  
const router = express.Router();
const Review = require('../models/Review.model');
const { validateReview, isLoggedIn } = require('../middleware');


router.post('/product/:id/review',isLoggedIn, validateReview ,async (req,res)=>{
    try{
    let {id} = req.params;
    // console.log(id);
    let {rating,comment} = req.body;
    const product = await Product.findById(id);
    const review =  new Review({rating,comment});
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','Review added successfully');
    res.redirect(`/product/${id}`);
    }
    catch(e){
        res.status(500).render('error');
    }
    
})

module.exports = router;