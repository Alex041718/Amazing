// La fonction permer de récupérer les données enregistrées dans dataProducts.json pour un produit donné avec son ASIN.

const getAmazonProduct = require('./getAmazonProductByASIN');

const fs = require('fs');

const path = require('path');


// Récupération des données du fichier dataProducts.json
const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
const rawData = fs.readFileSync(filePathProducts);
const data = JSON.parse(rawData);

//const ASIN = 'B07W6JFPT1' // connu
const ASIN = 'B08N36XNTT' // pas connu

async function getDataByASINorNot(asin) {

    var jsonProduct = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i].asin === asin) {


            jsonProduct = data[i];
            // last timestamp and price
            jsonProduct['timestamp'] = data[i].data[data[i].data.length - 1].timestamp;
            jsonProduct['price'] = data[i].data[data[i].data.length - 1].price;
            jsonProduct['alreadySaved'] = true;
            return Promise.resolve(jsonProduct);

        }
    }

    return new Promise((resolve, reject) => {
        return getAmazonProduct(asin)
            .then((jsonProduct) => {
                try {
                    jsonProduct['alreadySaved'] = false;
                    resolve(jsonProduct)
                } catch (error) {
                    reject(error)
                }

            })
            .catch((error) => {
                reject(error);
            });
    })
};


//getDatabyASINorNot(ASIN).then((response) => { console.log(response) });

module.exports = getDataByASINorNot;
