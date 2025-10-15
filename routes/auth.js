const express = require('express');
const User = require('../models/User.model');
const passport = require('passport');
const router = express.Router();


router.get('/register', (req,res)=>{
    res.render('auth/signup', {cssFile:"signup.css"});
})


// actually register a user
router.post('/register',async (req,res)=>{
    let {email,password,username,role}=req.body;
    const user = new User({email,username, role})
    const newUser = await User.register(user,password);
    // res.redirect('/login');
    req.login(newUser, function(err){
        if(err){
            return next(err);

        }
        req.flash('success', 'welcome, you are registered successsfully');
        return res.redirect('/products');
    })
})

// to get login form

router.get('/login',(req,res)=>{
    res.render('auth/login', {cssFile:"login.css"});
})


// to actually login via the db

router.post('/login',
    passport.authenticate('local', {
         failureRedirect: '/login',
         failureMessage: true 
        }),
        (req,res)=>{
            req.flash('success','welcome back')
            res.redirect('/products');
})


router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success', 'goodbye friends, see you again')
    res.redirect('/login');
})



module.exports = router;