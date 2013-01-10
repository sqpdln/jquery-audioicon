(function( $ ) {
	$.fn.audioicon = function(args) {
				
		var el = this,					//jquery object

			//input arguments
			trigger = args.trigger,		//event type
			url = args.url,				//url
			gain = args.gain,			//int 0-1
			poly = args.poly,			//int 1-20, defaults to 4

			//global vars
			voices = [];				//the array to store source nodes
			round = 0,					//count times played
			el.buffer = null,				//properties
			M = Math,

			chainGain = function(node) {
					node.connect(gainNode);
					currentNode = gainNode;
					return currentNode;
			},

			initialize = function() {
				//init web audio context
				if(window.audioContext){
					audioContext = window.audioContext;
				}
				else{
					try {
						var audioContext = window.audioContext = new webkitAudioContext();
					}
					catch(e) {
						alert( 'Web Audio API is not supported in this browser');
						return;
					}
				}


				if (url		!== undefined)	{loadBuffer();}			else {return logg('No valid url provided.');}
				if (trigger	!== undefined)	{el.bind(trigger,play);}else {el.bind('click',play);}
				if (!isANumber(gain) || !(gain >= 0 && gain <= 1))	{gain = 0.8;}	loadGain();
				if (!isANumber(poly) || !(poly > 0 && poly < 21))	{poly = 4;}		loadPoly(poly);

			},

			isANumber = function(nbr){
				return typeof nbr == 'number' ? true : false;
			},

			//GET file and buffer it. $.ajax() would've been nice, but doesn't support arraybuffer
			loadBuffer = function(){
				xhr = new XMLHttpRequest();
				xhr.responseType = 'arraybuffer';
				xhr.open('GET', url, true);
				xhr.send();
				xhr.onload = function() {
					audioContext.decodeAudioData(xhr.response, function(b) {
						el.buffer = b;
						return;
					});
				};
			},

			loadGain = function() {
				gainNode = audioContext.createGain();
				gainNode.gain.value = (M.min(1, gain));
			},

			loadPoly = function(nbrOfVoices) {
				for (var i = 0; i < nbrOfVoices; i++) {
					voices.push({node: undefined});//false means voice is not playing

				}
			},

			play = function() {
				var i = round++ % voices.length;
				if (voices[i].node === undefined) {voices[i].gotNode = true;}
				//polyphony limit reached, stop any eventual stream at node
				else {sourceNode.stop(0);}

				sourceNode = voices[i].node = audioContext.createBufferSource();
				sourceNode.buffer = el.buffer;

				//chaining
				var currentNode = sourceNode;
				if (gain) {currentNode = chainGain(currentNode);}

				currentNode.connect(audioContext.destination);
				sourceNode.start(0);
			},


			//debugging
			debug = true,
			logg = function(str){
				if (debug) {console.log(str);}
			};

		initialize();

		return this;
	};
})( jQuery );