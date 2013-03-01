function makeCarlTalk() {
	var insults = ["",
	"If you are ever in the Picadilly Circus area, I never turn down a free drink, especially if you are accompanied by attractive women!!",
	"Look after yourselves and I'm sure some of our paths will cross in the future, hopefully it won't be with you stalking the street walkers on Oxford Road as this could potentially be very embarrassing for you!!"
	];

	Math.floor((Math.random()*insults.length)+1);

	function speak() {
		$("#mouth").toggleClass("open");
	}

	$("blockquote").html(insults[Math.floor((Math.random()*insults.length)+1)]).typewriter();

	$(".star").click(function() {

	});

   	setInterval(speak, 300);

}

$(document).ready(function(){
	makeCarlTalk();
});