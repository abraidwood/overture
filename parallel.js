
var s = 'function a() {return 0;}\n';
for(var i=0;i<2;i++) {
    s += s;
}
s = sources[3].text;//'var x=0;function a() {return 2;} var y = 2;function b(){return 3}';

var t1 = performance.now();        

var functionPositions = [];
for(var i=0,leni=s.length;i<leni;i++) {
    if(s.charCodeAt(i) === 102 && s.substr(i,8) === 'function') {
        functionPositions.push(i+8);
    }
}
var functionCount = functionPositions.length;

function onWorkerMessage(oEvent) {
    var timetaken = performance.now() - t1;
    console.log('r', oEvent.data)
    console.log(oEvent.data.workerIndex, timetaken);
}

var poolSize = 2;
var pool = [];

for(var i=0;i<poolSize;i++) {
    var worker = new Worker('/overture/overture-processed.js');
    worker.addEventListener("message", onWorkerMessage, false);
    worker._index = i;
    worker.positions = [];

    pool.push(worker);
}

var j=0;
while(j<functionCount) {
    for(i=0;i<poolSize;i++) {
        pool[i].positions.push({
            start: functionPositions[j],
            end: (functionPositions[j+1]||(s.length+8))-8
        });
        console.log(j, s.substring(functionPositions[j], (functionPositions[j+1]||(s.length+8))-8))
        j++;
    }
}

for(var i=0;i<poolSize;i++) {
    var worker = pool[i];

    worker.postMessage({
        input: s,
        _workerIndex: worker._index,
        positions: worker.positions
    });
}


