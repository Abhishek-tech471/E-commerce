const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// const seedDB = require('./seed');
const ProductRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')


const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User.model')



let configSession = ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
})


app.use(session(configSession));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));





mongoose.connect('mongodb://127.0.0.1:27017/shopping')
.then(()=>{
    console.log("Database connected Successfully");
    
})
.catch((err)=>{
    console.log("Error found:", err);
    
}) 



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views' ,path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// seeding DB
// seedDB();

app.use(ProductRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.listen(8080, ()=>{
    console.log("Server connected at PORT 8080");
    
});