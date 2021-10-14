const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Title: {
    type: String
  },
  Phone: {
    type: String
  },
  Email: {
    type: String
  },
  Active:{
   type: Boolean
  } 
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
