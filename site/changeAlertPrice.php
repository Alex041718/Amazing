<?php

// Récupérer l'ASIN et le prix de l'URL
$asin = $_GET['ASIN'];
$newPrice = $_GET['newPrice'];

echo("changement du prix en cours ...");

// -------------- CHANGEMENT DU PRIX D'ALERT

// Construire l'URL de la requête en utilisant la valeur de la constante ASIN
$url = "http://51.38.35.91:3000/products/changeAlertPrice?ASIN={$asin}&newPrice={$newPrice}";

?>