
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
const reduceTitle = titleElement.textContent.slice(0, limit) + '...';
const longTitle = '<?php echo $dataAPI['name'] ?>';
titleElement.textContent = reduceTitle; // affiche le texte tronqué

titleElement.addEventListener('click', function() {
  if (titleElement.innerHTML.length > limit+3) {
    
    titleElement.innerHTML = reduceTitle;
    
  } else {
    titleElement.innerHTML = longTitle;
    
  }
});

        </script>
        
        <div id="container">

        <div id="boxAnnexe">
            <h1><?php echo $dataAPI['price'] . "€" ?></h1>
            <img id="pictureProcduct" src="<?php echo $dataAPI['image'] ?>">
            <hr id="lineSeparator">
            <p>450€</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="h-6 w-6 mr-3 fill-orange" aria-hidden="true"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path></svg>

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