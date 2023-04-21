var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Amazing";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected successfully to server');

  const db = client.db('Amazing');
  // Votre code pour interagir avec la base de données ici
});