jQuery-audioicons
=================

Open licence.


This jQuery plugin is in development, but functional in it's simplicity.

Make your DOM-elements trigger sound on events!

Built with Web Audio API so requires Chrome or any other browser with support.
Accepted file formats varies across browsers, .wav is generally always ok.


Parameters so far:
=================

url: 'path/to/audiofile',
trigger: 'eventtype', //optional, default click
gain: value between 0-1 //optional, default 0.8
poly: value between 1-20 //optional, default 4

$(element).audioicon({
	key: 'value'
});

Functionality
=================

The audioContext is attached to the window, and so the same one is used for all instances.

More info -> https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
