//function for creating and running event sequence objects

function Sequencer(sequenceArray, selectionMethod, parentControlFunction, counter) {
	
	//initialize values that keep track of what's been used and what's not (if important)
	this.baseContent = sequenceArray;
	this.usedContent;
	this.remainingContent;
	this.eventCounter = counter;
	
	/*further initialize based on structure of the sequence: eg. blocks and stimulus sequences will usually
	 be sequential, while trial ordering will usually be randomized
	 */
	if (selectionMethod == "randomWithoutReplacement") {
		this.usedContent = [];
		this.remainingContent = _.shuffle(sequenceArray); //initialize a random order for the particular sequence
	} else if (selectionMethod == "sequential") {
		this.usedContent = [];
		this.remainingContent = sequenceArray;
	} else {
		return "Sequencer Error"; //console error message for debugging
	}
	
	this.nextEvent = function() {
		if (this.usedContent.length == this.baseContent.length) {
			parentControlFunction.nextEvent(); //check whether current sequence is over; if so, jump to parent sequence controller

		} else {
			if (selectionMethod=="randomWithReplacement") {
				var eventSelection = _.sample(sequenceArray); // just draw a random sample;
				this.usedContent.push(eventSelection);
				this.eventCounter.request("add");
				return eventSelection; 

			} else if (selectionMethod=="randomWithoutReplacement") {
				var eventSelection = this.remainingContent[0]; // random sample without replacement
				this.usedContent.push(eventSelection);
				this.remainingContent = this.remainingContent.slice(1);
				this.eventCounter.request("add");
				return eventSelection;
			
			} else if (selectionMethod=="sequential") { //sequential even sequencer (eg. for stimulus sequences)
				var eventSelection = this.remainingContent[0];
				this.usedContent.push(eventSelection);
				this.remainingContent = this.remainingContent.slice(1);
				this.eventCounter.request("add");
				return eventSelection; 
			} else {
				var eventSelection = this.remainingContent[0]; // default is sequential execution
				this.usedContent.push(eventSelection);
				this.remainingContent = this.remainingContent.slice(1);
				this.eventCounter.request("add");
				return eventSelection; 
			}			
		}
	}
}

function StimulusEvent(stimulus, end, sequencer) {
	this.callTime;
	this.endTime;
	this.stimulus = function() {
		this.callTime = Date.now();
		stimulus.execute(); // stimulus should be a function calling for the execution of an event
	}
	setTimeout(function () {
		this.endTime = Date.now();
		sequencer.nextEvent();
	}, end); // wait until "end" in milliseconds has passed to call next event in sequence
}

function ResponseEvent(response, sequencer) {
	this.callTime;
	this.endTime;
	this.responseLatency;
	this.responseStatus = "notCollected"; // initialize to not collected status
	this.responseListen = function() {
		this.callTime = Date.now();
		response.listen(); //function calling a particular response sequence
	}
	this.responseCollected = function() {
		this.responseStatus = "collected";
		this.endTime = Date.now();
		this.responseLatency = this.endTime - this.callTime;
		sequencer.nextEvent();
	}
}
