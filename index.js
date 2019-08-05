
var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
  
    res.end('ALA-PROXY: Something went wrong. And we are reporting a custom error message.');
  });

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    console.log("ALA-PROXY: dumping request headers\n" + JSON.stringify(req.headers, true, 2))
    proxy.web(req, res, { target: 'http://image-sample:8080' });
  });
  
  console.log("ALA-PROXY: listening on port 3000")
  server.listen(3000);
