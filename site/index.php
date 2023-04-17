<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <link type="text/css" rel="stylesheet" href="styleSearch.css" />
</head>

<body>


<?php if (empty($_GET)): ?> <!-- IF -->


<h1>Search</h1>
<form action='index.php' method='GET'>
    <input type="text" name="S">
    <button type="submit">Search</button>
</form>





<?php else: ?> <!-- ELSE -->



<?php $search = $_GET['S']; ?>

<h1>Search</h1>
<form action='index.php' method='GET'>
    <input type="text" name="S" value="<?php echo $search ?>">
    <button type="submit">Search</button>
</form>

<?php
echo $search;
$searchEncode = urlencode($search);

$url = "http://51.38.35.91:3000/products/getDataSearch?S={$searchEncode}";
$curl = curl_init();

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

$data = json_decode($response);

print_r($data);


?>



<?php for ($i = 0; $i < 4; ++$i): ?>

<?php

    //echo $data[$i], "-";

    $asin = $data[$i];

    $url = "http://51.38.35.91:3000/products/getDataPage?ASIN={$asin}";

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
    
    
    $dataAPI = json_decode($response, true);

    
?>

<div class="productContainer">
    <img src="<?php echo $dataAPI['image'] ?>" width="100px">
    <a href='https://amazing.alexandre-le-marec.fr/product.php?asin=<?php echo $dataAPI['asin'] ?>'><h3><?php echo $dataAPI['name'] ?></h3></a>
    <p><?php echo $dataAPI['price'] ?></p>
    <?php

if($dataAPI['alreadySaved'] != 1){echo "<form action='addProduct.php?asin={$asin}&direction=searchPage&searchedword={$searchEncode}' id='formAddProduct' method='POST'>
    
    
    <button id='buttonAddProduct' type='submit'>Add product <b>+</b> </button>
    </form>";}
else{echo "non";}


?>
</div>


<?php endfor; ?>





<?php endif; ?>


</body>
</html>