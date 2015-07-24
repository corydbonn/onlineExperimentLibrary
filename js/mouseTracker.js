//collection Area is the div id string; the dataCollectionObject is the javascript object containing 3 arrays for collecting data

//helper for initializing an output object for mouse tracking data
function MouseTrackData() {
	this.xCoord = [];
	this.yCoord = [];
	this.timestamp = [];
}

function mouseTrack(collectionArea,dataCollectionObject) {
    
	var domObject = document.getElementById(collectionArea); // select the DOM element indicated

	this.begin = function() {
		domObject.onmousemove = function(event) {
			dataCollectionObject.xCoord.push(event.clientX); //push data to the collection arrays
	    	dataCollectionObject.yCoord.push(event.clientY);
	    	dataCollectionObject.timestamp.push(Date.now());
		}
	}
	this.end = function() {
		domObject.onmousemove = undefined;
		domObject = undefined;
	}
}

