var fs = require('fs');
var http = require('http');
var util = require('./src/util.js');

http.createServer(function (req, res) {
    // set up some routes
    switch(req.url) {
        case '/api':
            if (req.method == 'GET') {
                console.log("[200] " + req.method + " to " + req.url);
                fs.readFile('./demo.json', function(err, json) {
                    if(err) {
                        res.writeHead(500, "Not found", {'Content-Type': 'text/html'});
                        res.end('<html><head><title>Errör</title></head><body><h1>Bedoooow</h1></body></html>');
                    } else {
                        console.log(json.toString());
                        res.writeHead(200, "OK", {'Content-Type': 'text/json'});
                        res.write(json.toString(), 'utf-8');
                        res.end();
                    }
                });
            } else if (req.method == 'POST') {
                var dt;
                console.log("[200] " + req.method + " to " + req.url);

                req.on('data', function(chunk) {
                    console.log("Received body data:");
                    console.log(chunk.toString());
                    dt = chunk.toString();
                    var stream = fs.createWriteStream('demo.json');
                    stream.once('open', function(fd) {
                        stream.write(chunk.toString());
                        stream.end();
                    });
                });

                req.on('end', function() {
                    res.writeHead(200, "OK", {'Content-Type': 'text/json'});
                    res.write(dt, 'utf-8');
                    res.end();
                });
            }
            break;
        default:
            fs.readFile('.' + req.url, function (err, html) {
                if (err) {
                    res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
                    res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
                    console.log("[404] " + req.method + " to " + req.url);  
                } else {
                    res.writeHead(200, "OK", {'Content-Type': util.guessMimeType(req.url)});
                    res.write(html);
                    res.end();
                }
            });
    };
}).listen(8080); 