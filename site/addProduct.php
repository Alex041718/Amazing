<html>
<?php 
$asin = $_GET['asin'];
$direction = $_GET['direction']; //productPage or searchPage Si searchPage, on redirige vers la page de recherche avec $searchedword en paramètre.

if ($direction == "productPage") {
  $url = "https://amazing.alexandre-le-marec.fr/product.php?asin={$asin}";
} else {
  $searchedword = urlencode($_GET['searchedword']);
  $url = "https://amazing.alexandre-le-marec.fr/index.php.php?S={$searchedword}";
}

?>

<head>
	<title>Redirection</title>
	<meta http-equiv="refresh" content="5; url=<?php echo $url;?>">
</head>

<body>

  <?php
  // Définir la constante ASIN avec une valeur

  //$asin = $_GET['asin'];


  echo ("Ajout en cours ...");
  // -------------- AJOUT DU PRODUIT DANS LA BASE DE DONNÉES
  // Construire l'URL de la requête en utilisant la valeur de la constante ASIN
  $url = "http://51.38.35.91:3000/products/addProduct?ASIN={$asin}";

  $curl = curl_init();


  // Requête GET de l'API
  curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
  ));

  $response = curl_exec($curl);

  curl_close($curl);

  sleep(2);


  // -------------- SCRAPPING POUR L'UNIQUE PRODUIT

  $url = "http://51.38.35.91:3000/products/pushOneProduct?ASIN={$asin}";

  $curl = curl_init();


  // Requête GET de l'API
  curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
  ));

  $response = curl_exec($curl);

  curl_close($curl);

  sleep(1);



  // Redirection vers la page d'accueil avec un paramètre successAdd
  //echo "Location: https://amazing.alexandre-le-marec.fr/index.php?asin={$asin}&successAdd=true"
  //header("Location: https://amazing.alexandre-le-marec.fr/index.php?asin={$asin}");
  //exit();


  ?>

</body>

</html>