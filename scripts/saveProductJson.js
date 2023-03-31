const fs = require('fs');
const getAmazonProduct = require('./getAmazonProductByASIN');
const path = require('path');


function getProduct(asin){
    getAmazonProduct(asin).then(res => saveProductJson(res));
}

function saveProductJson(product){

    // Product is one parameter.
    
    // Json data
    const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);   

    //booleen
    

    if (data.find(p => p.asin === product.asin)) {

        data.find(p => p.asin === product.asin).data.push({
            "price": product.price,
            "timestamp": product.timestamp
        })

    } else {

        data.push({
            "name": product.name,
            "asin": product.asin,
            "data": [
                {
                    "price": product.price,
                    "timestamp": product.timestamp
                }
            ]
        })

    }

    // Écriture des modifications dans le fichier JSON
    fs.writeFileSync(filePathProducts, JSON.stringify(data, null, 4));


}

module.exports = getProduct;