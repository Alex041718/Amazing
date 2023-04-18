const fs = require('fs');
const path = require('path');

function changeAlertPrice(asin, newPrice) {


    const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);  

    data.find(p => p.asin == asin)['alertPrice'] = newPrice;


    // Écriture des modifications dans le fichier JSON
    fs.writeFileSync(filePathProducts, JSON.stringify(data, null, 4));
    
}
module.exports = changeAlertPrice;

//const asin ='B0935DN1BN';
//changeAlertPrice(asin, 1000);
