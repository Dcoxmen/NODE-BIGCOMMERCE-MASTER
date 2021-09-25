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
    const data = await bigCommerce.get(`/products?sku=${sku}`);
    let productid = data.map((data) => ({
      productid: data.id,
    }));

    let prodId_value = Object.values(...productid);
    let productid_value = prodId_value[0];

    let reqProdImages = unirest(
      "GET",
      `https://api.bigcommerce.com/stores/${process.env.STOREHASH}/v3/catalog/products/${productid_value}/images`
    );

    reqProdImages.headers({
      accept: "application/json",
      "content-type": "application/json",
      "x-auth-token": `${process.env.BC_TOKEN}`,
    });

    const images = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);

      for (let i = 0; i < 5; i++) {
        // console.log(res.body.data[i].url_zoom);
        // console.log(res.body.data[i].url_standard);
        // console.log(res.body.data[i].url_thumbnail);
      }

      return data.map(({ url_zoom, url_standard, url_thumbnail }) => ({
        url_standard,
        url_thumbnail,
        url_zoom,
      }));
    });

    //all img links mapped here
    // console.log(images);

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

    const productData = {
      ...custFields.reduce((a, { key, value }) => {
        a[key] = value;
        return a;
      }, {}),
      images,
      productid: data[0].id,
      product_name: data[0].name,
      product_sku: data[0].sku,
      short_description: data[0].description,
      upc: data[0].upc,
    };

    console.log(productData);

    // let result = data.map((data) => ({
    //   productid: data.id,
    //   product_name: data.name,
    //   product_sku: data.sku,
    //   short_description: data.description,
    //   upc: data.upc,
    //   zoom_image: data.primary_image.zoom_url,
    //   thumbnail_image: data.primary_image.thumbnail_url,
    //   standard_image: data.primary_image.standard_url,
    //   tiny_image: data.primary_image.tiny_url,
    // }));

    // console.log(...result);

    res.render(`products/index`, productData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
