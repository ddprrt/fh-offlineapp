/**
 * basic mime type guessing util
 */
var mimeTypes = {
        'js': 'application/javascript',
        'json': 'application/json',
        'html': 'text/html',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'png': 'image/png',
        'tiff': 'image/tiff',
        'pdf': 'application/pdf',
        'mp3': 'audio/mp3',
        'm4a': 'audio/m4a',
        'css': 'text/css'
    },
    defaultMimeType = 'application/octet-stream';

function guessMimeType(fileName) {
    var idx = fileName.lastIndexOf('.');
    if (-1 === idx) {
        return defaultMimeType;
    }

    var extension = fileName.substr(idx + 1);

    return mimeTypes[extension] || defaultMimeType;
}

exports.guessMimeType = guessMimeType;