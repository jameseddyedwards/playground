
/*!
 * JAVASCRIPT
 */

var $ = require('jquery');
var swipe = {

	// Configuration options supplied by the config object sent into the app
	config : {
		username: null,
		apikey: null,
		streamhash: null,
	},
	
	// Constant parameters sent into Salesforce
	constants : {
		lead_source: 'Outbound Target',			
		url: 'https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
		oid: '00D30000000WbXp',
		retURL: 'http://datasift.com',			
		'00N30000009Slf4' : 'Research-Twitter'
	},


	/**
	 * Validates reviews request parameters
	 * Required fields are:
	 *   rid
	 *   itemId
	 * 
	 * @param object config
	 * @param array requiredParameters
	 * @return boolean
	 */
	validateParameters: function(config, requiredParameters) {
		var that = this,
			valid = true,
			fieldValue,
			required,
			i;

		// First, ensure we have access to the rating REST URL
		if (!that.constants.url || that.constants.url.length === 0) {
			console.log('A SalesForce connection URL was not found.');
			return false;
		}
		for (i = 0; i < requiredParameters.length; i++) {
			required = requiredParameters[i];
			if (config.hasOwnProperty(required)) {
				// Required param found so validate it
				fieldValue = config[required];
				if (!fieldValue || typeof fieldValue !== 'string' || fieldValue === 0) {
					console.log('Invalid field value for required field ' + required + ': value == ' + fieldValue);
					valid = false;
				}
			} else {
				// Required param was not supplied in config
				console.log('No property found for required parameter: ' + required);
				valid = false;
			}
		}
		return valid;
	},


	/**
	 * Process our object and send the POST variables off to Salesforce
	 */
	process: function(config, data) {
		//console.log(data.interaction);

		var twitter = data.twitter,
			interaction = data.interaction
		console.log(data);

		var params = {
			company : twitter.user.url,
			URL : twitter.user.url,
			country : twitter.user.location,
			description : twitter.user.description,
			'00N30000009SqFC' : twitter.text, 				// Lead Description
			'00N30000006XZ2T' : twitter.user.screen_name, 	// Twitter Username
			'00N30000003L5Rl' : interaction.tags[0]			// Lead Source Comments
		}

		params = $.extend({}, this.constants, params)
		
		console.log("process");
		console.log(params);

		// stream the hash
		$.ajax({
			type: 'POST',
			url: this.constants.url,
			data: params,
			success: function (response) {
				
				//var response = $.parseJSON(response);
				console.log("You've been Swiped!");
				//console.log(response);

			}
		});
	},


	/**
	 * Make connection to our Datasift Stream
	 */
	connect: function(config) {
		console.log("connect");
		console.log(config);
		//Include the DataSift consumer
		//var DataSift = require('/path/to/datasift.js');	//When downloading datasift.js


		/*
		var http = require('http');

		var server = http.createServer(function(request, response) {
			response.writeHead(200, {
				'Content-type' : 'text/plain'
			});
			response.end('Eddy Test');
			response.end(config);
		});
		*/
		var that = this;
		var express = require('express'),
			cons = require('consolidate'),
			swig = require('swig'),
			app = express();

		app.engine('.html', cons.swig);
		app.set('view engine', 'html');

		// NOTE: Swig requires some extra setup
		// This helps it know where to look for includes and parent templates
		swig.init({
			root: 'views/',
			allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
		});
		app.set('views', 'views/');

		app.get('/', function (req, res) {
			res.render('index.html', { foo: 'bar' });
		});
		app.listen(8000);


		
		var DataSift = require('datasift');				//When using npm installation

		//Create a new instance of the DataSift consumer
		var consumer = new DataSift(config.username, config.apikey);
		//Connect
		consumer.connect();

		//Emitted when stream is connected
		consumer.on("connect", function(){
			console.log("Connected!");
			//Subscribe to Foursquare and Gowalla checkins
			consumer.subscribe(config.streamhash); 
		});

		//Emitted when there is an error
		consumer.on("error", function(error){
			console.log("Error: " + error.message);
		});

		//Emitted when there is a warning
		consumer.on("warning", function(message){
			console.log("Warning: " + message);
		});

		//Emitted when disconnected
		consumer.on("disconnect", function(){
			console.log("Disconnected!");
		});

		//Emitted when an interaction is received
		consumer.on("interaction", function(data){
			console.log("interaction");
			that.process(config, data.data);
		});

		//Emitted when a delete message is received
		consumer.on("delete", function(data){
			console.log("Delete: " + JSON.stringify(data));
		});

	},


	/**
	 * Initialise the application - only when the correct parameters are supplied
	 */
	init: function(config) {
		var that = this;

		config = typeof config === 'object' ? $.extend({}, this.config, config) : config;

		if (that.validateParameters(config, ['username', 'apikey', 'streamhash'])) {
			that.connect(config);
		}

	 }
 }


// Kick it off!
swipe.init({
	username: 'eddyedwards',
	apikey: '43e55fdc649b51c0709d4ac7c30f548c',
	streamhash: '7a971db7b26e4c4b30709091d5b74a11'
});
