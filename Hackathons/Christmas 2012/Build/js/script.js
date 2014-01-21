var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = 800;
var container;
var particle;
var camera;
var scene;
var renderer;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var particles = []; 
var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
particleImage.src = 'img/particle-smoke.png'; 

function initSnow() {

	container = $('#snowflakes');

	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.add(camera);

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );

	for (var i = 0; i < 500; i++) {

		particle = new Particle3D( material);
		particle.position.x = Math.random() * 2000 - 1000;
		particle.position.y = Math.random() * 2000 - 1000;
		particle.position.z = Math.random() * 2000 - 1000;
		particle.scale.x = particle.scale.y =  1;
		scene.add( particle );

		particles.push(particle); 
	}

	container.append(renderer.domElement);


	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	setInterval( loop, 1000 / 60 );

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

//

function loop() {

	for (var i = 0; i<particles.length; i++) {

		var particle = particles[i]; 
		particle.updatePhysics(); 

		with(particle.position)
		{
			if(y<-1000) y+=2000; 
			if(x>1000) x-=2000; 
			else if(x<-1000) x+=2000; 
			if(z>1000) z-=2000; 
			else if(z<-1000) z+=2000; 
		}				
	}

	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt(scene.position); 

	renderer.render( scene, camera );

}


function initCarousel() {

	var $c = $('#carousel'),
		$w = $(window);

	$c.carouFredSel({
		align: false,
		items: {
			width : 394
		},
		scroll: {
			items: 1,
			duration: 2000,
			timeoutDuration: 0,
			easing: 'linear',
			pauseOnHover: 'immediate'
		}
	});

	$w.bind('resize.example', function() {
		var nw = $w.width();
		if (nw < 990) {
			nw = 990;
		}

		$c.width(nw * 3);
		$c.parent().width(nw);

	}).trigger('resize.example');

}

function denzelToggle() {
	$("#snowflakes").click(function() {
		$("#snowflakes").fadeToggle();
	});
}

function snowFlakesToggle() {
	$('header').bind('inview', function (event, visible) {
	  if (visible == true) {
	    $("#snowflakes").fadeIn();
	  } else {
	    $("#snowflakes").fadeOut();
	  }
	});
}


$(document).ready(function(){
	initSnow();
	initCarousel();
	//denzelToggle();
	snowFlakesToggle();
});

