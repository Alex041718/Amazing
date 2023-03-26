const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.amazon.fr/15ITL6-I5-1135G7-512GB-15-6IN-NOOD/dp/B091CVM6W2?ref_=Oct_DLandingS_D_5a6dc67a_61';

async function getPrice(url) {
    try {
      const options = {
        url: url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
      };
      
      const response = await new Promise((resolve, reject) => {
        request(options, (error, response, html) => {
          if (error) reject(error);
          else resolve(response);
        });
      });
  
      if (response.statusCode !== 200) {
        console.log(response);
        throw new Error('Failed to load page');

      }
      console.log(response);
  
      const $ = cheerio.load(response.body);
  
      const price = $('span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-offscreen').text();
      const titleProduct = $('#centerCol #title_feature_div #titleSection #title #productTitle').text();
      const res = {};
  
      res["name"] = titleProduct.split(',')[0];
      res["price"] = parseFloat(price.split('€')[0]);
      
      res["url"] = url;
  
      return res;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
  
  getPrice(url).then(res => console.log(res));
