const mongoose = require('mongoose');

const Product = require('./models/Product.model');

const products =[
    {
        name: "Iphone 16 pro",
        img: "https://images.unsplash.com/photo-1737280423495-b43202fece9b?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 150000,
        desc: "very costly, aukat se bahar"
    },
    {
        name: "Macbook pro",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 250000,
        desc: "ye to bilkul aukat se bahar"
    },
    {
        name:"Iwatch",
        img:"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:51000,
        desc:"ye sasta hai lelo"
    },
    {
        name:"Ipad pro",
        img:"https://images.unsplash.com/photo-1637152736123-8a027366b07a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:53750,
        desc:"life main kuch cheese dekhne ke liye hota hai"
    },
    {
        name:"airpods",
        img:"https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:25000,
        desc:"badiya hai but le nhi payenge"
    }
]

async function seedDB(){

    // database all .funtion returns promise use async await or then and catch
    await Product.insertMany(products)
    .then(()=>{
        console.log("data seeded successfully");
        
    })
    .catch((err)=>{
        console.log("failed to add data ", err);
        
    })

}

module.exports = seedDB;