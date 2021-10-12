module.exports = `
main {
  flex: 1 0 auto;
}
.row {
  width: 100%;
}
/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  margin-bottom: 60px; /* Margin bottom by footer height */
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}


p {
    font-style: normal;
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 10pt;
    color: #58595b;
    font-family: Helvetica-Neue-Light;
}

.productBlock {
    display: flex;
    justify-content: space-evenly;
}

.productBlock .col {
    flex: 1 1 48%;
    background: blue;
}

.media img {
    width: 100%;
    max-width: 300px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
.wrapper {
  width: 100%;
  margin: 60px 0 100px;
}
/* Custom page CSS
  -------------------------------------------------- */
/* Not required for template or sticky footer method. */

.container {
  max-width: 1050px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

.description {
  margin-top: 25px;
}
.description ul li {
  font-style: normal;
  margin: 8px 0;
  font-weight: 400;
  font-size: 8pt;
  font-family: Helvetica-Neue-Light;
  color: #58595b;
}

.benefits {
  background-color: #D0103A;
  color: white;
  width: 100%;
  display: flex;
  /* padding: 1rem 3rem; */
}

.benecontainer {
  width: 100%;
  float: left;
  background: #D0103A;
  box-sizing: border-box;
  padding: 30px 75px;
  margin-top: 30px;
}
.features {
  width: 100%;
  float: left;
  padding: 15px 80px 0 80px;
  box-sizing: border-box;
  display: flex;
}


.beneTitle {
  width: 100%;
  background-color: #D0103A;
  color: white;
  padding-top: 1%;
 
}
.featTitle {
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(14, 13, 13);
  padding-top: 10%;
  padding-left: 8%;
}
.feat {
  margin-left: 8%;
  padding-right: 5%
 
}

.benes {
  padding-right: 12%;
}


.pdf-thumb {
  max-width: 100%;
}
.mnContent, .image-box {
  display: flex;
  padding-left: 0;
}

.case-specifications {
  width: 100%;
  float: left;
  padding: 40px 0 5px;
}
.technical {
  width: 100%;
  margin: 0 auto;
  background-color: #EDEDED;
  float: left;
  border-bottom: solid 2px #ccc;
  height: 80px;

  margin-top: 80px;
}

.technical h2 {
  text-align: center;
  position: relative;
  margin-top: 3%;
  font-size: 14pt;
  font-weight: 400;
  color: #231f20;
  font-family: Helvetica-Regular;
  text-transform: uppercase;
}

.tech-left {
  width: 50%;
  float: left;
  padding: 0 30px 0 0;
  box-sizing: border-box;
}
.tech-right {
  width: 50%;
  float: left;
  padding: 12px 40px 0 30px;
  border-left: solid 1px #ccc;
  box-sizing: border-box;
  height: 450px;
  font-style: normal;
  font-weight: 400;
  font-size: 10pt;
  margin: 8px 0;
  font-family: Helvetica-Neue-Light;
  color: #58595b;
}

.product-specification {
  width: 96.5%;
  float: left;
  background-color: #EDEDED;
  padding: 15px 0;
  margin-top: 10%;
}


.product-left {
  width: 35%;
  float: left;
  box-sizing: border-box;
  
}

.product-left h1 {
  font-style: normal;
  margin: 0;
  padding-left: 20px;
  font-weight: 400;
  font-size: 20pt;
  color: #262626;
  font-family: Helvetica-Neue-Medium;
}
.product-speci-table {
  width: 100%;
  border-collapse: collapse;
  border: solid 1px #c6c5c5;
}
.product-speci-table th, td {
  text-align: left;
  padding: 8px;
}

.product-speci-table tr:nth-child(even) {
  background-color: rgb(218, 218, 218);
}

.product-speci-col {
  font-size: 11pt;
  font-family: Helvetica-Neue-Light;
  color: #58595b;
  list-style: decimal;
  padding: 4px 15px;
  width: 275px;
}

.product-speci-title-row {
  background: #999;
}

.product-speci-title {
  font-style: normal;
  margin-top: 0;
  font-weight: 400;
  text-align: left;
  padding: 4px 15px;
  font-size: 15pt;
  font-family: Helvetica-Neue-Light;
  color: #fff;
  text-transform: uppercase;
}


.product-type {
  background: #D0103A;
  margin-top: 20px;
  padding: 20px 0 120px 26px;
  color:#f5f5f5;
  font-size: 1.5rem;
}
.product-table {
  width: 65%;
  float: left;
  padding: 0 15px;
  box-sizing: border-box;
}

.account-section {
  width: 97%;
  float: left;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-top: solid 2px #fff;
  margin: 15px 15px 0;
}

.account-section table {
  width: 100%;
  float: left;
}

.account-section-col-img {
  width: 25%;
  text-align: center;
}

.account-section-col-name {
  width: 25%;
  text-align: left;
  color: rgb(8, 8, 8);
  font-size: 15pt;
  font-weight: 400;
  font-family: arial;
}
.account-section-col-phone {
  width: 50%;
  padding-left: 15px;
  font-size: 8pt;
  color: #353839;
  font-family: arial;
  line-height: 20px;
  border-left: solid 1px #d0103a;
}

.rstext {
  text-align: center;
}

.general_features {
  width: 100%;
  float: left;
  padding: 15px 8px 0 8px;
  box-sizing: border-box;
}

.general_features table {
  width: 100%;
  float: left;
}

.general_features table tr td {
  font-style: normal;
  line-height: 40px;
  padding: 10px 0 12px 0;
  font-weight: 400;
  font-size: 14pt;
  font-family: Helvetica-Neue-Light;
  color: #58595b;
}

.pageFooter {
  width: 100%;
  margin-top: 16%;
}

.footer-table {
  width: 94%;
}

.footer-company h3 {
 
  font-style: normal;
  font-weight: 400;
  font-family: Helvetica-Regular;
  border-bottom: solid 1px #d0103a;
  font-size: 11pt;
  color: #58595b;
  
}
.footer-image{
  margin-right: 0;
}
.footer-second-desc p {
  font-style: normal;
  font-weight: 400;
  font-size: 8pt;
  font-family: Helvetica-Neue-Light;
  color: #6c6e70;
  
}
`;
