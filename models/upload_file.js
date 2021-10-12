const mongoose = require("mongoose");
const UploadfileSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  name: {
    type: String,
  },
  alternativeText: {
    type: String,
  },
  caption: {
    type: String,
  },

  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
});
const uploadFile = mongoose.model(
  "upload_file",
  UploadfileSchema,
  "upload_file"
);
module.exports = uploadFile;
