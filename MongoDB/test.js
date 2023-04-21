var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://51.38.35.91:27017/Amazing";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("connected to db");
  db.close();
});