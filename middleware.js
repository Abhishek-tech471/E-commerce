const {productSchema, reviewSchema } = require('./schema')

const validateProduct =(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {error} =productSchema.validate({name,img,price,desc})
    if(error){
        return res.render('error', {err:error.message});
    }
    next();
}

const validateReview =(req,res,next)=>{
    let {rating,comment} =req.body;
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        return res.render('error', {err:error.message});
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'please login first')
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error', "don't have accessss")
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', "don't have accessss")
        return res.redirect('/products');
    }
    next();
}

module.exports = {isLoggedIn,validateProduct,validateReview, isSeller};