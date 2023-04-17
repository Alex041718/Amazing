<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="https://kit.fontawesome.com/a12680d986.js" crossorigin="anonymous"></script>
    <link type="text/css" rel="stylesheet" href="styleSearch.css" />
    <link type="text/css" rel="stylesheet" href="button.css" />
</head>

<body>


<?php if (empty($_GET)): ?> <!-- IF -->


<h1>Search</h1>

<form id="searchForm" action='index.php' method='GET'>
    <input id="searchInput" type="text" name="S">
    <button type="submit">Search</button>
</form>





<?php else: ?> <!-- ELSE -->



<?php $search = $_GET['S']; ?>

<h1>Search</h1>
<form id="searchForm" action='index.php' method='GET'>
    <input id="searchInput" type="text" name="S" value="<?php echo $search ?>">
    <button type="submit">Search</button>
</form>

<?php
//echo $search;
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

//print_r($data);


?>

<div id="productsContainer">

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

<div class="oneProduct">
    <img src="<?php echo $dataAPI['image'] ?>" >

    <div class="productInfo">
        <a href='https://amazing.alexandre-le-marec.fr/product.php?asin=<?php echo $dataAPI['asin'] ?>'><h3><?php echo $dataAPI['name'] ?></h3></a>
        <span class="price"><?php echo $dataAPI['price'] ?></span>
    <?php

if($dataAPI['alreadySaved'] != 1){echo "<form action='addProduct.php?asin={$asin}&direction=searchPage&searchedword={$searchEncode}' id='formAddProduct' method='POST'>
    
    
    <button class='buttonAddProductSmall' type='submit'>Add product <b>+</b> </button>
    </form>";}
else{echo "<i  class='fa-solid fa-check check' style='color: #00f900;'></i>";}
?>
    </div>
</div>


<?php endfor; ?>

</div>



<?php endif; ?>


</body>
</html>