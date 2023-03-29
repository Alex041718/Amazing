const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

const fs = require('fs');

const getPrice = require('./scripts/getAmazonProductByASIN');


let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/products/getProductByASIN', async function(req, res) {

    // Access the provided 'page' and 'limt' query parameters

    if (req.query.ASIN) {
        getPrice(req.query.ASIN).then((response) => {
            res.send(response);
        }).catch((error) => {
            res.status(404)
            res.send("Product not found");
        });
    } else {
        res.send("No ASIN provided");
    }
    
});

app.get('/products', async function(req, res) {

    const filePathProducts = path.join(__dirname, 'data', 'dataProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);   
    
    res.send(data);
    
});






let server = app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});