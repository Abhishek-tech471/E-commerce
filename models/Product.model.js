const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    } ,
    img:{
        type: String,
        trim: true
        // default:

    },
    price:{
        type: Number,
        min:0,
        required: true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

productSchema.post('findOneAndDelete',async function (product){
    if(product.review.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product = mongoose.model('Product', productSchema);
module.exports = Product;