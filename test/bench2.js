function Promise() {

}
Promise.prototype.then = function() {

}
Promise.prototype.all = function() {
    return this;
}

var parsers = [{
    name:'ZeParser2',
    files: [
      'zeparser2/tok.js',
      'zeparser2/par.js',
    ],
    author: 'Peter van der Zee',
    link: 'http://github.com/qfox/zeparser2/',
    run: true,
    runner: function(source, options){
        var par = new Par(source);
        return par.run();
    }
  },{
    name:'Overture',
    files: [
      '../../overture.js'
    ],
    author: 'Alistair Braidwood',
    link: 'https://github.com/abraidwood/overture/',
    run: true,
    runner: function(source, options){
      return overture.parse(source, options);
    }
  },{
    name:'Acorn',
    files: [
      'acorn/acorn.js'
    ],
    author: 'Marijn Haverbeke',
    link: 'https://github.com/marijnh/acorn/',
    run: true,
    runner: function(source, options){
      return acorn.parse(source, options);
    }
  },{
    name:'Esprima',
    files: [
      'esprima/esprima.js'
    ],
    author: 'Ariya Hidayat',
    link: 'http://esprima.org/',
    run: true,
    runner: function(source, options){
      return esprima.parse(source, options);
    }
}];

function Source(name, run) {
    this.name = name;
    this.run = run || false;
    this.text = '';
    this.size = 0;
    this.lines = 0;
    this.loadError = false;
}

var sources = [
    new Source('underscore-1.4.4',true),
    new Source('q',true),
    new Source('backbone-1.0.0',true),
    new Source('codemirror-3.11',true),
    new Source('jquery-1.9.1',true),
    new Source('angular-1.0.6',true),
    new Source('three-r57',true)//,

    // new Source('q.min',false),
    // new Source('underscore-1.4.4-min',false),
    // new Source('backbone-1.0.0-min',false),
    // new Source('angular-1.0.6.min',false),
    // new Source('jquery-1.9.1.min',false),
    // new Source('three-r57.min',false)
];

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
        var promise = Q.defer();
        var loaded = 0;
        parserDef.files.forEach(function(file) {
            load('parsers/'+file, function(text) {
                if(typeof(text) === 'undefined') {
                    promise.resolve();
                } else {
                    var script = document.createElement('script');
                    script.appendChild(document.createTextNode(text));
                    document.getElementsByTagName('head')[0].appendChild(script);

                    if(++loaded === parserDef.files.length) {
                        promise.resolve();
                    }
                }
            });
        })
        return promise;
    })).then(function() {
        defer.resolve();
    });

    return defer;
}

function loadSources() {
    var defer = Q.defer();

    Q.all(sources.map(function(testCase) {
        var promise = Q.defer();
        load('sources/' + testCase.name + '.js', function(text) {
            if(typeof(text) === 'undefined') {
                testCase.loadError = true;
            } else {
                testCase.text = text;
                testCase.size = text.length;
                var newlines = text.match(/\r\n|[\n\r\u2028\u2029]/g);
                testCase.lines = newlines ? newlines.length : 1;
            }
            promise.resolve();
        });
        return promise;
    })).then(function() {
        defer.resolve();
    });

    return defer;
}

function simpleBenchmark(parser, source, options) {
    var t0 = Date.now(), t1, lines = 0, dt;
    var runProfile = !!(parser.prof || source.prof);

    parser.runner(source.text, options);
    if(runProfile) {console.profile(parser.name + ' - ' + source.name);}
    for (;;) {
        parser.runner(source.text, options);
        lines += source.lines;
        dt = Date.now() - t0;
        if (dt > 1000) break;
    }
    if(runProfile) {console.profileEnd(parser.name + ' - ' + source.name);}
    return Math.round(lines / (dt / 1000));
}

function showOutput(parserIndex, sourceIndex, data) {
    var el = document.getElementById('cell_'+parserIndex+'_'+sourceIndex);
    if (typeof el.innerText === 'string') {
        el.innerText = data;
    } else {
        el.textContent = data;
    }
}

function runSimpleTests() {
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
        showOutput(parserIndex, sourceIndex, typeof(data)==='number'?Math.floor(data/1000)+'k':data);

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

function runBenchmarkTests() {
    toggleTests(false);
    var resultDump = [];
    var logger = showOutput;
    parsers.forEach(function(parser, parserIndex) {
        sources.forEach(function(source, sourceIndex) {
            if(parser.run === false || source.run === false) {
                logger(parserIndex, sourceIndex, '-');
                return;
            }
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
                runner: parser.runner,
                resultDump: resultDump,
                async: false,
                maxTime: 1,
                onComplete: function() {
                    var mean = this.stats.mean;
                    logger(parserIndex, sourceIndex, this.aborted ? 'crash' : (mean * 1000).toFixed(1));
                }
            });
            setTimeout(function() {
                benchmark.run();
            }, 127);
        });
    });
    toggleTests(true);
}

var testsEnabled = false;
function toggleTests(on) {
    testsEnabled = on;

    Array.prototype.forEach.call(
        document.getElementsByTagName('button'),
        function(btn) {
            btn.disabled = !on;
        }
    );
}

function toggler(e) {
    var target = e.target;
    var slider = e.target;

    while(!/slide-check (checked)?$/.test(slider.className) && slider.parentNode) {slider = slider.parentNode;}
    while(target.tagName !== 'TH' && target.parentNode) {target = target.parentNode;}

    if(target.tagName !== 'TH' || slider.tagName !== 'DIV') {return;}

    var type = target.getAttribute('data-type') === 'parser' ? parsers : sources;
    var index = target.getAttribute('data-index');
    var attr = slider.getAttribute('data-type').toLowerCase();

    if(typeof(index) === 'undefined' || typeof(attr) === 'undefined') {return;}

    type[index][attr] = !type[index][attr];
    slider.className = 'slide-check '+(type[index][attr]?'checked':'');
}

function generateSlideCheck(text, on) {
    return '<div class="slide-check '+(on?'checked':'')+'" data-type="'+text+'"><div class="slide-check slider">'+text+'</div><div class="label">'+text+'</div></div>';
}
function drawTable() {
    var html = '<table><tbody><tr><th>';
    parsers.forEach(function(parser, parserIndex) {
        html += '<th class="parser-header" data-type="parser" data-index="'+parserIndex+'"><span>'+parser.name+'</span>'+generateSlideCheck('Run', parser.run)+generateSlideCheck('Prof');
    })
    sources.forEach(function(source, sourceIndex) {
        html+='<tr><th class="source-header" data-type="source" data-index="'+sourceIndex+'"><span>'+source.name+'</span><div>'+generateSlideCheck('Run', source.run)+generateSlideCheck('Prof')+'</div>';
        parsers.forEach(function(parser, parserIndex) {
            html += '<td id="cell_'+parserIndex+'_'+sourceIndex+'">';
        });
    });
    html += '</tbody></table>';

    var container = document.getElementById('resultsContainer');
    container.onclick = toggler;
    container.innerHTML = html;
}

new Q.all(loadParsers(), loadSources()).then(function() {
    drawTable();
    toggleTests(true);
});


