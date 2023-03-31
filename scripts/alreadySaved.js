const fs = require('fs');

const path = require('path');



const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
const rawData = fs.readFileSync(filePathProducts);
const data = JSON.parse(rawData);   

//const ASIN = 'B0935DN1BN'

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