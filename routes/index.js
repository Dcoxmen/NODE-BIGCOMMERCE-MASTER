const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index/home') 
  
  });

  router.get('/dashboard', (req, res, next) => {
    res.render('index/dashboard') 
  
  });

  router.get('/products', (req, res, next) => {
    res.render('products/index') 
  
  });

module.exports = router