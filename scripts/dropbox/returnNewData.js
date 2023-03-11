const fs = require('fs');
const getAmazonProduct = require('./getAmazonProduct');
const getJsonDropbox = require('./getJsonDropbox');

//const getAmazonProduct = require('./getAmazonProduct');


// Lecture du fichier JSON
//const rawData = fs.readFileSync('../data/Products.json');
//const data = JSON.parse(rawData);



//console.log(data);

// Modification des données
//data.products = 'bar';







function returnNewData(product,data){

    // Product is one parameter.
    
    // Json data
    //const rawData = fs.readFileSync('../data/Products.json');
    //const data = JSON.parse(rawData);   

    

    if (data.find(p => p.url === product.url)) {

        data.find(p => p.url === product.url).data.push({
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
    //fs.writeFileSync('../data/Products.json', JSON.stringify(data, null, 4));
    return JSON.stringify(data, null, 4);

}

// TEST



//const url ='https://www.amazon.fr/Apple-MX532ZMA-Nouveau-AirTag/dp/B0935DN1BN/ref=sr_1_1_sspa?keywords=airtags&qid=1678472001&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
//getAmazonProduct(url).then(produit => getJsonDropbox('/dataProducts.json').then(data => console.log(returnNewData(produit,data))));

module.exports = returnNewData;


