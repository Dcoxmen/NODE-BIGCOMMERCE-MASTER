const connectDB = require("../config/db");
const { Contact, SKU } = require("../models");
const contactsData = require("./contact.json");
const SKUData = require("./sku.json");
// return console.log(contactsData);
const seedContacts = async () => {
  try {
    await connectDB();
    console.log("db connected...");
    const promises = contactsData.map((a) => Contact.create(a));
    await Promise.all(promises);
    console.log("created");
  } catch (err) {
    console.log(err);
  }
};

const seedSKU = async () => {
  try {
    await connectDB();
    console.log("db connected...");
    const promises = SKUData.map((a) => SKU.create({ sku: a }));
    await Promise.all(promises);
    console.log("created");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  seedContacts,
  seedSKU,
};
