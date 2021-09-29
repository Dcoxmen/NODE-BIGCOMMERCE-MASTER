const express = require("express");
const BigCommerce = require("node-bigcommerce");
const router = express.Router();

const unirest = require("unirest");

//BigCommerce main api connection
const bigCommerce = new BigCommerce({
  clientId: process.env.BC_CLIENTID,
  accessToken: process.env.BC_TOKEN,
  storeHash: process.env.STOREHASH,
  host: `https://api.bigcommerce.com/{{storeHash}}/stores//v3`,
  responseType: "json",
});

//POST Route sends sku id used as parameter to filter results called on products route
router.post("/", async (req, res) => {
  let sku = req.body.sku;
  let reseller = {
    reseller: req.body.reseller,
  };

  //using the bigCommerce object to handle creating the properties needed to fill an html template page.
  try {
    //making productid a resuable variable
    const data = await bigCommerce.get(`/products?sku=${sku}`);
    let productid = data.map((data) => ({
      productid: data.id,
    }));

    let prodId_value = Object.values(...productid);
    let productid_value = prodId_value[0];


    //getting connection to bigcommerce images api
    let reqProdImages = unirest(
      "GET",
      `https://api.bigcommerce.com/stores/${process.env.STOREHASH}/v3/catalog/products/${productid_value}/images`
    );

    reqProdImages.headers({
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${process.env.BC_TOKEN}`,
    });


    //images array function
    const images = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);


        let myarray = data.map(( {url_standard, sort_order} ) => ({
          sort_order,
          url_standard
         }))
         
        
         const image2rng = myarray.filter(myarray => myarray.sort_order > 0 && myarray.sort_order < 3)
         const image5 = myarray.filter(myarray => myarray.sort_order === 8)

         const imageCombine = image2rng.concat(image5)
         return imageCombine
         
       

        //  function filterImgCount(sort_order) {
        //   return sort_order >= 4;
        // }

    });


    //main image function
    const mnImage = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);

        let myimage = data.map(( {url_standard, sort_order} ) => ({
          sort_order,
          url_standard
         }))
         
         const mnImage = myimage.filter(myimage => myimage.sort_order === 0 )
         return mnImage

    });

    //techImage function
    const techImage = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);

        let mytechimage = data.map(( {url_standard, sort_order} ) => ({
          sort_order,
          url_standard
         }))
         
         const techImage = mytechimage.filter(mytechimage => mytechimage )
         return techImage

    });


    

  

   //custom fields funtions

    let reqCustFields = unirest(
      "GET",
      `https://api.bigcommerce.com/stores/${process.env.STOREHASH}/v3/catalog/products/${productid_value}/custom-fields`
    );

    reqCustFields.headers({
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${process.env.BC_TOKEN}`,
    });

    const custFields = await reqCustFields.then(function ({
      body: { data = [] },
    }) {
      if (res.error) throw new Error(res.error);

      // for (let i = 0; i < res.body.data.length; i++) {
      //   let cust_fields = {
      //     cust_name: res.body.data[i].name,
      //     cust_value: res.body.data[i].value,
      //   };
      //   console.log(cust_fields);
      // }
      return data.map(({ name, value }) => ({
        key: name,
        value,
      }));
    });

    // console.log("CUSTOM FIELDS", custFields);

    //

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    let str = data[0].description
    let string = str.substring(str.lastIndexOf("&gt;") + 1)
    let technical = string.substr(3)

    const techSpecs = {
      technical
    }
    

    

    


    const productData = {
      ...custFields.reduce((a, { key, value }) => {
        a[key] = value;
        return a;
      }, {}),
      mnImage,
      images,
      techImage,
      productid: data[0].id,
      product_name: data[0].name,
      product_sku: data[0].sku,
      description: data[0].description,
      short_description: data[0].description,
      upc: data[0].upc,
      price: formatter.format(data[0].price),
      ...techSpecs
      
    };

    let beneArray = productData.datasheet_benefits
    let beneArr = beneArray.split(',');

    let featArray = productData.datasheet_features
    let featArr = featArray.split(',');

   const allData = {

     benefit1: beneArr[0],
     benefit2: beneArr[1],
     benefit3: beneArr[2],
     benefit4: beneArr[3],
     benefit5: beneArr[4],
     benefit6: beneArr[5],
     feature1: featArr[0],
     feature2: featArr[1],
     feature3: featArr[2],
     feature4: featArr[3],
     feature5: featArr[4],
     feature6: featArr[5],
     ...productData



   }

console.log(allData)


    res.render(`products/index`, allData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
