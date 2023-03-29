<html>
    <head>
        <title>My First Web Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styleIndex.css">
        <meta charset="utf-8">
    </head>
    <body>
        <h1 id="title">My First Web Page</h1>
        
        <div id="container">

        <div id="boxAnnexe">
            <h1>599€</h1>
            <img id="pictureProcduct" src="picture/airpodsMAX.jpg">
            <hr id="lineSeparator">
            <p>450€</p>

            <form>
            <input id="inputPrice">
            <button id="buttonSetPrice">Set alert</button>
            </form>
        </div>

        
        <div id="boxChart">
        <canvas id="myChart"></canvas>
        </div>
        
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <script>
            fetch('http://51.38.35.91:3000/products')
            .then(response => response.json())
            .then(dataAPI => {
                
                console.log(dataAPI[0]);
                
                const product = dataAPI[0];
                const prices = [];
                const dates = [];
                document.getElementById('title').innerHTML = product.name;
                

                for (let i = 0; i < product.data.length; i++) {
                    prices.push(product.data[i].price);
                    dates.push(product.data[i].timestamp);
                }

                console.log(prices);
                console.log(dates);




                const ctx = document.getElementById('myChart').getContext('2d');
        
                const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,//['January', 'February', 'March', 'April', 'May', 'June', 'July']
                    datasets: [{
                    label: product.name + ' Price',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: prices,//[0, 10, 5, 2, 20, 65, 45]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    
    
                }
                });
            });
        </script>

        <script>


        
        

        </script>
    </body>
</html>