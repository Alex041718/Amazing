<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/a12680d986.js" crossorigin="anonymous"></script>
    <link type="text/css" rel="stylesheet" href="styleSearch.css" />
    <link type="text/css" rel="stylesheet" href="button.css" />
    <title>Amazing</title>
</head>

<body>


<?php if (empty($_GET)): ?> <!-- IF -->


<h1>Amazing</h1>

<form id="searchForm" action='index.php' method='GET'>
    <input id="searchInput" type="text" name="S">
    <button type="submit">Search</button>
</form>

<img id="gif" src="gif/cat.gif">



<?php else: ?> <!-- ELSE -->



<?php $search = $_GET['S']; ?>

<h1>Amazing</h1>
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

        <a href='https://amazing.alexandre-le-marec.fr/product.php?asin=<?php echo $dataAPI['asin'] ?>'>
            
            
            <h3 class="name" id="name<?php echo($i); ?>"><?php echo str_replace("'", "\'", str_replace('"', '\"', $dataAPI['name'])); ?></h3>
            <script>
                const titleElement<?php echo($i); ?> = document.querySelector('#name<?php echo($i); ?>'); // sélectionne l'élément HTML contenant le titre du produit
const limit<?php echo($i); ?> = 60; // définit la limite de caractères souhaitée
const reduceTitle<?php echo($i); ?> = titleElement<?php echo($i); ?>.textContent.slice(0, limit<?php echo($i); ?>) + '...';
const longTitle<?php echo($i); ?> = '<?php echo str_replace("'", "\'", str_replace('"', '\"', $dataAPI['name'])); ?>';
titleElement<?php echo($i); ?>.textContent = reduceTitle<?php echo($i); ?>;
                
            </script>
        </a>

        <span class="price"><?php echo $dataAPI['price'] ?> €</span>
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