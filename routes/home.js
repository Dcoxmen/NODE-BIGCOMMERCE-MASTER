const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()
const unirest = require("unirest");
const mongoose = require('mongoose')
const Reseller = mongoose.model('resellers')


//@route  GET api
//@desc   Test route
//@access Public

router.get('/', (req, res, next) => {
    Reseller.find({}).lean()
    .select('rs_name')
    .then(resellers => {
        res.render('index/home', {
        resellers: resellers
      
        })
    })

    
    
        
  
  });
    

module.exports = router