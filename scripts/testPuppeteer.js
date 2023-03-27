const puppeteer = require('puppeteer');
const getTimeStamp = require('./getTimeStamp');

const url = 'https://www.amazon.fr/Apple-MX532ZMA-Nouveau-AirTag/dp/B0935DN1BN/ref=sr_1_1_sspa?keywords=airtags&qid=1678472001&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';

async function getPrice(url) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);

  const name = await page.$eval('#centerCol #title_feature_div #titleSection #title #productTitle', element => element.textContent);
  const price = await page.$eval('span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-offscreen', element => element.textContent);
  
  const res = {};
  res["name"] = name;
  res["price"] = parseFloat(price.split('€')[0]);
  res["timestamp"] = getTimeStamp();
  res["url"] = url;


  await browser.close();
  //console.log(res);
  return res
  //await page.screenshot({path: 'example.png'});
  
};

getPrice(url).then(res => console.log(res));

module.exports = getPrice;
