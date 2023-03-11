const Dropbox = require('dropbox').Dropbox;

// ACCESS TOKEN
const accessToken = 'sl.BaXDoZiJO1EUo9VRWGYWHBA0OgQxUZohj3heOBFUGprFHUbE7ha1gGh1qAyexn6YxxNEII9TDHIRAGGZRt_hqx-ujE5Lk7ReeaG1_OqWgWitZyA702dlpfZjvV7H3FBkLm__VCGw';
const dbx = new Dropbox({ accessToken: accessToken });

async function getJsonDropbox(path) {
  try {
    const response = await dbx.filesDownload({ path: path });
    const buffer = response.result.fileBinary;
    const data = buffer.toString('utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//getJsonDropbox('path' of course).then(res => console.log(res));


module.exports = getJsonDropbox;