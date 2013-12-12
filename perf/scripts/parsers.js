var parsers = [{
    name:'ZeParser2',
    files: [
      'zeparser2/tok.js',
      'zeparser2/par.js',
    ],
    author: 'Peter van der Zee',
    link: 'http://github.com/qfox/zeparser2/',
    run: false,
    options: {
        locations: { fixedVal: false },
        ranges: { fixedVal: false },
        ecmaVersion: { fixedVal: 5 },
        strictSemicolons: { fixedVal: false, },
        allowTrailingCommas: { fixedVal: true, },
        forbidReserved: { fixedVal: false },
        comment: {fixedVal: false}
    },
    runner: function(source, options){
        var par = new Par(source);
        return par.run();
    }
  },{
    name:'Overture',
    files: [
      '../../overture-locations.js'
    ],
    author: 'Alistair Braidwood',
    link: 'https://github.com/abraidwood/overture/',
    run: true,
    options: {
        locations: { fixedVal: true },
        ranges: { fixedVal: false },
        ecmaVersion: { choices:[3,5],defaultVal: 5 },
        strictSemicolons: { defaultVal: false, },
        allowTrailingCommas: { defaultVal: true, },
        forbidReserved: { defaultVal: false },
        onComment: {fixedVal: false}
    },
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
    options: {
        locations: { defaultVal: true },
        ranges: { defaultVal: false },
        ecmaVersion: { choices:[3,5],defaultVal: 5 },
        strictSemicolons: { defaultVal: false, },
        allowTrailingCommas: { defaultVal: true, },
        forbidReserved: { defaultVal: false },
        onComment: {fixedVal: false}

    },
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
    options: {
        loc: { defaultVal: true },
        range: { defaultVal: false },
        ecmaVersion: { fixedVal: 5 },
        strictSemicolons: { fixedVal: false, },
        allowTrailingCommas: { fixedVal: true, },
        forbidReserved: { fixedVal: false },
        comment: {defaultVal: false}
    },
    runner: function(source, options){
      return esprima.parse(source, options);
    }
}];