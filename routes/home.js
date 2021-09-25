const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()
const unirest = require("unirest");
const Reseller = mongoose.model(reseller)


//@route  GET api
//@desc   Test route
//@access Public

router.get('/', (req, res) => res.send('Home Route'))
 
module.exports = router