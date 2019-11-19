
var chokidar = require('chokidar');
const { Storage } = require('@google-cloud/storage');
const projectId = "streamdata-3be64";
const keyFilename = "./config/stream-259020-firebase-adminsdk-z0kuq-cc9d2f5021.json";
const storage = new Storage({ keyFilename, projectId });
const fs = require('fs');

const bucket = storage.bucket("stream-259020.appspot.com");

/**
 * Adding new file to the storage
 */


var watcher = chokidar.watch('./media/live', { ignored: /.*\.tmp$/, persistent: true });

watcher
    .on('add', function (path) {
        // console.log('File', path, 'has been added');
        var folder = getStreamKeyFromStreamPath(path);
        uploadFile(folder, path);
        // setTimeout(downloadFile(bucket, folder), 500);
        // fs.closeSync(fs.openSync('./consumer/live/'+folder, 'w'));
        // downloadFile(bucket, folder);


    })
    .on('change', function (path) {
        // console.log('File', path, 'has been changed'); 
        var folder = getStreamKeyFromStreamPath(path);

        uploadFile(folder, path);
        // fs.closeSync(fs.openSync('./consumer/live/'+folder, 'w'));
        // setTimeout(downloadFile(bucket, folder), 500);
        // downloadFile(bucket, folder);

    })


async function uploadFile(uploadTo, filename) {
    // Uploads a local file to the bucket
    await storage.bucket(bucket.name).upload(filename, {
        destination: uploadTo,
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
    return parts[parts.length - 2] + "/" + parts[parts.length - 1];
};

const getFileFromPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

async function downloadFile(bcktName, filename) {

    let bucketName = bcktName;
    let srcFilename = filename;
    let destFilename = '../streamApp_consumer/server/media/live/' + filename;

    let options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: destFilename,
    };

    // usage
    // fs.closeSync(fs.openSync(destFilename, 'w'));
    

    // Downloads the file
    await storage
        .bucket("stream-259020.appspot.com")
        .file(srcFilename)
        .download(options);

    console.log(
        `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );

}

