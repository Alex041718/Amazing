
const updateJsonDropbox = require('./updateJsonDropbox.js');


const data = [
    {
        "name": "        Apple AirTag       ",
        "url": "https://www.amazon.fr/Apple-MX532ZMA-Nouveau-AirTag/dp/B0935DN1BN/ref=sr_1_1_sspa?keywords=airtags&qid=1678472001&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        "data": [
            {
                "price": 34,
                "timestamp": "3/11/2023, 12:19:18 AM"
            }
        ]
    }
]

const dataTraited = JSON.stringify(data, null, 4);

updateJsonDropbox(dataTraited,'/dataProducts.json').then(console.log("c fini je crois"));