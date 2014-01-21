
var s,
staffApp = {

	settings: {
		tableTemplate: 		$("#template-table"),
		tablePlaceholder: 	$("#table"),
		localStorageId: 	"oc-staff",
		bingApiKey: 		"ArKnKU8tKQ2p7dLLYtZgNZKEXQH3h8OCVX9r9DXfDvDy7_Q5yZTAAl4S0thiVqUC",
		bingDefaultX: 		41.8756,
		bingDefaultY: 		-87.9956,
		bingZoom: 			7,
		staffList: 			undefined,
		map: 				undefined
	},

	renderTable: function() {
		s.tableTemplate.Chevron("render", s.staffList, function(result){
			// do something with 'result'
		    // 'result' will contain the result of rendering the template
		    console.log(result);
		    s.tablePlaceholder.html(result);
		    $('table', '#table').dataTable();
		});
	    staffApp.plotMap();
	},

	plotMap: function() {

		if (s.staffList !== undefined) {

	        $.each(s.staffList.staff, function (index, member) {

	        	var x = member.address.coords.x,
	        		y = member.address.coords.y,
	        		pinLocation = new Microsoft.Maps.Location(x, y),
	            	newPin = new Microsoft.Maps.Pushpin(pinLocation, {
		            	text: member.title + " " + member.forename + " " + member.surname
		            });

	            s.map.entities.push(newPin);
	            
	        });
		
		} else {
			console.log("Staff data cannot be loaded");
		}
	},

	renderMap: function() {

		// Initialize the map
		s.map = new Microsoft.Maps.Map(document.getElementById("map"), {
	        credentials: s.bingApiKey,
	        center: new Microsoft.Maps.Location(s.bingDefaultX, s.bingDefaultY),
	        mapTypeId: Microsoft.Maps.MapTypeId.road,
	        zoom: s.bingZoom
	    });
	},

	init: function () {
		s = this.settings;

		if (localStorage.getItem(s.localStorageId) !== null) {

			// Get table data from local storage if available (temporary storage option)
			s.staffList = $.parseJSON(localStorage.getItem(s.localStorageId));
			staffApp.renderTable();

		} else {

			// Get table from json file
			$.getJSON("./js/conf/staff.json").done(function( json ) {
				s.staffList = json;
				staffApp.renderTable();
			}).fail(function( jqxhr, textStatus, error ) {
				console.log( "Request Failed: " + textStatus + ", " + error );
			});

		}
	}
};

// Kick off the app
(function() {
	"use strict";
	
	staffApp.init();
	staffApp.renderMap();

})();