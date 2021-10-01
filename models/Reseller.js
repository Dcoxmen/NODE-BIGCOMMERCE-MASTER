const mongoose = require('mongoose');


const ResellerSchema = new mongoose.Schema({
    rs_name: {
        type: String,
        required: true
    },
    imagepath:
    {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }


})
mongoose.model('resellers', ResellerSchema, 'resellers')