const axios = require('axios');
const { parse } = require('node-html-parser');
const cheerio = require('cheerio');
const getTimeStamp = require('./getTimeStamp');




async function getPrice(asin) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://www.amazon.fr/dp/' + asin,
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
                    
                    
                    if (root.querySelector('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span.a-offscreen') == null) {
                        console.log('la disposition à chier');
                        if (root.querySelector('#main-image-container > ul > li.image.item.itemNo0.maintain-height.selected > span > span > div > img') == null) { 

                            console.log('la disposition à chier 2');
                            var res = {
                                //ça c'est la disposition à chier

                                "name": root.querySelector('#productTitle').text.trim(),
        
                                "asin": asin,
        
                                "image": root.querySelector('#imgBlkFront').getAttribute('src'),
        
                                "price": parseInt(root.querySelector('#corePrice_feature_div > div > span > span.a-offscreen').text.trim().split('€')[0].replace(/\s+/g, '').replace(',', '.')),
        
                                "timestamp": getTimeStamp(),
                            }



                        } else {
                            var res = {
                                //ça c'est la disposition à chier

                                "name": root.querySelector('#productTitle').text.trim(),
        
                                "asin": asin,
        
                                "image": root.querySelector('#main-image-container > ul > li.image.item.itemNo0.maintain-height.selected > span > span > div > img').getAttribute('src'),
        
                                //"price": String(root.querySelector('#corePrice_desktop')),
        
                                "timestamp": getTimeStamp(),
                            }
                            var priceResponse = String(root.querySelector('#corePrice_desktop'))
                            const $ = cheerio.load(priceResponse);
                            var price = $('.a-price .a-offscreen').text().trim();
                            price = parseFloat(price.split('€')[0]);
                            res.price = price;
                        }
                        



                        

                    } else {
                        console.log('la disposition classique');
                        var res = {
                            //ça c'est la disposition html la plus classique
                            "name": root.querySelector('#productTitle').text.trim(),
    
                            "asin": asin,
    
                            "image": root.querySelector('#landingImage').getAttribute('src'),
    
                            "price": parseInt(root.querySelector('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span.a-offscreen').text.trim().split('€')[0].replace(/\s+/g, '').replace(',', '.')),
    
                            "timestamp": getTimeStamp(),
                        }

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

//const ASIN = 'B07TJKCCRJ';
//(async () => {console.log(await getPrice(ASIN));})();


