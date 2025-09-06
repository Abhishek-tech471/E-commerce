const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { log } = require('console');
const seedDB = require('./seed');


mongoose.connect('mongodb://127.0.0.1:27017/shopping')
.then(()=>{
    console.log("Database connected Successfully");
    
})
.catch((err)=>{
    console.log("Error found:", err);
    
}) 

app.set('view engine', 'ejs');
app.set('view' ,path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

// seeding DB
// seedDB();



app.listen(8080, ()=>{
    console.log("Server connected at PORT 8080");
    
});