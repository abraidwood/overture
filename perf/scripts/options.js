
var options = [{
        label: 'Locations',
        keys: ['locations','loc']
    }, {
        label: 'Ranges',
        keys: ['range', 'ranges']
    }, {
        label: 'ECMA verions',
        keys: ['ecmaVersion']
    }, {
        label: 'Allow trailing commas',
        keys: ['allowTrailingCommas']
    }, {
        label: 'Forbid reserved words',
        keys: ['forbidReserved']
    }, {
        label: 'Strict semicolons',
        keys: ['strictSemicolons']
    }, {
        label: 'Track comments',
        keys: ['onComment', 'comment']
    }, {
        label: 'Program',
        keys: ['program']
    }, {
        label: 'Source File',
        keys: ['sourceFile']
    }, {
        label: 'Tolerant',
        keys: ['tolerant']
    }
];

function buildOptions(options) {
    var ret = {};
    Object.getOwnPropertyNames(options).forEach(function(name) {
        if(typeof(options[name].value) !== 'undefined') {
            ret[name] = options[name].value;
        } else if(typeof(options[name].defaultVal) !== 'undefined') {
            ret[name] = options[name].defaultVal;
        } else if(typeof(options[name].fixedVal) !== 'undefined') {
            ret[name] = options[name].fixedVal;
        }
    });
    return ret;
}

var groupId = 0;
function getOptionInput(desc, val, disabled, def) {
    switch(typeof(val)) {
        case 'number':
        case 'string':
            return val;
            break;
        case 'boolean':
            return '<input type="checkbox" '+(val?'checked ':'')+(disabled?'disabled ':'')+'/>';
        case 'object':
            var html = '';
            var name = 'group_'+groupId++;
            val.forEach(function(choice) {
                html+='<label>'+choice+'</label><input name="'+name+'" type="radio" value="'+choice+'" '+(def===choice?'checked ':'')+'/>';
            })
            return html;
    }
}

function onOptionClick(e) {
    var target = e.target;
    if(target.tagName !== 'INPUT') {return;}
    var cell = target.parentNode;
    var parserIndex = cell.getAttribute('data-index');
    var option = cell.getAttribute('data-option');
    switch(target.type) {
        case 'radio':
            parsers[parserIndex].options[option].value = parseInt(target.value,10);
            break;
        case 'checkbox':
            parsers[parserIndex].options[option].value = target.checked;
            break;
    }
}

function buildOptionsTable() {
    var html = '<br /><table><tr><th>';
    parsers.forEach(function(parser) {
        html += '<th>'+parser.name;
    });
    options.forEach(function(option) {
        html += '<tr><th>'+option.label;
        parsers.forEach(function(parser, parserIndex) {
            Object.getOwnPropertyNames(parser.options).some(function(parserOption) {
                if(option.keys.indexOf(parserOption) !== -1) {
                    html += '<td data-index="'+parserIndex+'" data-option="'+parserOption+'">'
                    var desc = parser.options[parserOption];
                    if(typeof(desc.fixedVal) !== 'undefined') {
                        html+=getOptionInput(desc, desc.fixedVal, true);
                    } else if(typeof(desc.choices) !== 'undefined') {
                        html+=getOptionInput(desc, desc.choices, false, desc.defaultVal);
                    } else if(typeof(desc.defaultVal) !== 'undefined') {
                        html+=getOptionInput(desc, desc.defaultVal, false);
                    } else {
                    }
                    return true;
                } else {
                    return false;
                }
            })
        });
    });
    html += '</table>';
    return html;
}
function drawOptionsTable() {
    var container = document.getElementById('options-box');
    container.innerHTML = buildOptionsTable();
    container.onclick = onOptionClick;
}
