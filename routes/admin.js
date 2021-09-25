const express = require('express')
const router = express.Router()

router.get('/search', (req, res, next) => {
    res.send('<form action="/products/api" method="GET"><input type="text" name="product_id"><button type="submit">Search Product</button></form>')

  });

  

router.use(`/products/:sku`, (sku, res, next) => {

  res.render('add-branding')
    
  });

module.exports = router
