const express = require("express");
const BigCommerce = require("node-bigcommerce");
const router = express.Router();
const { Reseller, UploadFile, Contact } = require("../models");
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

      //product images array
      let myarray = data.map(({ url_standard, sort_order }) => ({
        sort_order,
        url_standard,
      }));

      const image2rng = myarray.filter(
        (myarray) => myarray.sort_order > 0 && myarray.sort_order < 4
      );
      //  const image5 = myarray.filter(myarray => myarray.sort_order === 8)

      //  const imageCombine = image2rng.concat(image5)

      const imageCombine = image2rng;
      return imageCombine;
    });

    //main image function
    const mnImage = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);

      let myimage = data.map(({ url_standard, sort_order }) => ({
        sort_order,
        url_standard,
      }));

      const mnImage = myimage.filter((myimage) => myimage.sort_order === 0);
      return mnImage;
    });

    //techImage function
    const techImage = await reqProdImages.then(function ({
      body: { data = [] },
      error,
    }) {
      // console.log(res?.body?.data);
      if (error) throw new Error(error);

      let mytechimage = data.map(({ url_standard, sort_order }) => ({
        sort_order,
        url_standard,
      }));

      const techImage = mytechimage.filter((mytechimage) => mytechimage);
      return techImage;
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
      return data.map(({ name, value }) => ({
        key: name,
        value,
      }));
    });

    // console.log("CUSTOM FIELDS", custFields);

    //format inches
    const inchformat = new Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "inch",
      minimumFractionDigits: 1,
    });
    //format currency
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    //creat tech specs from discription area
    let str = data[0].description;
    let string = str.substring(str.lastIndexOf("&gt;") + 1);
    let technical = string.substr(3);

    const techSpecs = {
      technical,
    };

    (delimiter = "&lt;!-- split --&gt;"),
      (start = 2),
      (end = 3),
      (tokens = str.split(delimiter).slice(start, end));
    let descriptBullets = tokens.join(delimiter); // those.that

    (delimiter2 = "&lt;!-- split --&gt;"), (start2 = 1), (end2 = 2);
    let tokens2 = str.split(delimiter).slice(start2, end2);
    let descript2 = tokens2.join(delimiter); // this

    let cleanSplit = descript2.slice(4);
    let descript1 = cleanSplit.replace(/&lt;!-- split --&gt;/g, "");

    //reseller info
    let vendor = req.body.resellers;

    let docs = await Reseller.findOne({ rs_name: vendor });
    docs.save((doc) => doc);

    let imgurl = docs.imagepath;
    let rsimage = await UploadFile.findOne({ _id: { $eq: imgurl } });

    let conName = req.body.contacts
    console.log(conName)


    let rsContact = await Contact.findOne({name: { $eq: conName }});
    let rsNewContact = JSON.stringify(rsContact)
    let rsNewCon2 = JSON.parse(rsNewContact)

    let myContact = {
      contactname: rsNewCon2.name,
      contactphone: rsNewCon2.phone,
      contactemail: rsNewCon2.email,
      contacttitle: rsNewCon2.title
    }
   
    // console.log(rsContact)
    // main body of data object with product info/data from api
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
      descript1,
      descriptBullets,
      short_description: data[0].description,
      upc: data[0].upc,
      price: formatter.format(data[0].price),
      width: inchformat.format(data[0].width),
      height: inchformat.format(data[0].height),
      weight: inchformat.format(data[0].weight),
      depth: inchformat.format(data[0].depth),
      warranty: data[0].warranty,
      rating: data[0].reviews_rating_sum,
      reseller_name: docs.rs_name,
      reseller_image1: docs.imagepath,
      reseller_pic: rsimage.url,
      ...myContact,
      ...techSpecs,
    };

    //benefits and features arrays
    let beneArray = productData.datasheet_benefits;
    if (!beneArray) {
      let beneArr = "N/A";
      console.log(beneArr);
    }
    const mybenefits = beneArray.split(",");
    let thebenefits = {
      bene1: mybenefits[0],
      bene2: mybenefits[1],
      bene3: mybenefits[2],
      bene4: mybenefits[3],
      bene5: mybenefits[4],
      bene6: mybenefits[5],
    };

    let featArray = productData.datasheet_features;
    if (!featArray) {
      let myftIcon1 = "N/A";
      console.log(myftIcon1);
    }

    //URL encoded string for icon assembly
    let prodline = productData.product_line;
    let prodlineformat = prodline.toLowerCase();
    let preUrl =
      "https://store-4ccc5gfp0c.mybigcommerce.com/content/datasheet/icons/";
    let axtionSformat = productData.axtion_series;

    let featArr = featArray.split(",");

    if (featArr == "undefined") {
      let noIcon = "N/A";
      console.log(noIcon);
    }
    let url1a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[0] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url1b = (preUrl + prodlineformat + "-" + featArr[0] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url2a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[1] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url2b = (preUrl + prodlineformat + "-" + featArr[1] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url3a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[2] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url3b = (preUrl + prodlineformat + "-" + featArr[2] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url4a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[3] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url4b = (preUrl + prodlineformat + "-" + featArr[3] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url5a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[4] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url5b = (preUrl + prodlineformat + "-" + featArr[4] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url6a = (
      preUrl +
      prodlineformat +
      "-" +
      axtionSformat +
      "-" +
      featArr[5] +
      ".png"
    )
      .replace(/\s+/g, "-")
      .toLowerCase();
    let url6b = (preUrl + prodlineformat + "-" + featArr[5] + ".png")
      .replace(/\s+/g, "-")
      .toLowerCase();

    //add on object with datasheet info from benefits and features

    let thefeatures = {
      feat1: axtionSformat ? url1a : url1b,
      feat2: axtionSformat ? url2a : url2b,
      feat3: axtionSformat ? url3a : url3b,
      feat4: axtionSformat ? url4a : url4b,
      feat5: axtionSformat ? url5a : url5b,
      feat6: axtionSformat ? url6a : url6b,
      feat1title: featArr[0],
      feat2title: featArr[1],
      feat3title: featArr[2],
      feat4title: featArr[3],
      feat5title: featArr[4],
      feat6title: featArr[5],
 
    };

    // if(axtionSs!== undefined){
    //   let url1 = preUrl + prodlineformat + "-"+ myftIcon1 + ".png"
    //   console.log(url1)
    // } else {
    //   let url2 = preUrl + prodlineformat + "-"+ axtionSs + "-" + myftIcon1 + ".png"
    //   console.log(url2)
    // }

    const allData = {
      ...thebenefits,
      ...thefeatures,
      ...productData,
    };

    console.log(allData);

    res.render(`products/index`, allData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
