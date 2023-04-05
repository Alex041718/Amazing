
<?php
// Définir la constante ASIN avec une valeur

//$asin = "B08Q29FZNF";
$asin = $_GET['asin'];
// Construire l'URL de la requête en utilisant la valeur de la constante ASIN
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
//echo gettype($dataAPI);
//echo $dataAPI['image']

if ($dataAPI['alreadySaved'] == true) {
    $prices = array();
    $dates = array();

    foreach ($dataAPI['data'] as $element) {
        array_push($prices, $element['price']);
        array_push($dates, $element['timestamp']);
}
}

//echo json_encode($prices);
//print_r($dates);
//print_r($dataAPI);


if($dataAPI['alreadySaved'] == true){
    $newArrayDate = [];

    foreach ($dates as $date) {
        array_push($newArrayDate, date("d-m-Y H:i:s", substr($date, 0, 10)));
    }
};





// La variable $dataAPI contient maintenant les données JSON récupérées depuis l'API pour l'ASIN spécifié.
?>



<html>
    <head>
        <title>Amazing | <?php echo $dataAPI['name'] ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styleIndex.css">
        <meta charset="utf-8">
    </head>
    <body>
        

        <h1 id="title"><?php echo $dataAPI['name'] ?></h1>

        <script>
const titleElement = document.querySelector('#title'); // sélectionne l'élément HTML contenant le titre du produit
const limit = 40; // définit la limite de caractères souhaitée
const truncatedText = titleElement.textContent.slice(0, limit) + '...';
const tesxt = '<?php echo $dataAPI['name'] ?>';
titleElement.textContent = truncatedText; // affiche le texte tronqué

titleElement.addEventListener('click', function() {
  if (titleElement.textContent.length > limit) {
    
    alert("ssfsef")
  } else {
    alert("aaaaa")
  }
});

        </script>
        
        <div id="container">

        <div id="boxAnnexe">
            <h1><?php echo $dataAPI['price'] . "€" ?></h1>
            <img id="pictureProcduct" src="<?php echo $dataAPI['image'] ?>">
            <hr id="lineSeparator">
            <p>450€</p>

            <form id="formPrice">
            
            <input id="inputPrice" placeholder="New price ?">
            
            <button id="buttonSetPrice">Set alert</button>
            </form>
        </div>

        
        <div id="boxChart" style="display: flex;">

<?php

if($dataAPI['alreadySaved'] != 1){echo "<form action='addProduct.php?' id='formAddProduct' method='POST'>
    <img id='svgNoData' src='svg/svgNoData.svg'>
    <input type='text' name='ASIN' value='{$asin}' style='display: none;' >
    </input>
    <button id='buttonAddProduct' type='submit'>Add product <b>+</b> </button>
    </form>";}
else{echo "<canvas id='myChart'></canvas>";}


?>

        
        </div>
        
        </div>

        
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <script>
            

                if (<?php echo "'{$dataAPI['alreadySaved']}'" ?> == 1){
                    const ctx = document.getElementById('myChart').getContext('2d');
                    
                    const chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: <?php if($dataAPI['alreadySaved']){ echo json_encode($newArrayDate);} else {echo "[]";} ?>,//['January', 'February', 'March', 'April', 'May', 'June', 'July']
                        datasets: [{
                        label: "<?php echo str_replace('"', '\"', $dataAPI['name']); ?>" + ' Price',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: <?php if($dataAPI['alreadySaved']){ echo json_encode($prices);} else {echo "[]";}  ?>,//[0, 10, 5, 2, 20, 65, 45]
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        

                    }
                    
                    });
                } else {
                    console.log("false");
                }


                
        </script>

        <script>


        
        

        </script>

        <!--
  ╱|、
(`   -  7
 |、⁻〵
じしˍ,)ノ
            -->
    </body>
</html>