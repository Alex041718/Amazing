const axios = require('axios');
const { parse } = require('node-html-parser');



//const ASIN = 'B09Y98HZW3'


async function getImage(asin) {

    let config = {
        method: 'get',
        url: `https://www.amazon.fr/dp/${asin}`
    };

    return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                try {
                    var root = parse(response.data);


                    var image = root.querySelector('#landingImage').getAttribute('src');

                    resolve(image);
                } catch (error) {
                    reject(error);
                }

            })
            .catch((error) => {
                reject(error);
            });
    })
};

//getImage(ASIN).then((response) => { console.log(response) });

module.exports = getImage;