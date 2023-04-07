const axios = require('axios');
const { parse } = require('node-html-parser');

const getTimeStamp = require('./getTimeStamp');




async function getPrice(asin) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://www.amazon.fr/dp/B07W6JFPT1',
        headers: { 
          'Cookie': 'i18n-prefs=EUR; session-id=262-9166251-5336201; session-id-time=2082787201l; session-token="g+BT3yIKYqRgauMha39Tpn7MtAmV2YtfbmUw4y9GA1jDbXod56cAbshwxBs6985JAOdsb01IPBRO3+6Fumq0sXU89teWoRyYc/9C2pTzBd6eXIecNODfVKtIWqriIU2F5sp+ybFNkpoCwhYuPHsEaybT2H1kmvIW605tZR5X1t/QPevOLi/1i9fEJ7Ihsl7X7UdkSMKRBXqCM8csPaCwPmNMZ1qEqZbcfYf4xZhvmkU="; ubid-acbfr=259-4082130-8876267'
        }
    };

    return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                try {
                    //console.log(response.data);
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


