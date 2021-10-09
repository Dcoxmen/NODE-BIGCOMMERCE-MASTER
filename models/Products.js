const mongoose = require('mongoose');
// const upload_file = require('./upload_file');
const ProductsSchema = new mongoose.Schema({
    sku: {
        type: String,
    },
    vendor: {
        type: String
    },
    title: {
        type: String
    },
    tags: {
        type: String
    }
    

});

const Products = mongoose.model('products', ProductsSchema, 'products')

module.exports ={Products}