var http = require("http");
var util = require('util');
var Firebase = require("firebase");
var qs = require('querystring');
var dbref = new Firebase('https://scorching-inferno-7288.firebaseio.com/');
var fs = require('fs');

console.log("server started");

http.createServer(function (request, response) {
    if (request.method == 'POST') {
        console.log("POST reached");
        var body = '';

        request.on('data', function (data) {
            body += data.toString();
        });

        request.on('end', function () {
            //var post = qs.parse(body);
            
            //body_trimmed = body.substring(3, body.length-7)
            
            //request ended -> do something with the data
            response.writeHead(200, "OK", {'Content-Type': 'text/html'});
            
            //parse the received body data
            //var decodedBody = qs.parse(body_trimmed);
            
            var parsedBody = JSON.parse(body);
            var decodedBody = parsedBody.trigger.properties.name;
            
            
            //output the decoded data to the HTTP response
            console.log(util.inspect(decodedBody));
            //console.log(util.inspect(decodedBody.trigger))
            dbref.set( { name : decodedBody } );
            response.end();
            
            //var post = qs.parse(body);
            //console.log(`post.trigger`);
            
        });
    }
    if (request.method == 'GET') {
        fs.readFile('./post.html', function (err, html) {
            if (err) {
                throw err;
            } 
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();
        console.log("GET response happened");
        });
    }
}
).listen(process.env.PORT || 3000);
