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
  flex-wrap: nowrap;
  display: -webkit-box;
  -webkit-box-pack: justify;
}

.productBlock .col {
  width: 48%;
}

.img-main img {
  width: 100%;
}

.img-small {
  display: -webkit-inline-flex;
}

.benefits {
  margin-top: 2em;
}

.bene-list {
  background-color: #D0103A;
  color: white;
  display: -webkit-inline-flex;
  -webkit-box-pack: justify;
  width: 100%;
  padding: 3em 0px;
}

.bene-list ul {
  width: 30%;
}

`;
