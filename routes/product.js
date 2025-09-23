const express  = require('express');
const Product = require('../models/Product.model');
const Review = require('../models/Review.model');
const { validateProduct } = require('../middleware');
const router = express.Router();

router.get('/products', async (req,res)=>{
    try{
    let products =await Product.find({});
    res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('eror', {err:e.message});
        
    }
})

router.get('/product/new',(req,res)=>{
    try{
    res.render('products/new');
    }
    catch(e){
        res.status(500).render('eror');
        
    }
})

router.post('/products',validateProduct,async(req,res)=>{
    try{
    // let data = req.params;
    let product = req.body;
    // let a = await Product.find(product);
    // console.log(a);
    // if(a==product){
    //     console.log('product already available');
        
    // }
    // else{
    await Product.insertOne(product)
    // .then(()=>{
    //     log('data added successfully');
    // })

// }
    let products =await Product.find({});

    req.flash('success','Product added successfully');
    res.redirect('/products')
    }
    catch(e){
        res.status(500).render('eror');
        
    }

})
// show product
router.get('/product/:id',async (req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show', {foundProduct, msg: req.flash('success')});
    }
    catch(e){
        res.status(500).render('eror');
        
    }
})

// form to edit product
router.get('/product/:id/edit',async (req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct = await Product.findById(id);

    res.render('products/edit', {foundProduct});
    }
    catch(e){
        res.status(500).render('eror');
        
    }
})


// edit data in db
router.patch('/product/:id',validateProduct, async (req,res)=>{
    try{
    let {id}=req.params;
    let {name, img,price,desc} = req.body;
    await Product.findByIdAndUpdate(id,{name, img,price,desc});

    req.flash('success','Product editted successfully');
    res.redirect(`/product/${id}`);
    }
    catch(e){
        res.status(500).render('eror');
        
    }
})

router.delete('/product/:id', async (req,res)=>{
    try{
    let {id} = req.params;
    // const product = await Product.findById(id);
    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    req.flash('success','Product deleted successfully');
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('eror');
        
    }
})
module.exports = router;