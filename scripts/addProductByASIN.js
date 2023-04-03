const fs = require('fs');
const path = require('path');

//const pushProduct = require('./pushProduct');


// Json data

//const ISAN = 'B07PHPXHQS';


function addProduct(asin){

    
    //ouverture
    const filePathProducts = path.join(__dirname, '..', 'data', 'listProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);

    for (let i = 0; i < data.length; i++) {
        if (data[i] === asin) {
            return asin + ' already in listProducts.json';
        }
    }

    
    //ajout
    data.push(asin);

    //sauvegarde
    fs.writeFileSync(filePathProducts, JSON.stringify(data, null, 4));

    //push product added

    //pushProduct();

    return asin + ' added to listProducts.json';


}

module.exports = addProduct;

//console.log(addProduct(ISAN));



