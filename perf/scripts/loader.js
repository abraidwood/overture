
function load(src, callback) {
    var xhr = new XMLHttpRequest();

    try {
        xhr.timeout = 30000;
        xhr.open('GET', src);

        xhr.ontimeout = function () {
            //setText('status', 'Error: time out while loading ' + test);
            callback.apply();
        };

        xhr.onreadystatechange = function () {
            var success = false;

            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    callback.call(null, this.responseText);
                }
            }
        };

        xhr.send(null);
    } catch (e) {
        //setText('status', 'Please wait. Error loading ' + src);
        callback.apply();
    }
}

function loadParsers() {
    var defer = Q.defer();

    Q.all(parsers.map(function(parserDef) {
        var loadDefer = Q.defer();
        var loaded = 0;
        parserDef.files.forEach(function(file) {
            load('parsers/'+file, function(text) {
                if(typeof(text) === 'undefined') {
                    loadDefer.resolve();
                } else {
                    var script = document.createElement('script');
                    script.appendChild(document.createTextNode(text));
                    document.getElementsByTagName('head')[0].appendChild(script);

                    if(++loaded === parserDef.files.length) {
                        loadDefer.resolve();
                    }
                }
            });
        })
        return loadDefer.promise;
    })).then(function() {
        defer.resolve();
    });

    return defer.promise;
}

function loadSources() {
    var defer = Q.defer();

    var tests = sources.map(function(testCase) {
        var loadDefer = Q.defer();
        load('sources/' + testCase.name + (useMinifiedSources?'.min':'')+'.js', function(text) {
            if(typeof(text) === 'undefined') {
                testCase.loadError = true;
            } else {
                testCase.text = text;
                testCase.size = text.length;
                var newlines = text.match(/\r\n|[\n\r\u2028\u2029]/g);
                testCase.lines = newlines ? newlines.length : 1;
            }
            loadDefer.resolve();
        });
        return loadDefer.promise;
    });

    Q.all(tests).then(function() {
        defer.resolve();
    });

    return defer.promise;
}
