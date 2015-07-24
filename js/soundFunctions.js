
//SOUND PLAY AND FILTER FUNCTIONS FROM SOUND FILES


var noiseBuffer;
			
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audio = new AudioContext();

//function loads sound for manipulation by WebAudio API
//if no filtering or adjustement is needed, simply use the following to load:
//var soundToBePlayed = new Audio('soundName');
//then to play: soundToBePlayed.play();
function loadSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	//decode asynchronously
	request.onload = function() {
		audio.decodeAudioData(request.response, function(buffer) {
			noiseBuffer = buffer;
		});
	}
	request.send();
}


//general function for filtering sound with defaults built in
//the filterProperties argument should take the form of a javascript object with the following keys 
//(replace variables with values):
// {gain: X, Q: Y, filterType: filterNode.X, freq: Z}
function playFilteredSound(buffer, filterProperties) {

	var filterParams = filterProperties;
	
	var soundSource = audio.createBufferSource();
	soundSource.buffer = buffer;
	
	var gainNode = audio.createGain();
	gainNode.gain.value = filterParams.gain || 1;
	
	var filterNode = audio.createBiquadFilter();
	filterNode.type = filterParams.filterType;
	filterNode.frequency.value = filterParams.freq || 440;
	filterNode1.Q.value = filterParams.Q || 1;	
	
	soundSource.connect(gainNode);
	gainNode.connect(filterNode);
	filterNode.connect(audio.destination);

	soundSource.start(0);
}



//----------------------------------------------------------

//SOUND SYNTHESIS FUNCTIONS


//pre-set names of global variables for access within functions;
var osc;
var attack;
var decay;
var gain;
var freq;


//MAIN FUNCTION CALL to synthesize a sinusoid
//trigger is an object: eg. {mechanism: "button", ID: "#responseButton"}
//params are also an object with the following optional settings: duration, frequency, 
//attack(ms), decay(ms), and initialDelay(ms)
/* eg. default
 {duration: 500, frequency: 440, attack: 5, decay: 5, delay: 0}

*/
function synthesizeSound(trigger, params) {
	
	var dur = params.duration || 500;
	var freq = params.frequency || 440;
	var attack = params.attack || 5;
	var decay = params.decay || 5;
	var delay = params.delay || 0;

	if (trigger.mechanism == "auto") {
		createOscillator(freq, attack, decay);
		
		setTimeout(function(){
			gain.gain.setValueAtTime(0, audio.currentTime); // start volume at 0
			gain.gain.linearRampToValueAtTime(0.20, audio.currentTime + attack / 1000); //ramp to 0.75 during attack
			osc.connect(gain); // connect oscillator to gain node
			osc.start(0,0, dur/1000);
			dataObj.soundTimeCall = Date.now();
			gain.gain.setValueAtTime(0.20,dur/1000 - decay/1000);
			gain.gain.linearRampToValueAtTime(0, dur/1000 + decay/1000);
			setTimeout(function() {
				osc.stop(0);
				osc.disconnect(gain);
				gain.disconnect(audio.destination);
				collectResponse();
			}, dur + decay + 200);
		}, delay);
	
	} else {

		clickForResponse(trigger.ID, freq, attack, decay);
	
	}
	
} 

//function to be called within the synthesizeSound function
function createOscillator(freq, attack, decay) { 
	osc = audio.createOscillator(); // create oscillator itself
 	attack = attack; //ramp up time
	decay = decay; // ramp down time
	gain = audio.createGain(); // node to control volume
	gain.connect(audio.destination); // connect the gain node to the audio context
	osc.type = "sine"; // type of oscillator
	osc.frequency.value = freq;
}	




//Synthesize auditory stimuli on the fly for responses and record timeup/timedown 
function clickForResponse(responseButton, freq, attack, decay) { 

    createOscillator(freq, attack, decay);
    function makeSound() {
        $(responseButton).on({ // set multiple responses
            "mousedown": function() { // start making sound when mouse is pressed; show dot too if in training
                gain.gain.setValueAtTime(0, audio.currentTime); // start volume at 0
                gain.gain.linearRampToValueAtTime(0.2, audio.currentTime + attack / 1000); // ramp to 0.75 during attack
                osc.connect(gain); // connect oscillator to gain node
                osc.start(0); // start sound
                dataObj.mouseDownSoundCall = Date.now();
             },
             "mouseup": function() { // stop making sound when mouse is lifted up
             	gain.gain.setValueAtTime(0.2, audio.currentTime);
                gain.gain.linearRampToValueAtTime(0,  audio.currentTime + decay / 1000); // ramp down to 0 5 ms AFTER mouse has been lifted
                setTimeout(function(){
                	osc.stop(0); //stop sound
	                osc.disconnect(gain); //disconnect oscillator
	                gain.disconnect(audio.destination); //disconnect gain node
	                dataObj.mouseUpSoundEndCall = Date.now();
	                dataObj.responseDur = dataObj.mouseUpSoundEndCall - dataObj.mouseDownSoundCall;
	                $(".responseButtons").hide().unbind();
					updateTrialInfo();
	            }, decay + 200);
             }
        });
    }
    makeSound(); // call the response function
}