
function setRunningClass(cells) {
    cells.forEach(function(cell) {
        document.getElementById('cell_'+cell.parserIndex+'_'+cell.sourceIndex).className = 'running';
    });
}

function showOutput(parserIndex, sourceIndex, data) {
    var el = document.getElementById('cell_'+parserIndex+'_'+sourceIndex);
    el.className = el.className.replace('running','');
    el = el.firstChild;
    var unitEl = el.nextSibling;

    if (typeof el.innerText === 'string') {
        el.innerText = data;
        if(unitEl._unit !== currentUnit) {
            unitEl.className = (currentUnit === 'ms') ? 'smaller2' : 'smaller';
            unitEl.innerText = (data === '-' || data === 'crash') ? '':currentUnit;
        }
    } else {
        el.textContent = data;
        if(unitEl._unit !== currentUnit) {
            unitEl.className = (currentUnit === 'ms') ? 'smaller2' : 'smaller';
            unitEl.textContent = (data === '-' || data === 'crash') ? '':currentUnit;
        }
    }
}

var testsEnabled = false;
function toggleTests(on) {
    testsEnabled = on;

    Array.prototype.forEach.call(
        document.querySelectorAll('.runner-box button, .runner-box input'),
        function(btn) {
            btn.disabled = !on;
        }
    );
}

function toggler(e) {
    var target = e.target;
    var slider = e.target;

    while(slider.className !== 'run-check' && slider.parentNode) {slider = slider.parentNode;}
    while(target.tagName !== 'TH' && target.parentNode) {target = target.parentNode;}

    if(target.tagName !== 'TH' || slider.tagName !== 'DIV') {return;}

    var type = target.getAttribute('data-type');
    var list = type === 'parser' ? parsers : sources;
    var index = target.getAttribute('data-index');
    var attr = slider.getAttribute('data-type');

    if(typeof(index) === 'undefined' || typeof(attr) === 'undefined') {return;}

    list[index][attr] = !list[index][attr];

    target.querySelector('input[data-type="'+attr+'"]').checked = list[index][attr];
}

var checkCount = 0;
function generateSlideCheck(text, on) {
    var textLC = text.toLowerCase();
    var id = 'node_'+checkCount++;
    return '<div class="run-check" data-type="'+textLC+'"><label for="'+id+'">'+text+'</label><input data-type="'+textLC+'" id="'+id+'" '+(on?'checked ':'')+'type="checkbox"/></div>';
}
function drawTable() {
    var html = '<table><tbody><tr><th>';
    parsers.forEach(function(parser, parserIndex) {
        html += '<th class="parser-header" data-type="parser" data-index="'+parserIndex+'"><span>'+parser.name+'</span>'+generateSlideCheck('Run', parser.run)+generateSlideCheck('Profile');
    })
    sources.forEach(function(source, sourceIndex) {
        html+='<tr><th class="source-header" data-type="source" data-index="'+sourceIndex+'"><span>'+source.name+'</span><span class="filesize">('+Math.round(source.size/1024)+'kb)</span><div>'+generateSlideCheck('Run', source.run)+generateSlideCheck('Profile')+'</div>';
        parsers.forEach(function(parser, parserIndex) {
            html += '<td id="cell_'+parserIndex+'_'+sourceIndex+'"><span></span><span class="smaller"></span>';
        });
    });
    html += '</tbody></table>';

    var container = document.getElementById('resultsContainer');
    container.onclick = toggler;
    container.innerHTML = html;
}
