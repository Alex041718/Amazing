<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Lire le contenu du fichier data.json
$data = file_get_contents("../data/dataProducts.json");

// Décoder le contenu en tant qu'objet ou tableau PHP
$newData = json_decode($data);

// Renvoyer le contenu en tant que réponse JSON
echo json_encode($newData);

?>
