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


<h1>Les produits enregistrés</h1>

<?php
//echo $search;


$url = "http://51.38.35.91:3000/products/";
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

$i = 0;

//echo $data;
//print_r($data);

?>

<div id="productsContainer">

<?php if ($data != null): ?>

<?php foreach ($data as $item): ?>
    <?php $i++; ?>
    
    <div class="oneProduct">
        <img src="<?php echo $item->image ?>" alt="image">
        <div class="productInfo">
            <a href='https://amazing.alexandre-le-marec.fr/product.php?asin=<?php echo $item->asin; ?>'>
                <h3 class="name" id="name<?php echo($i); ?>"><?php echo str_replace("'", "\'", str_replace('"', '\"', $item->name)); ?></h3>
            </a>
            <script>
                const titleElement<?php echo($i); ?> = document.querySelector('#name<?php echo($i); ?>'); // sélectionne l'élément HTML contenant le titre du produit
const limit<?php echo($i); ?> = 60; // définit la limite de caractères souhaitée
const reduceTitle<?php echo($i); ?> = titleElement<?php echo($i); ?>.textContent.slice(0, limit<?php echo($i); ?>) + '...';
if (titleElement<?php echo($i); ?>.textContent.length > limit<?php echo($i); ?>){
    titleElement<?php echo($i); ?>.textContent = reduceTitle<?php echo($i); ?>;
}

</script>

            <span class="price"><?php echo end($item->data)->price ?> €</span>
            

            <i  class='fa-solid fa-check check' style='color: #00f900;'></i>
        </div>
    </div>
<?php endforeach; ?>
<?php else: ?>
<h1>Erreur... Mince alors AHAH</h1> <!-- $data est null -->
<?php endif; ?>
</div>



</body>
</html>