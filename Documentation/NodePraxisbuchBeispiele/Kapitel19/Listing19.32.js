var http = require('http');

http.createServer(function (req, res) {
    res.end('Hello Client');
}).listen(8080);
