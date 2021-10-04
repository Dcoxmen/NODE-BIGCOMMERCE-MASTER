const mongoose = require('mongoose');
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
    // url: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: upload_file
    // }


});

const Reseller = mongoose.model('resellers', ResellerSchema, 'resellers')

module.exports ={Reseller}