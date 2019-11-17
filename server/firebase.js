
var chokidar = require('chokidar');
const { Storage } = require('@google-cloud/storage');
const projectId = "streamdata-3be64";
const keyFilename = "./config/streamdata-3be64-firebase-adminsdk-hcalr-ae8ff8d64d.json";
const storage = new Storage({ keyFilename, projectId });



const bucket = storage.bucket("streamdata-3be64.appspot.com");

/**
 * Adding new file to the storage
 */


var watcher = chokidar.watch('./media/live', { ignored:/.*\.tmp$/, persistent: true });

watcher
    .on('add', function (path) { 
        // console.log('File', path, 'has been added');
        var folder = getStreamKeyFromStreamPath(path);
        uploadFile(folder,path);

    })
    .on('change', function (path) { 
        // console.log('File', path, 'has been changed'); 
        var folder = getStreamKeyFromStreamPath(path);

        uploadFile(folder,path);
    })

// chokidar.watch('./media/live').on('all', (event, path) => {
//     console.log(event, path);


// });

// var filename = './media/live/bsv72m6W/chunk-stream0-00053.m4s';

async function uploadFile(uploadTo, filename) {
    // Uploads a local file to the bucket
    await storage.bucket(bucket.name).upload(filename, {
        destination:uploadTo,
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
    });

    console.log(`${filename} uploaded to ${bucket.name}.`);
}

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 2]+"/"+parts[parts.length - 1];
};
