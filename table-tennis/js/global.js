
var s,
LadderWidget = {

	settings: {
		placeHolder: $("#ladders"),
		mustacheTemplate: $("#ladders-json"),
		localStorageNameSpace: 'ds-ladders',
		laddersObj: undefined
	},

	saveStandings: function() {
		localStorage.setItem(s.localStorageNameSpace, JSON.stringify(s.laddersObj));
	},

	updateStandings: function(ladderId) {

		var ladders = s.laddersObj.ladders,
			standings;

		for (var i=0; i < ladders.length; i++) {

			// Pick out current ladder
			if (ladders[i].id == ladderId) {

				// Save old standings in a variable
				oldStandings = ladders[i].standings;

				// Reset standings to an empty array
				ladders[i].standings = [];

				$('li', '[data-ladder-id=' + ladderId + ']').each(function(index, value) {
					var standing = {
							name: 			$(this).data('player-name'),
							position: 		index + 1
						};

					// Push updated player info into standings
					ladders[i].standings.push(standing);

					// Update standing numbers
					$(this).find("em").html(index + 1);
				});

			}
		}

		LadderWidget.saveStandings();

	},

	render: function(json) {
		s.mustacheTemplate.Chevron("render", json, function(result){

			// Render the result into the placeholder using a mustache template
			s.placeHolder.html(result);
			
			// Make each ladder sortable
			$(".ladder").sortable({
				stop: function(event, ui) {
					LadderWidget.updateStandings($(this).data("ladder-id"));
				}
			});
		});
	},

	resetData: function() {
		localStorage.removeItem(s.localStorageNameSpace);
		location.reload();
	},

	getData: function() {

		if (localStorage.getItem(s.localStorageNameSpace) !== null) {
			/* Use Local Storage Object */

			//localStorage.removeItem(s.localStorageNameSpace);

			// Get ladders from local storage
			var json = $.parseJSON(localStorage.getItem(s.localStorageNameSpace));

			// Save json obj into settings
			s.laddersObj = json;

			// Render the result
			LadderWidget.render(json);

		} else {
			/* Use Default Config Object */

			// Get default ladder from ladders json file
			$.getJSON("./js/conf/ladders.json").done(function( json ) {

				// Save json obj into settings
				s.laddersObj = json;

				// Render the info
				LadderWidget.render(json);

			}).fail(function( jqxhr, textStatus, error ) {
				console.log( "Request Failed: " + textStatus + ", " + error );
				console.warn("Original JSON file cannot be found.")
			});
		}

	},

	init: function() {

		s = this.settings;

		LadderWidget.getData();

		$("#reset").on("click", function() {
			LadderWidget.resetData();
		});
	}

};

LadderWidget.init();