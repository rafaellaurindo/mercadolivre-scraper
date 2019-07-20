const puppeteer = require("puppeteer");

const { getProductsListByCategory } = require("./actions");

const categoriesToScrap = [
  {
    name: "informatica",
    subCategory: "apple"
  },
  {
    name: "informatica",
    subCategory: "computadores"
  }
];

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const appleProducts = await getProductsListByCategory(categoriesToScrap[0], page);
    console.log(appleProducts);
  } catch (error) {
    await browser.close();
  }
};

main();
