const fs = require('fs');

const path = require('path');



const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
const rawData = fs.readFileSync(filePathProducts);
const data = JSON.parse(rawData);   

//const ASIN = 'B09G6TX7L5'

function alreadySaved(asin) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].asin === asin) {
            return true;
        }
    }
    return false;
}

module.exports = alreadySaved;

//console.log(alreadySaved(ASIN));