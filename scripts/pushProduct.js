const saveProduct = require('./saveProductJson');
const fs = require('fs');


const rawData = fs.readFileSync('../data/listProducts.json');
const data = JSON.parse(rawData);  

function fetchListSystem(){

    data.forEach(url => {
        saveProduct(url);
    });
}

fetchListSystem();
