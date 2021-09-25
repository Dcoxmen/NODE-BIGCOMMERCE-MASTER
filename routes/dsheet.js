const express = require('express')
const BigCommerce = require('node-bigcommerce')
const router = express.Router()


//BigCommerce main api connection
const bigCommerce = new BigCommerce({
  clientId: process.env.BC_CLIENTID,
  accessToken: process.env.BC_TOKEN,
  storeHash: process.env.STOREHASH,
  host: `https://api.bigcommerce.com/{{storeHash}}/stores//v3`,
  responseType: "json"
  
});




router.get('/', async (request, response) => {

  bigCommerce.get('/')
  .then(data => {
    let sku = data.map(data => (
      { 
       sku: data.sku
    }));
    console.log(sku)
  }).catch

  
}).catch((err) =>{
  console.error(err)
})

//Add DSheet form
router.get('/add', (req,res) => {
    res.render('mydsheets/add')
})

module.exports = router