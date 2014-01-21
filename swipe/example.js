//Include the DataSift consumer
//var DataSift = require('/path/to/datasift.js');	//When downloading datasift.js
var DataSift = require('datasift');					//When using npm installation

//Create a new instance of the DataSift consumer
var consumer = new DataSift('eddyedwards', '43e55fdc649b51c0709d4ac7c30f548c');

//Connect
consumer.connect();

//Emitted when stream is connected
consumer.on("connect", function(){
	console.log("Connected!");
	//Subscribe to Foursquare and Gowalla checkins
	consumer.subscribe('7a971db7b26e4c4b30709091d5b74a11'); 
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
	console.log("Received data: " + JSON.stringify(data));
});

//Emitted when a delete message is received
consumer.on("delete", function(data){
	console.log("Delete: " + JSON.stringify(data));
});
