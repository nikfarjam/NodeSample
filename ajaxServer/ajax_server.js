var fs = require('fs');
var empty = require("is-empty");

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log("Reguest url is \'" + req.url + "\'");
  
  if (!empty(req.url)) {
    var pathFile = __dirname + '/files' + req.url;
  
    if (fs.existsSync(pathFile)){
      console.log('Try to load ' + pathFile);
      var stream = fs.createReadStream(pathFile);
      stream.pipe(res);
    } else {
      console.log("File not found (" + pathFile + ")");
      res.end("File not found (" + req.url + ")");
    }
    
  } else {
    res.end("404");
  }
}).listen(8080);
console.log('Server running!');
