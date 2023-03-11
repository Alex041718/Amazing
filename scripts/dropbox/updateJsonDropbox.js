const Dropbox = require('dropbox').Dropbox;


// ACCESS TOKEN
const accessToken = 'sl.BaXDoZiJO1EUo9VRWGYWHBA0OgQxUZohj3heOBFUGprFHUbE7ha1gGh1qAyexn6YxxNEII9TDHIRAGGZRt_hqx-ujE5Lk7ReeaG1_OqWgWitZyA702dlpfZjvV7H3FBkLm__VCGw';
const dbx = new Dropbox({ accessToken: accessToken });

async function updateJsonFile(newData,pathOldData) {
  const path = pathOldData;
  try {
    // 1. Get current file metadata
    const currentFileMetadata = await dbx.filesGetMetadata({ path });

    // 2. Upload new file content
    const fileContent = newData;
    await dbx.filesUpload({ path, contents: fileContent, mode: { '.tag': 'overwrite' } });

    // 3. Update file metadata with original values, except for modified time
    //const newFileMetadata = { ...currentFileMetadata };
    //delete newFileMetadata.server_modified;
    //delete newFileMetadata.client_modified;
    //await dbx.filesUpdateMetadata({ path, ...newFileMetadata });

    console.log('File updated successfully!');
  } catch (error) {
    console.error(error);
  }
}

module.exports = updateJsonFile;
