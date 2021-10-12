const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Title: String,
  Phone: String,
  Email: String,
  Active: Boolean,
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
