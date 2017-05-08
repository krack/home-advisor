var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require('http');
var request = require('request');



var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var pkgcloud = require('pkgcloud');

var configureAPI = require('angularjs-nodejs-framework').configureAPI;
var auth = require('angularjs-nodejs-framework').auth;






/*************/
//config
//this serveur internet hostname
var serverHost = process.env.SERVER_HOST || "http://localhost";
//url to allow image + javascript (ihm) (TODO : autorize all url)
var allowUrl = process.env.ALLOW_URL || 'http://localhost:4200';
//serveur open port
var port = process.env.SERVER_PORT || 8080;
var portPublic = process.env.SERVER_PUBLIC_PORT || 8080;


var facebook_api_key= process.env.FACEBOOK_API_KEY;
var facebook_api_secret= process.env.FACEBOOK_API_SECRET;
var callback_url= serverHost+":"+portPublic+"/auth/facebook/callback";
//end config
/***********/


var database = {
	url : 'mongodb://mongo:27017'
}
// To be redesigned with a loop and a break on total timeout or number of tries
mongoose.connect(database.url, function(err) {
	if(err) {
		console.log('connection error (first try)', err);
		setTimeout(function() {
			mongoose.connect(database.url, function(err) {
				if(err) {
					console.log('connection error (second try)', err);
					setTimeout(function() {
						mongoose.connect(database.url, function(err) {
							if(err) {
								console.log('connection error (three strikes... you are out)', err);
							} else {
								console.log('successful connection (third try... almost out)');
							}
						});
					},5000);
				} else {
					console.log('successful connection (second try)');
				}
			});
		},1000);
	} else {
		console.log('successful connection (first try)');
	}
});

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('X-HTTP-Method-Override'));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', allowUrl);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var authentificationConfiguration ={
	"redirectUrl": allowUrl,
	"facebook":{
		"api_key" :facebook_api_key,
		"api_secret": facebook_api_secret,
		"callback_url":callback_url
	}
}

var authentification = auth(authentificationConfiguration, app); 


var serviceScore = null;
{//config bets
	var config = {
		"baseApi" : "/api/scores/",
		"serverHost": serverHost,
		"port": portPublic,
		"shema": 'scores'

	}
	var model = [
		{
			"name": "address",
			"type": "Object",
			"shema": [
				{
					"name": "country",
					"type": "String"
				},
				{
					"name": "street_number",
					"type": "String"
				},
				{
					"name": "route",
					"type": "String"
				},
				{
					"name": "streetComplement",
					"type": "String"
				},
				{
					"name": "locality",
					"type": "String"
				},
				{
					"name": "postal_code",
					"type": "String"
				}
			]
		},
		{

			"name": "rate",
			"type": "Number"
		},
		{
			"name": "rater",
			"type": "String"
		}
	]

	serviceScore = configureAPI(config, model, app, null, authentification.securityFunction);
}



//POST /:id/name/
app.post('/api/search/', function(req, res) {
	console.log('POST /api/search/');
	
	var criteriaAddress ={
		"address.street_number" : req.body.street_number,
		"address.route" : req.body.route,
		"address.locality" : req.body.locality,
		"address.country" : req.body.country,
		"address.postal_code" : req.body.postal_code
	};

	var criteriaRoute ={
		"address.street_number" : { $ne: req.body.street_number},
		"address.route" : req.body.route,
		"address.locality" : req.body.locality,
		"address.country" : req.body.country,
		"address.postal_code" : req.body.postal_code
	};

	var result = {
		"match": [],
		"route": []
	};
	function addElements(table, list){
		for(var i = 0; i < list.length; i++){
			var element = list[i];
			table.push({
				"address": list[i].address,
				"scoreId": list[i]._id
			}); 
		}
	}

	serviceScore.find(criteriaAddress).then(function(list){
			addElements(result.match, list);
			serviceScore.find(criteriaRoute).then(function(list){
					addElements(result.route, list);
					
					res.json(result);
				}, 
				function(error){
					res.sendStatus(error);
				}
			);
		}, 
		function(error){
			res.sendStatus(error);
		}
	);
});

app.listen(port);
console.log("App listening on port " + port);
