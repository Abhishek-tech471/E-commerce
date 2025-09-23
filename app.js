const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { log } = require('console');
const seedDB = require('./seed');
const ProductRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://127.0.0.1:27017/shopping')
.then(()=>{
    console.log("Database connected Successfully");
    
})
.catch((err)=>{
    console.log("Error found:", err);
    
}) 

let configSession = ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views' ,path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(flash());
app.use(session(configSession));
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// seeding DB
// seedDB();

app.use(ProductRoutes);
app.use(reviewRoutes);

app.listen(8080, ()=>{
    console.log("Server connected at PORT 8080");
    
});