const pushOneProduct = require('./pushOneProduct');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'listProducts.json');
const rawData = fs.readFileSync(filePath); //'../data/listProducts.json'
const data = JSON.parse(rawData);



function fetchListSystem(){

    data.forEach(asin => {
        pushOneProduct(asin);
    });
}

module.exports = fetchListSystem;

fetchListSystem();
