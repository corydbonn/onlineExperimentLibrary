//Creates counter object that is manipulable after definition only via calling the "request" function

function Counter(startValue) {

	this.currentValue = startValue; //initializes counter with starting value

	this.request = function(action) {

		if (action=="reset") { //reset counter to zero--for example, to reset trial counters at beginning of blocks
			return this.currentValue = 0;

		} else if (action=="currentValue") { //simply request current value
			return this.currentValue;

		} else if (action=="add") {  //add to the counter
			return this.currentValue+=1;

		} else {
			return "counter error"; // returns error to console
		}
	}
}

/*

example usage: 

var trial = new Counter(0);

trial.request("reset");

trial.request("currentValue");

trial.request("add");
*/
