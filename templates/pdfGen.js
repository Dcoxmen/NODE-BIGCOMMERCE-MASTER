const makeHTML = ({ data, styles }) => {
  const {
    title,
    titleDescription,
    SKU,
    MSRP,
    mainDescriptionLong,
    mainBullets,
    productImgMain,
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
                <div class="col description">
                    <p>${mainDescriptionLong}</p>
                    <ul>
                        ${mainBullets.map((a) => `<li>${a}</li>`).join("\n")}
                    </ul>
                </div>
                <div class="col media">
                    <img src="${productImgMain}"/>
                </div>
            </section>
        </main>
    </body>
    </html>
    `;
};

module.exports = makeHTML;
