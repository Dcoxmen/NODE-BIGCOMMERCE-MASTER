const fs = require("fs");
const pdf = require("html-pdf");
const styles = require("./defaultStyles");
const options = { format: "Letter" };
const makeHTML = require("./pdfGen");
const data = {
  title: "TEST PRODUCT",
  titleDescription: "ITS LIT    ".repeat(5),
  SKU: "LSDKFJEI",
  MSRP: "$199.99",
  mainDescriptionLong: "This is a test sentence".repeat(30),
  mainBullets: ["it's awesome", "it's cheap", "it prevents prenancy"],
  productImgs: [
    "https://cdn11.bigcommerce.com/s-4ccc5gfp0c/products/1779/images/9133/KAA110W-Front-enclosures__35378.1597340019.386.513.jpg?c=2",
  ],
  productImgMain:
    "https://cdn11.bigcommerce.com/s-4ccc5gfp0c/products/1779/images/9133/KAA110W-Front-enclosures__35378.1597340019.386.513.jpg?c=2",
};

const html = makeHTML({ styles, data });

console.log(html);

pdf.create(html, options).toFile("./test.pdf", (err, data) => {
  if (err) throw new Error(err);
  console.log("success ", data);
});
