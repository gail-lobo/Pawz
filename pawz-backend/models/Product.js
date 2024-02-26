const mongoose=require('mongoose')
const ProductSchema=mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is required"]
    },
    description:{
        type: String,
        required: [true, "Product description is required"]
    },
    price:{
        type: String,
        required: [true, "Product price is required"]
    },
    category:{
        type: String,
        required: [true, "Product category is required"]
    },
    pictures:{
        type: Array,
        required: true
    }

},{minimize: false}
);

const Product= mongoose.model('Product',ProductSchema);
module.exports=Product;