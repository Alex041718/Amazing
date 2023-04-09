<?php if (empty($_GET)): ?> <!-- IF -->


<h1>Search</h1>
<form action='search.php' method='GET'>
    <input type="text" name="S">
    <button type="submit">Search</button>
</form>





<?php else: ?> <!-- ELSE -->



<?php $search = $_GET['S']; ?>

<h1>Search</h1>
<form action='search.php' method='GET'>
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

//print_r($data);


?>



<?php for ($i = 0; $i < 4; ++$i): ?>

<?php

    echo $data[$i], "-";

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

<div>
    <img src="<?php echo $dataAPI['image'] ?>" width="100px">
    <h3><?php echo $dataAPI['name'] ?></h3>
    <p><?php echo $dataAPI['price'] ?></p>
</div>


<?php endfor; ?>





<?php endif; ?>