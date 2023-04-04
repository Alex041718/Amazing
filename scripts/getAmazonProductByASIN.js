const axios = require('axios');
const { parse } = require('node-html-parser');

const getTimeStamp = require('./getTimeStamp');




async function getPrice(asin) {

    let config = {
        method: 'get',
        url: `https://www.amazon.fr/dp/${asin}`,
        headers: { 
            'Cookie': 'i18n-prefs=EUR; session-id=262-9166251-5336201; session-id-time=2082787201l; session-token="JoK7kIbu2yYZ0Isg4IniWL0iQrlNTCm6ICuv5/nO0Bk7kRWtNviTYh/xbLWUgx5+5xXvsQUXZG95WiNyM1I6ygHqzsm0FrrkiEtA9ZgGKVaBNMaEMgrK4JhV0muVgqgScFaV2zaVk2Vos3QWataOV1Kd0U42AYhl6xrAxfHwfMXFRgvxNC3Z+eVMxcXfE6MJRVcE+SaZ202Fjn1KnCsg2iAGem3IGwTz+GKnl9lNFgc="; ubid-acbfr=259-4082130-8876267'
          }
    };

    return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                try {
                    var root = parse(response.data);

                    
                    var res = {
                        "name": root.querySelector('#centerCol #title_feature_div #titleSection #title #productTitle').text.trim(),

                        "asin": asin,

                        "image": root.querySelector('#landingImage').getAttribute('src'),

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

//const ASIN = '2092574280';
//(async () => {console.log(await getPrice(ASIN));})();


