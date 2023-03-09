const fs = require('fs');
const getAmazonProduct = require('./getAmazonProduct');


//const getAmazonProduct = require('./getAmazonProduct');


// Lecture du fichier JSON
//const rawData = fs.readFileSync('../data/Products.json');
//const data = JSON.parse(rawData);



//console.log(data);

// Modification des données
//data.products = 'bar';



function getProduct(url){
    getAmazonProduct(url).then(res => saveProductJson(res));
}

function saveProductJson(product){

    // Product is one parameter.
    
    // Json data
    const rawData = fs.readFileSync('../data/Products.json');
    const data = JSON.parse(rawData);   

    //booleen
    let thereIsAlready;

    data.forEach(element => {
        if (element.name == product.name) {
            thereIsAlready = true;
        } else {
            thereIsAlready = false;
        }
    });

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
    fs.writeFileSync('../data/Products.json', JSON.stringify(data, null, 4));


}

module.exports = getProduct;