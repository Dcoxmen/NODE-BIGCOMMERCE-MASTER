const mongoose = require('mongoose');
require('./Products.js');

// const upload_file = require('./upload_file');
const ResellerSchema = new mongoose.Schema({
    rs_name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    title: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    imagepath:
    {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    sku: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
     }


});

const Reseller = mongoose.model('resellers', ResellerSchema, 'resellers')

module.exports ={Reseller}