const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { log } = require('console');
const seedDB = require('./seed');
const ProductRoutes = require('./routes/product');
const ejsMate = require('ejs-mate');


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

// seeding DB
// seedDB();

app.use(ProductRoutes);

app.listen(8080, ()=>{
    console.log("Server connected at PORT 8080");
    
});