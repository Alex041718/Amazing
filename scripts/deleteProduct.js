const fs = require('fs');
const path = require('path');
const alreadySaved = require('./alreadySaved');



function deleteProduct(asin) {
    if (alreadySaved(asin) === true) {
        // DATA
        const filePathProducts = path.join(__dirname, '..', 'data', 'dataProducts.json');
        const rawData = fs.readFileSync(filePathProducts);
        const data = JSON.parse(rawData);  

        // Liste des produits
        const filePathListProducts = path.join(__dirname, '..', 'data', 'listProducts.json');
        const rawDataListProducts = fs.readFileSync(filePathListProducts);
        const listProducts = JSON.parse(rawDataListProducts);

        // Suppression de l'ASIN dans la liste des produits
        const indexList = listProducts.findIndex(p => p === asin);


        const index = data.findIndex(p => p.asin == asin);

        if (index !== -1 ) {
            data.splice(index, 1);
        }

        if (indexList !== -1 ) {
            listProducts.splice(indexList, 1);
        }

        // Écriture des modifications dans le fichier JSON
        fs.writeFileSync(filePathProducts, JSON.stringify(data, null, 4));
        fs.writeFileSync(filePathListProducts, JSON.stringify(listProducts, null, 4));
    } else {
        return asin + ' not in data base';
    }
}

module.exports = deleteProduct;
//const asin = "B0BDJH7J5C";
//deleteProduct(asin);