(function( $ ) {
	$.fn.audioicon = function(args) {
		var el = this,
			url = args.url,
			trigger = args.trigger,
			gain = args.gain,
			audioContext,
			props = {},
			M = Math,

			initialize = function() {
				//init web audio context
				try {
					audioContext = new webkitAudioContext();
				}
				catch(e) {
					logg( 'Web Audio API is not supported in this browser');
					return;
				}
				
				if (url		!== undefined)	{loadBuffer();}			else {return logg('No valid url provided.');}
				if (trigger	!== undefined)	{el.bind(trigger,play);}else {return logg('No valid trigger provided.');}
				if (gain	!== undefined)	{loadGain();}
			},

			//GET file and buffer it. $.ajax() would've been nice, but doesn't support arraybuffer
			loadBuffer = function(){
				xhr = new XMLHttpRequest();
				xhr.responseType = 'arraybuffer';
				xhr.open('GET', url, true);
				xhr.send();
				xhr.onload = function() {
					audioContext.decodeAudioData(xhr.response, function(buffer) {
						props.buffer = buffer;
						return;
					});
				};
			},

			loadGain = function() {
				gainNode = audioContext.createGain();
				gainNode.gain.value = (M.min(1, gain));
			},

			play = function() {
				sourceNode = audioContext.createBufferSource();
				sourceNode.buffer = props.buffer;
				var currentNode = sourceNode;
				if (gain) {
					currentNode.connect(gainNode);
					currentNode = gainNode;
				}
				currentNode.connect(audioContext.destination);
				sourceNode.start(0);
			},


			//debugging
			debug = true,
			logg = function(str){
				if (debug) {console.log(str);}
			},
			onError = function(){
				logg( 'Something went wrong.');
			};

		initialize();

		return this;

	};
})( jQuery );