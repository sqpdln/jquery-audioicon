jquery-audioicons
Open licence.
=================

This jQuery plugin is in development, but functional in it's simplicity.

Make your DOM-elements sound on events!

Build with Web Audio API so requires Chrome or any other browser with support.
Accepted file formats varies across browsers, .wav is generally always ok.

read more here -> https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html


Parameters so far:

url: 'path/to/audiofile',
trigger: 'eventtype',
gain: value between 0-1 //optional


$(element).audioicon({
	  key: 'value',
	  key2: 'value2'
});
