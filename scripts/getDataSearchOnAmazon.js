const axios = require('axios');
const { parse } = require('node-html-parser');
const getData = require('./getDataByASINorNot.js');



async function getListSearch(search) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.amazon.fr/s?k=${search}`,
        headers: { 
          'Host': 'www.amazon.fr', 
          'Cookie': 'i18n-prefs=EUR; session-id=262-9166251-5336201; session-id-time=2082787201l; session-token="LSVc2a4QHnIWgEH5KceUPwLPAST4V3jLMo2O5AEzACECxGRwMejPjhh1dZ8ADJ1yldTID6rSekRe+L9twuPZD92pgDNHW3SSnOYqVPbQdz9z8j3N8QOdmNM+5UAvBcR1jtP6u71GnWYQGKdpuIpvyaS5HLdqgDi4jPnZ39H9oJpbSsbIypWTCvxnfxrDPutamLSFKC/O6wSebYoGSSXjM+9LaREYqEZ07x7R+th/qN4="; ubid-acbfr=259-4082130-8876267'
        }
      };

    return new Promise((resolve, reject) => {
        axios.request(config)
            .then(async (response) => {
                try {
                    var root = parse(response.data);
                    var res = [];

                    for (let index = 4; index < 5+4; index++) {
                        asin = root.querySelector(`#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t3.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(${index})`).getAttribute("data-asin");

                        if (asin != '') {
                            const response = await getData(asin);
                            res.push(response);
                        }
                    }

                    // Wait for all promises to resolve before resolving the main promise
                    await Promise.all(res);

                    resolve(res);
                } catch (error) {
                    reject(error);
                }

            })
            .catch((error) => {
                reject(error);
            });
    });
};


module.exports = getListSearch;

//const search= 'iphone';
//const search= 'airpods+max';

//getListSearch(search).then((response) => { console.log(response) });
