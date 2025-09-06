const mongoose = require('mongoose');

const Product = require('./models/Product.model');

const products =[
    {
        name: "Iphone 16 pro",
        img: "https://unsplash.com/photos/a-person-holding-a-white-iphone-case-in-their-hand-Xzx_5wp72Fk",
        price: 150000,
        desc: "very costly, aukat se bahar"
    },
    {
        name: "Macbook pro",
        img: "https://unsplash.com/photos/slightly-opened-silver-macbook-mP7aPSUm7aE",
        price: 250000,
        desc: "ye to bilkul aukat se bahar"
    },
    {
        name:"Iwatch",
        img:"https://unsplash.com/photos/black-smart-watch-with-black-strap-2wFoa040m8g",
        price:51000,
        desc:"ye sasta hai lelo"
    },
    {
        name:"Ipad pro",
        img:"https://unsplash.com/photos/a-tablet-computer-sitting-on-top-of-a-table-p1B6G7acvZ8",
        price:53750,
        desc:"life main kuch cheese dekhne ke liye hota hai"
    },
    {
        name:"airpods",
        img:"https://unsplash.com/photos/shallow-focus-photo-of-apple-airpods-AgLMrojqjAM",
        price:25000,
        desc:"badiya hai but le nhi payenge"
    }
]

async function seedDB(){

    // database all .funtion returns promise
    await Product.insertMany(products)
    .then(()=>{
        console.log("data seeded successfully");
        
    })
    .catch((err)=>{
        console.log("failed to add data ", err);
        
    })

}

module.exports = seedDB;