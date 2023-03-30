const axios = require('axios');
const { parse } = require('node-html-parser');

const getTimeStamp = require('./getTimeStamp');

//const ASIN = 'B09Y98HZW3'


async function getPrice(asin) {

    let config = {
        method: 'get',
        url: `https://www.amazon.fr/dp/${asin}`
    };

    return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                try {
                    var root = parse(response.data);


                var res = {
                    "name": root.querySelector('#centerCol #title_feature_div #titleSection #title #productTitle').text.trim(),

                    "asin": asin,

                    "price": parseFloat(root.querySelector('span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-offscreen').text.trim().split('€')[0]),
                    
                    "timestamp": getTimeStamp(),
                }

                resolve(res);
                } catch (error) {
                    reject(error);
                }
                
            })
            .catch((error) => {
                reject(error);
            });
    })
};

module.exports = getPrice;

/*
(async () => {
    console.log(await getPrice(ASIN));
})();
*/

