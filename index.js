const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');


const fs = require('fs');

const getPrice = require('./scripts/getAmazonProductByASIN');
const getData = require('./scripts/getDataByASINorNot');
const addProduct = require('./scripts/addProductByASIN');
const pushOneProduct = require('./scripts/pushOneProduct');
//const pushProduct = require('./scripts/pushProduct');
const getDataSearch = require('./scripts/getDataSearchOnAmazon');
const changeAlertPrice = require('./scripts/changeAlertPrice');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the cors middleware to allow access from any origin
app.use(cors());

// Function to handle the root path
app.get('/products/getProductByASIN', async function(req, res) {

   

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

app.get('/products/pushOneProduct', async function(req, res) {

   

    if (req.query.ASIN) {
        pushOneProduct(req.query.ASIN);
        res.send("Product pushed");
    } else {
        res.send("No ASIN provided");
    }
    
});

app.get('/products/getDataPage', async function(req, res) {

    

    if (req.query.ASIN) {
        getData(req.query.ASIN).then((response) => {
            res.send(response);
        }).catch((error) => {
            res.status(404)
            res.send("Product not found");
        });
    } else {
        res.send("No ASIN provided");
    }
    
});

app.get('/products/getDataSearch', async function(req, res) {

    

    if (req.query.S) {
        getDataSearch(req.query.S).then((response) => {
            res.send(response);
        }).catch((error) => {
            res.status(404)
            res.send("Error 404, wesh");
        });
    } else {
        res.send("No argument provided");
    }
    
});



app.get('/products/addProduct', async function(req, res) {

    

    if (req.query.ASIN) {
        addProduct(req.query.ASIN);
        
        res.send("Product added");
    } else {
        res.send("No ASIN provided");
    }
    
});

app.get('/products/changeAlertPrice', async function(req, res) {

    

    if (req.query.ASIN && req.query.newPrice) {
        
        changeAlertPrice(req.query.ASIN, req.query.newPrice);
        res.send("Price changed");
    } else {
        res.send("No ASIN or no new price provided ");
    }
    
});



app.get('/products', async function(req, res) {

    const filePathProducts = path.join(__dirname, 'data', 'dataProducts.json');
    const rawData = fs.readFileSync(filePathProducts);
    const data = JSON.parse(rawData);   
    
    res.send(data);
    
});






let server = app.listen(3000, function() {
    console.log('Server is listening on port 3000')
});