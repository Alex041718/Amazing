const fs = require('fs');
const rerurnNewData = require('./returnNewData');
const getJsonDropbox = require('./getJsonDropbox');
const updateJsonDropbox = require('./updateJsonDropbox');

const pathList = '/listProducts.json';

function getListUrl() {
    getJsonDropbox(pathList).then(res => fetchListSystem(res));
}


function fetchListSystem(data) {
    
    data.forEach(url => {
        //console.log(url);
        updateJsonDropbox(rerurnNewData(url),'/dataProducts.json').then(console.log("c fini je crois"));
        
    });
}

getListUrl();
