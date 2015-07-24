//collection Area is the div id string; the dataCollectionObject is the javascript object containing 3 arrays for collecting data

function mouseTrack(collectionArea) {
    
	//var domObject = document.getElementById(collectionArea); // select the DOM element indicated
	var domObject = document.getElementById(collectionArea);
	var dataCollectionObject = [];

	this.begin = function() {
		domObject.onmousemove = function(event) {
			dataCollectionObject.push({
				xCoord: event.clientX, //push data to the collection arrays
				yCoord: event.clientY,
				timestamp: Date.now()
			});
		}
	}
	this.end = function() {
		domObject.onmousemove = undefined;
		domObject = undefined;
	}
	this.returnData = function() {
		return dataCollectionObject;
	}
}

