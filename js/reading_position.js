// Variables for the range of good position for reading
var minRange = 35;
var maxRange = 45;

var seconds = 0;

function start() {

	setInterval(function () { // Measuring the time spent on the page
  		seconds++;
		document.getElementById('seconds').innerHTML = "Seconds: " + seconds;
		if (seconds == 30) { // Alerting after a specific time spent on page
				alert('Hey, you are reading for too long! Take a break!');
				seconds = 0;
			}
	}, 1000);	

	document.getElementById('debug').innerHTML = "Debug: Waiting for gyroscope values";

	window.addEventListener("deviceorientation", function(event) { // Event listener for the gyroscope

		/*document.querySelector("#mag_alpha").innerHTML = "alpha = " + event.alpha;
		document.querySelector("#mag_beta").innerHTML = "beta = " + event.beta;
		document.querySelector("#mag_gamma").innerHTML = "gamma = " + event.gamma;*/

		var x = event.beta;  // In degree in the range [-180,180]; motion around the x axis
		var y = event.gamma;  // In degree in the range [-90,90]; motion around the y axis	 

		if (window.matchMedia("(orientation: portrait)").matches) { // Detecting portrait mode
			document.getElementById('debug').innerHTML = "Debug: beta = " + x;
   			if (x < 30 || x > 50) { // Here we handle the wrong position event
			document.getElementById('output').innerHTML  = "Output: Wrong position";
		} else {
			document.getElementById('output').innerHTML  = "Output: OK";
		}	
		}

		if (window.matchMedia("(orientation: landscape)").matches) { // Detecting landscape mode
			document.getElementById('debug').innerHTML = "Debug: gamma = " + y;
		   if (y < 30 || y > 50) { // Here we handle the wrong position event
			document.getElementById('output').innerHTML  = "Output: Wrong position";
		} else {
			document.getElementById('output').innerHTML  = "Output: OK";
		}	
		}

	});
	
	if ('ondevicelight' in window) { // API supported. How much light is there?
	   	window.addEventListener("devicelight", function(event) { // Event listener for the ambient light sensor (!!!Works only with mobile firefox version)

			var luminosity = event.value;
			document.getElementById('light').innerHTML = "Light value: " + luminosity;

			var bodyBg = document.body.style;

			if (luminosity < 100) {

				// alert('Hey, you! You are working in a dark environment');

				bodyBg.backgroundColor="lightgrey";

			} else {

				bodyBg.backgroundColor="#fff";

			}

		});

	} else { // API not supported
	  	
	}

}
