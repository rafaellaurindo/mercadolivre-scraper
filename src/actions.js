const { SELECTORS } = require("./constants");

const getProductsListByCategory = async (category, page) => {
  const subCategory = category.subCategory || "";
  await page.goto(`https://${category.name}.mercadolivre.com.br/${subCategory}`);

  await page.waitForSelector(`${SELECTORS.RESULTS_LIST.MAIN} ${SELECTORS.RESULTS_LIST.ITEM.MAIN}`);

  const productsList = await page.evaluate(SELECTORS => {
    const productLiElements = document.querySelectorAll(`${SELECTORS.RESULTS_LIST.MAIN} ${SELECTORS.RESULTS_LIST.ITEM.MAIN}`);
    let productsListLocal = [];

    productLiElements.forEach(product => {
      const productObject = {
        title: product.querySelector(SELECTORS.RESULTS_LIST.ITEM.TITLE).textContent.trim(),
        url: product.querySelector(SELECTORS.RESULTS_LIST.ITEM.URL).href
      };
      productsListLocal.push(productObject);
    });

    return productsListLocal;
  }, SELECTORS);

  return productsList;
};

module.exports = {
  getProductsListByCategory
};
