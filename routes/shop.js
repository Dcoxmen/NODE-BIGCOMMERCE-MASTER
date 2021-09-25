const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index/home') 
  
  });

  router.get('/dashboard', (req, res, next) => {
    res.render('index/dashboard') 
  
  });

module.exports = router