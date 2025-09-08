const express  = require('express');
const Product = require('../models/Product.model');
const router = express.Router();

router.get('/products', async (req,res)=>{
    let products =await Product.find({});
    res.render('products/index',{products});
})

router.get('/product/new',(req,res)=>{
    res.render('products/new');
})

router.post('/products',async(req,res)=>{
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
    res.redirect('/products')

})

router.get('/product/:id',async (req,res)=>{
    let {id}=req.params;
    let foundProduct = await Product.findById(id);

    res.render('products/show', {foundProduct});
})

// form to edit product
router.get('/product/:id/edit',async (req,res)=>{
    let {id}=req.params;
    let foundProduct = await Product.findById(id);

    res.render('products/edit', {foundProduct});
})


// edit data in db
router.patch('/product/:id', async (req,res)=>{
    let {id}=req.params;
    let {name, img,price,desc} = req.body;
    await Product.findByIdAndUpdate(id,{name, img,price,desc});
    res.redirect(`/product/${id}`);
})

router.delete('/product/:id', async (req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
module.exports = router;