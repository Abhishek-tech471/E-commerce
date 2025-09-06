const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('view' ,path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send("Its really working")
})




app.listen(8080, ()=>{
    console.log("Server connected at PORT 8080");
    
});