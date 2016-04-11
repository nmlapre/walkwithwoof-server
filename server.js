var http = require("http");
var util = require('util');
var Firebase = require("firebase");
var qs = require('querystring');
var dbref = new Firebase('https://walkwithwoof.firebaseio.com/');
var fs = require('fs');
var cors = require('cors');
var app = express();
app.use(cors());

console.log("server started");

http.createServer(function (request, response) {
    if (request.method == 'POST') {
        console.log("POST reached");
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            //parse the received body data
            var post = qs.parse(body);

            //request ended -> do something with the data
            response.writeHead(200, "OK", {'Content-Type': 'text/html'});
            
            //output the decoded data to the HTTP response
            console.log(post.email);
            
            dbref.push ( { email : post.email } );
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
