const fs = require('fs');
const getAmazonProduct = require('./getAmazonProduct');
const path = require('path');


function getProduct(url){
    getAmazonProduct(url).then(res => saveProductJson(res));
}

function saveProductJson(product){

    // Product is one parameter.
    
    // Json data
    const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);   

    //booleen
    

    if (data.find(p => p.name === product.name)) {

        data.find(p => p.name === product.name).data.push({
            "price": product.price,
            "timestamp": product.timestamp
        })

    } else {

        data.push({
            "name": product.name,
            "url": product.url,
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