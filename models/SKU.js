const mongoose = require("mongoose");
const SKUSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
});

const SKU = mongoose.model("sku", SKUSchema);

module.exports = SKU;
