const request = require('request');
const cheerio = require('cheerio');
const getTimeStamp = require('./getTimeStamp');


//const url = 'https://www.amazon.fr/15ITL6-I5-1135G7-512GB-15-6IN-NOOD/dp/B091CVM6W2?ref_=Oct_DLandingS_D_5a6dc67a_61';

async function getPrice(url) {
  try {

    const option = {
      url: url,
      headers: {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15"
      }
    };
    
    const response = await new Promise((resolve, reject) => {
      request(option, (error, response, html) => {
        if (error) reject(error);
        else resolve(response);
      });
    });

    if (response.statusCode !== 200) {
      throw new Error('Failed to load page');
    }

    const $ = cheerio.load(response.body);

    //PRICE
    const price = $('span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-offscreen').text();
    //TITLE
    const titleProduct = $('#productTitle').text();
    
    const res = {};

    res["name"] = titleProduct.split(',')[0];
    res["price"] = parseFloat(price.split('€')[0]);
    res["timestamp"] = getTimeStamp();
    res["url"] = url;

    return res;
  } catch (error) {
    console.error(error);
    return 'error';
  }
}

//getPrice(url).then(res => console.log(res));

module.exports = getPrice;