const returnNewData = require('./returnNewData.js');
const getAmazonProduct = require('./getAmazonProduct');
const getJsonDropbox = require('./getJsonDropbox');


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



const url ='https://www.amazon.fr/Apple-MME73ZM-A-AirPods-3ᵉ-génération/dp/B09JQQDLXF/?_encoding=UTF8&pd_rd_w=hNFIJ&content-id=amzn1.sym.433f04b4-c8e6-4a90-8add-4e9e0dffd72d&pf_rd_p=433f04b4-c8e6-4a90-8add-4e9e0dffd72d&pf_rd_r=6KHMQATDVKWM6872BFC4&pd_rd_wg=HItKE&pd_rd_r=5a68aa9b-24f6-4df0-a7cb-ac643a1b8ebe&ref_=pd_gw_ci_mcx_mr_hp_atf_m';

//getAmazonProduct(url).then(produit => getJsonDropbox('/dataProducts.json').then(data => console.log(returnNewData(produit,data))));



getJsonDropbox('/dataProducts.json').then( res => console.log(JSON.stringify(res, null, 4)));