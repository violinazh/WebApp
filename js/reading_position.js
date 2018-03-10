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

	window.addEventListener("deviceorientation", function(event) { // Event listener for the gyroscope

		/*document.querySelector("#mag_alpha").innerHTML = "alpha = " + event.alpha;
		document.querySelector("#mag_beta").innerHTML = "beta = " + event.beta;
		document.querySelector("#mag_gamma").innerHTML = "gamma = " + event.gamma;*/

		var x = event.beta;  // In degree in the range [-180,180]; motion around the x axis
		var y = event.gamma;  // In degree in the range [-90,90]; motion around the y axis	 

		if (x == null && y == null) { // Checking if there is a gyroscope on the device
			document.getElementById('debug').innerHTML = "No gyroscope present.";
			
		} else {

			if (window.matchMedia("(orientation: portrait)").matches) { // Detecting portrait mode
				document.getElementById('debug').innerHTML = "Debug: beta = " + x;
   				if (x < 30 || x > 50) { // Here we handle the wrong position event
					document.getElementById('output').innerHTML  = "Output: Wrong position";
					document.getElementById('output').style.color = "red";
				} else {
					document.getElementById('output').innerHTML  = "Output: OK";
					document.getElementById('output').style.color = "green";
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

// Loads text for reading
function file() {
	document.getElementById('text').innerHTML = 
"<b>Excerpt from The Wild Cat by Edgar Allan Poe</b> <br><br> For the most wild, yet most homely narrative which I am about to pen, I neither expect nor solicit belief. Mad indeed would I be to expect it, in a case where my very senses reject their own evidence. Yet, mad am I not - and very surely do I not dream. But to-morrow I die, and to-day I would unburthen my soul. My immediate purpose is to place before the world, plainly, succinctly, and without comment, a series of mere household events. In their consequences, these events have terrified - have tortured - have destroyed me. Yet I will not attempt to expound them. To me, they have presented little but Horror - to many they will seem less terrible than barroques. Hereafter, perhaps, some intellect may be found which will reduce my phantasm to the common-place - some intellect more calm, more logical, and far less excitable than my own, which will perceive, in the circumstances I detail with awe, nothing more than an ordinary succession of very natural causes and effects. <br><br> From my infancy I was noted for the docility and humanity of my disposition. My tenderness of heart was even so conspicuous as to make me the jest of my companions. I was especially fond of animals, and was indulged by my parents with a great variety of pets. With these I spent most of my time, and never was so happy as when feeding and caressing them. This peculiarity of character grew with my growth, and in my manhood, I derived from it one of my principal sources of pleasure. To those who have cherished an affection for a faithful and sagacious dog, I need hardly be at the trouble of explaining the nature or the intensity of the gratification thus derivable. There is something in the unselfish and self-sacrificing love of a brute, which goes directly to the heart of him who has had frequent occasion to test the paltry friendship and gossamer fidelity of mere Man. <br><br> I married early, and was happy to find in my wife a disposition not uncongenial with my own. Observing my partiality for domestic pets, she lost no opportunity of procuring those of the most agreeable kind. We had birds, gold-fish, a fine dog, rabbits, a small monkey, and a cat.";

}

