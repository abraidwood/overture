# Overture

A fast JavaScript parser in JavaScript.  Based on acorn [http://marijnhaverbeke.nl/acorn/](http://marijnhaverbeke.nl/acorn/)

# Usage
<code>overture.parse(inputString[, options]);</code>

#### Options
Here are the options and comments from inside the parser.

Items marked 'X' are not currently implemented.

    var defaultOptions =  
        // `ecmaVersion` indicates the ECMAScript version to parse. Must  
        // be either 3 or 5. This  
        // influences support for strict mode, the set of reserved words, and  
        // support for getters and setter.  
        ecmaVersion: 5,  

        // Turn on `strictSemicolons` to prevent the parser from doing  
        // automatic semicolon insertion.  
        strictSemicolons: false,  

        // When `allowTrailingCommas` is false, the parser will not allow  
        // trailing commas in array and object literals.  
        allowTrailingCommas: true,  

        // By default, reserved words are not enforced. Enable  
        // `forbidReserved` to enforce them.  
        forbidReserved: false,  

        // When `locations` is on, `loc` properties holding objects with  
        // `start` and `end` properties in `{line, column}` form (with  
        // line being 1-based and column 0-based) will be attached to the  
        // nodes.  
        locations: false,  

        // A function can be passed as `onComment` option, which will  
        // cause Overture to call that function with `(block, text, start,  
        // end)` parameters whenever a comment is skipped. `block` is a  
        // boolean indicating whether this is a block (`/* */`) comment,  
        // `text` is the content of the comment, and `start` and `end` are  
        // character offsets that denote the start and end of the comment.  
        // When the `locations` option is on, two more parameters are  
        // passed, the full `{line, column}` locations of the start and  
        // end of the comments.  
    X   onComment: null,  

        // Nodes have their start and end characters offsets recorded in  
        // `start` and `end` properties (directly on the node, rather than  
        // the `loc` object, which holds line/column data. To also add a  
        // [semi-standardized][range] `range` property holding a `[start,  
        // end]` array with the same numbers, set the `ranges` option to  
        // `true`.  
        //  
        // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678  
    X   ranges: false,  

        // It is possible to parse multiple files into a single AST by  
        // passing the tree produced by parsing the first file as  
        // `program` option in subsequent parses. This will add the  
        // toplevel forms of the parsed file to the `Program` (top) node  
        // of an existing parse tree.  
        program: null,  
        
        // When `location` is on, you can pass this to record the source  
        // file in every node's `loc` object.  
        sourceFile: null  
    };

# Files
#### overture.js
This is the main file (and the only one you need to use)

#### overture-locations.js
Generates an AST which contains start and end location data.

#### overture-tokenizer.js
Doesn't generate a syntax tree, it's an experiment to compare parsing performance to zeparser2 (https://github.com/qfox/zeparser2)

When I last tried it, there were performance issues with esprimas <code>range:[start,end]</code> as V8 bailed on optimization.


# Function specific performance tests

* [http://jsperf.com/isidentifierchar/4](http://jsperf.com/isidentifierchar/4)
* [http://jsperf.com/skipblockcomment/2](http://jsperf.com/skipblockcomment/2)
* [http://jsperf.com/skiplinecomment/2](http://jsperf.com/skiplinecomment/2)
* [http://jsperf.com/skipspace/3](http://jsperf.com/skipspace/3)
* [http://jsperf.com/readregexp/5](http://jsperf.com/readregexp/5)
* [http://jsperf.com/readhex/4](http://jsperf.com/readhex/4)
* [http://jsperf.com/readnumber/3](http://jsperf.com/readnumber/3)
* [http://jsperf.com/readstring/3](http://jsperf.com/readstring/3)
* [http://jsperf.com/readword/3](http://jsperf.com/readword/3)
