//Mouse tracker by Cory Bonn, updated 2020-01-24.
//CC-BY license.

//This function sets an instance of a mouse-track object. Turning on and off requires calling the toggleOn and toggleOff methods. Use:

//var mouseTracker = new mouseTrack();
//mouseTracker.toggleOn();

//collection Area is the div id string; the dataCollectionObject is the javascript object containing 3 arrays for collecting data
//To operate, indicate which Dom element you want to track in.
function mouseTrack(collectionArea) {

	//var domObject = document.getElementById(collectionArea); // select the DOM element indicated
	var domObject = window || document.getElementById(collectionArea);
	var dataCollectionObject = [];

	this.toggleOn = function() {
		domObject.onmousemove = function(event) { //
			dataCollectionObject.push({
				xCoord: event.clientX, //push data to the collection arrays
				yCoord: event.clientY,
				timestamp: performance.now()
			});
		}
	}

	this.toggleOff = function() {
		domObject.onmousemove = undefined;
	}

	this.returnData = function() {
		return dataCollectionObject;
	}
}
