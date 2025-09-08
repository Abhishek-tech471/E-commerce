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
    .then(()=>{
        log('data added successfully');
    })

// }
    let products =await Product.find({});
    res.redirect('/products')

  
})


module.exports = router;