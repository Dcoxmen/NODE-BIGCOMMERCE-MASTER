const makeHTML = ({ data, styles }) => {
  const {
    title,
    titleDescription,
    SKU,
    MSRP,
    mainDescriptionLong,
    mainBullets,
    productImgMain,
    productImgs,
    benefits,
  } = data;

  return `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>PDF Template</title>
    </head>
    <style>
    ${styles || ""}
    </style>
    <body>
        <header>
            <h2>${title}</h2>
            <h5>${titleDescription}</h5>
            <hr>
            <h6>SKU: ${SKU}</h6>
            <h5>MSRP: ${MSRP}</h5>
        </header>
        <main>
            <section class="productBlock">
                <div class="col description" style="background: red">
                    <p>${mainDescriptionLong}</p>
                    <ul>
                        ${mainBullets.map((a) => `<li>${a}</li>`).join("\n")}
                    </ul>
                </div>
                <div class="col media" style="background: blue">
                    <div class="img-main" style="width: 50%; margin-left: 25%">
                        <img src="${productImgMain}"/>
                    </div>
                    <div class="img-small">
                        ${productImgs
                          .map(
                            (a) =>
                              `<div><img style="width: 100%;" src="${a}"/></div>`
                          )
                          .join("\n")}
                    </div>
                </div>
            </section>
            <section class="benefits">
                <div class="bene-list">
                    <h3>Benefits</h3>
                    <ul class="benes">
                        <li>${benefits[0]}</li>
                        <li>${benefits[1]}</li>
                    </ul>
                    <ul class="benes">
                        <li>${benefits[2]}</li>
                        <li>${benefits[3]}</li>
                    </ul>
                    <ul class="benes">
                        <li>${benefits[4]}</li>
                        <li>${benefits[5]}</li>
                    </ul>
                </div>
          </div>
          </div>
       </div>
            </section>
        </main>
    </body>
    </html>
    `;
};

module.exports = makeHTML;
