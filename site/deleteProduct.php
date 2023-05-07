<?php // Récupérer l'ASIN et le prix de l'URL
$asin = $_GET['asin'];
?>


<html>
<head>
	<title>Redirection</title>
	<meta http-equiv="refresh" content="1; url=<?php echo "https://amazing.alexandre-le-marec.fr/seeDataBase.php";?>">
</head>
<body>

<?php




echo("Suppression du produit en cours ...");

// -------------- CHANGEMENT DU PRIX D'ALERT

// Construire l'URL de la requête en utilisant la valeur de la constante ASIN
$url = "http://51.38.35.91:3000/products/deleteProduct?ASIN={$asin}";


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

?>
</body>
</html>