
function TimeMsg() {
	this.tThen = performance.now();
}

onmessage = function(oEvent) {
	var tNow = performance.now();
	var delta = tNow - oEvent.data.tThen;
	console.log(delta);
	postMessage(new TimeMsg);
}
/*

var i =0 ;
function TimeMsg() {
	this.tThen = performance.now();
}

var worker = new Worker('/overture/time-worker.js');

worker.onmessage = function(oEvent) {
	var tNow = performance.now();
	var delta = tNow - oEvent.data.tThen;
	console.log(delta);
	if(i++<10) {
		this.postMessage(new TimeMsg);
	}
}
var s = new TimeMsg;
s.text = sources[3].text
worker.postMessage(s);

*/