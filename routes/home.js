const express = require("express");
const BigCommerce = require("node-bigcommerce");
const router = express.Router();
const unirest = require("unirest");
const mongoose = require("mongoose");
const { Reseller, Contact, SKU } = require("../models");
// const skulist = require("../public/skus");

//@route  GET api
//@desc   Test route
//@access Public

router.get("/", async (req, res, next) => {
  //maybe if other fields are needed, then don't just select rs_name
  const resellers = await Reseller.find({}).lean().select("rs_name");
  const contacts = await Contact.find({}).lean();
  const skus = await SKU.find({}).lean();
  res.render("index/home", {
    resellers,
    contacts,
    skus,
  });
  // Reseller.find({}).lean()
  // .select('rs_name')
  // .then(resellers => {
  //     res.render('index/home', {
  //     resellers: resellers

  //     })

  // })
});

module.exports = router;
