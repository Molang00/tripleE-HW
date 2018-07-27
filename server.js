var http = require('http');
var mysql = require('mysql');
var fs = require('fs');
var url = require('url');
var delay = require('delay');

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "Kbs3247@^"
});

con.connect(function(err) {
		if(err){
		throw err;
		}
		console.log("Connected!");
		});

http.createServer(function (req, res){
		console.log("A user made a request"+req);
		fs.readFile('note.html', function(err, data) {
    		res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);

			var q = url.parse(req.url, true);
			if(q.pathname == "/sendingdata") {
				dataSend();
			}
  		});
		}).listen(8080);
console.log('Server is now running...');

function dataSend(){
	var num = Math.floor((Math.random()*100)+1);
	var sql = "INSERT INTO basicdata (energy) VALUES ("+num.toString()+")";
	con.query(mysql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  	});
	delay(1000);	
}

