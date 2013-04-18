var useMinifiedSources = false;
var currentUnit = '';

function simpleBenchmark(parser, source, options) {
    var t0 = Date.now(), t1, lines = 0, dt;
    var runProfile = !!(parser.profile || source.profile);
    var opts = buildOptions(options);

    parser.runner(source.text, opts);
    if(runProfile) {console.profile(parser.name + ' - ' + source.name);}
    for (;;) {
        parser.runner(source.text, opts);
        lines += source.lines;
        dt = Date.now() - t0;
        if (dt > 1000) break;
    }
    if(runProfile) {console.profileEnd(parser.name + ' - ' + source.name);}
    return Math.round(lines / (dt / 1000));
}

function runSimpleTests() {
    currentUnit = 'k';
    toggleTests(false);

    var parserIndex = 0;
    var sourceIndex = 0;

    function next() {
        var data = '-';
        var parser = parsers[parserIndex];
        var source = sources[sourceIndex];
        try {
            if(parser.run === true && source.run === true) {
                data = simpleBenchmark(parser, source, parser.options || {});
            }
        } catch(e) {
            data = 'crash';
        }
        showOutput(parserIndex, sourceIndex, typeof(data)==='number'?Math.floor(data/1000):data);

        if(sourceIndex < sources.length - 1) {
            sourceIndex++;
            setTimeout(next, (parsers[parserIndex].run === true && sources[sourceIndex].run === true)?100:0);
        } else {
            sourceIndex = 0;
            if(++parserIndex < parsers.length) {
                setTimeout(next, (parsers[parserIndex].run === true && sources[sourceIndex].run === true)?100:0);
            } else {
                toggleTests(true);
            }
        }
    }
    setTimeout(next, 50);
}

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

function runBenchmarkTests() {
    currentUnit = 'ms';
    toggleTests(false);
    var resultDump = [];
    var promises = [];
    var logger = showOutput;
    parsers.forEach(function(parser, parserIndex) {
        sources.forEach(function(source, sourceIndex) {
            if(parser.run === false || source.run === false) {
                logger(parserIndex, sourceIndex, '-');
                return;
            }
            var defer = Q.defer();
            promises.push(defer.promise);

            var benchmark = new Benchmark(source.name, function() {
                try {
                    var syntax = this.options.runner(this.options.source, this.options.options);
                    if(syntax && syntax.body && syntax.body.length) {
                        this.options.resultDump.push(syntax.body.length);
                    }
                } catch(e) {
                    if(typeof(console) !== 'undefined' && typeof(console.log) !== 'undefined') {
                        console.log(e.name,e.message);
                    }
                    this.abort();
                }
            }, {
                source: source.text,
                options: buildOptions(parser.options),
                runner: parser.runner,
                resultDump: resultDump,
                async: false,
                maxTime: 1,
                onComplete: function() {
                    var mean = this.stats.mean;
                    var aborted = this.aborted;

                    requestAnimationFrame(function() {
                        logger(parserIndex, sourceIndex, aborted ? 'crash' : (mean * 1000).toFixed(1));
                        defer.resolve();
                    });
                }
            });
            setTimeout(function() {
                benchmark.run();
            }, 127);
        });
    });
    Q.all(promises).then(function() {
        toggleTests(true);
    });
}

function toggleMinifiedSources() {
    useMinifiedSources = !useMinifiedSources;
    loadSources().then(init);
}
function init() {
    drawTable();
    toggleTests(true);
}

Q.all([loadParsers(), loadSources()]).then(init);
drawOptionsTable();

