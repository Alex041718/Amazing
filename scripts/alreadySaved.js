const fs = require('fs');

const path = require('path');

const pathFile = path.join(__dirname, '..', 'data', 'dataProducts.json');

const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
const rawData = fs.readFileSync(filePathProducts);
const data = JSON.parse(rawData);   

function alreadySaved(asin) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].asin === asin) {
            return true;
        }
    }
}