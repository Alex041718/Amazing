// Inclure le SDK Dropbox
<script src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="VOTRE_CLÉ_D'APPLICATION_DROPBOX"></script>

const accessToken = 'sl.BaVxKK45rPvaISlI2TO4zzTLD_1a1wM-79hJBkhw6cHGeHxp98Vys-om4qXXaXy7Pq804rePkfhAg4HMpeHnDwm3_sgsCMT2QJ71DGTe1G6fGvJR5RtopKslMAsJgIj7hmXpDd8';

// Accéder au fichier JSON
var dbx = new Dropbox.Dropbox({ accessToken: accessToken });
dbx.filesDownload({ path: '/Amazing/listProducts.json' })
  .then(function(response) {
    var reader = new FileReader();
    reader.readAsText(response.fileBlob);
    reader.onload = function() {
      var data = JSON.parse(reader.result);
      console.log(data);
    };
  })
  .catch(function(error) {
    console.error(error);
  });
