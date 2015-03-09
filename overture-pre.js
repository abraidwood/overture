/* jshint -W053, strict:true, eqeqeq:true, quotmark:single, undef:true, unused:true, trailing:true  */
/* global  exports, module, define, ParserAPI*/

(function(root, mod) {
    'use strict';
    if(typeof exports === 'object' && typeof module === 'object') {
        // CommonJS
        return mod(exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        return define(['exports'], mod);
    } else {
        // Plain browser env
        mod(root.ParserAPI || (root.ParserAPI = {}));
    }
})(this, function(exports) {
    'use strict';

    // ## Token types

    // The assignment of fine-grained, information-carrying type objects
    // allows the tokenizer to store the information it has about a
    // token in a way that is very cheap for the parser to look up.

    // All token type variables start with an underscore, to make them
    // easy to recognize.

    // These are the general types. The `type` property is only used to
    // make them recognizeable when debugging.

    var types = {
        PROGRAM: new String('Program'),

        EMPTY_STATEMENT: new String('EmptyStatement'),
        BLOCK_STATEMENT: new String('BlockStatement'),
        EXPRESSION_STATEMENT: new String('ExpressionStatement'),
        IF_STATEMENT: new String('IfStatement'),
        LABELED_STATEMENT: new String('LabeledStatement'),
        BREAK_STATEMENT: new String('BreakStatement'),
        CONTINUE_STATEMENT: new String('ContinueStatement'),
        WITH_STATEMENT: new String('WithStatement'),
        SWITCH_STATEMENT: new String('SwitchStatement'),
        RETURN_STATEMENT: new String('ReturnStatement'),
        THROW_STATEMENT: new String('ThrowStatement'),
        TRY_STATEMENT: new String('TryStatement'),
        WHILE_STATEMENT: new String('WhileStatement'),
        DOWHILE_STATEMENT: new String('DoWhileStatement'),
        FOR_STATEMENT: new String('ForStatement'),
        FORIN_STATEMENT: new String('ForInStatement'),
        FOROF_STATEMENT: new String('ForOfStatement'),
        DEBUGGER_STATEMENT: new String('DebuggerStatement'),

        FUNCTION_DECLARATION: new String('FunctionDeclaration'),
        VARIABLE_DECLARATION: new String('VariableDeclaration'),
        VARIABLE_DECLARATOR: new String('VariableDeclarator'),

        THIS_EXPRESSION: new String('ThisExpression'),
        ARRAY_EXPRESSION: new String('ArrayExpression'),
        OBJECT_EXPRESSION: new String('ObjectExpression'),
        FUNCTION_EXPRESSION: new String('FunctionExpression'),
        SEQUENCE_EXPRESSION: new String('SequenceExpression'),
        UNARY_EXPRESSION: new String('UnaryExpression'),
        BINARY_EXPRESSION: new String('BinaryExpression'),
        ASSIGNMENT_EXPRESSION: new String('AssignmentExpression'),
        UPDATE_EXPRESSION: new String('UpdateExpression'),
        LOGICAL_EXPRESSION: new String('LogicalExpression'),
        CONDITIONAL_EXPRESSION: new String('ConditionalExpression'),
        NEW_EXPRESSION: new String('NewExpression'),
        CALL_EXPRESSION: new String('CallExpression'),
        MEMBER_EXPRESSION: new String('MemberExpression'),

        SWITCH_CASE: new String('SwitchCase'),
        CATCH_CLAUSE: new String('CatchClause'),


        IDENTIFIER: new String('Identifier'),
        LITERAL: new String('Literal')
    };

    var methods = {
        getSourceLocation: function() {
            return null;
        }
    };

    // The type field is a string representing the AST variant type. Each subtype of Node is documented below with the specific string of its type field. You can use this field to determine which interface a node implements.
    var nodes = {

        // ### Programs

        'Program': function Program() {
            this.type = types.PROGRAM;
            this.body = [];                             // [ Statement ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A complete program source tree.

        'SourceLocation': function SourceLocation() {
            this.start = null;                          // Position
            this.end = null;                            // Position
            this.source = null;                         // string | null
        },
        // The loc field represents the source location information of the node. If the parser produced no information about the node's source location, the field is null; otherwise it is an object consisting of a start position (the position of the first character of the parsed source region) and an end position (the position of the first character after the parsed source region):

        // Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
        'Position': function Position() {
            this.line = 1;                              // number >= 1
            this.column = 0;                            // number >= 0
        },

        // ### Statements

        'EmptyStatement': function EmptyStatement() {
            this.type = types.EMPTY_STATEMENT;
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An empty statement, i.e., a solitary semicolon.

        'BlockStatement': function BlockStatement() {
            this.type = types.BLOCK_STATEMENT;
            this.body = [];                             // [ Statement ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A block statement, i.e., a sequence of statements surrounded by braces.

        'ExpressionStatement': function ExpressionStatement() {
            this.type = types.EXPRESSION_STATEMENT;
            this.expression = null;                     // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An expression statement, i.e., a statement consisting of a single expression.

        'IfStatement': function IfStatement() {
            this.type = types.IF_STATEMENT;
            this.test = null;                           // Expression
            this.consequent = null;                     // Statement
            this.alternate = null;                      // Statement | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An if statement.

        'LabeledStatement': function LabeledStatement() {
            this.type = types.LABELED_STATEMENT;
            this.label = null;                          // Identifier
            this.body = null;                           // Statement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A labeled statement, i.e., a statement prefixed by a break/continue label.

        'BreakStatement': function BreakStatement() {
            this.type = types.BREAK_STATEMENT;
            this.label = null;                          // Identifier | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A break statement.

        'ContinueStatement': function ContinueStatement() {
            this.type = types.CONTINUE_STATEMENT;
            this.label = null;                          // Identifier | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A continue statement.

        'WithStatement': function WithStatement() {
            this.type = types.WITH_STATEMENT;
            this.object = null;                         // Expression
            this.body = null;                           // Statement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A with statement.

        'SwitchStatement': function SwitchStatement() {
            this.type = types.SWITCH_STATEMENT;
            this.discriminant = null;                   // Expression
            this.cases = [];                            // [ SwitchCase ]
            this.lexical = false;                       // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A switch statement. The lexical flag is metadata indicating whether the switch statement contains any unnested let declarations (and therefore introduces a new lexical scope).

        'ReturnStatement': function ReturnStatement() {
            this.type = types.RETURN_STATEMENT;
            this.argument = null;                       // Expression | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A return statement.

        'ThrowStatement': function ThrowStatement() {
            this.type = types.THROW_STATEMENT;
            this.argument = null;                       // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A throw statement.

        'TryStatement': function TryStatement() {
            this.type = types.TRY_STATEMENT;
            this.block = null;                          // BlockStatement
            this.handler = null;                        // CatchClause | null
            this.finalizer = null;                      // BlockStatement | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A try statement.

        'WhileStatement': function WhileStatement() {
            this.type = types.WHILE_STATEMENT;
            this.body = null;                           // Statement
            this.test = null;                           // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A while statement

        'DoWhileStatement': function DoWhileStatement() {
            this.type = types.DOWHILE_STATEMENT;
            this.body = null;                           // Statement
            this.test = null;                           // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A do/while statement.

        'ForStatement': function ForStatement() {
            this.type = types.FOR_STATEMENT;
            this.init = null;                           // VariableDeclaration | Expression | null
            this.test = null;                           // Expression | null
            this.update = null;                         // Expression | null
            this.body = null;                           // Statement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A for statement.

        'ForInStatement': function ForInStatement() {
            this.type = types.FORIN_STATEMENT;
            this.left = null;                           // VariableDeclaration |  Expression
            this.right = null;                          // Expression
            this.body = null;                           // Statement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A for/in statement, or, if each is true, a for each/in statement.

        'ForOfStatement': function ForOfStatement() {
            this.type = types.FOROF_STATEMENT;
            this.left = null;                           // VariableDeclaration |  Expression
            this.right = null;                          // Expression
            this.body = null;                           // Statement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A for/of statement.

        'DebuggerStatement': function DebuggerStatement() {
            this.type = types.DEBUGGER_STATEMENT;
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A debugger statement.

        // ### Declarations

        'FunctionDeclaration': function FunctionDeclaration() {
            this.type = types.FUNCTION_DECLARATION;
            this.id = null;                             // Identifier
            this.params = [];                           // [ Pattern ]
            this.defaults = [];                         // [ Expression ]
            this.rest = null;                           // Identifier | null
            this.body = null;                           // BlockStatement | Expression
            this.expression = false;                    // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A function declaration.
        // Note: The id field cannot be null.

        'VariableDeclaration': function VariableDeclaration(state) {
            this.type = types.VARIABLE_DECLARATION;
            this.declarations = [];                     // [ VariableDeclarator ]
            this.kind = state.tokType;                  // "var" | "let" | "const"
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A variable declaration, via one of var, let, or const.

        'VariableDeclarator': function VariableDeclarator() {
            this.type = types.VARIABLE_DECLARATOR;
            this.id = null;                             // Pattern
            this.init = null;                           // Expression | null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A variable declarator.
        // Note: The id field cannot be null.

        // ### Expressions

        'ThisExpression': function ThisExpression() {
            this.type = types.THIS_EXPRESSION;
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A this expression.

        'ArrayExpression': function ArrayExpression() {
            this.type = types.ARRAY_EXPRESSION;
            this.elements = [];                         // [ Expression | null ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An array expression.

        'ObjectExpression': function ObjectExpression() {
            this.type = types.OBJECT_EXPRESSION;
            this.properties = [];                       // [ ObjectExpressionProp ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An object expression. A literal property in an object expression can have either a string or number as its value. Ordinary property initializers have a kind value "init"; getters and setters have the kind values "get" and "set", respectively.

        'FunctionExpression': function FunctionExpression() {
            this.type = types.FUNCTION_EXPRESSION;
            this.id = null;                             // Identifier | null
            this.params = [];                           // [ Pattern ]
            this.defaults = [];                         // [ Expression ]
            this.rest = null;                           // Identifier | null
            this.body = null;                           // BlockStatement | Expression
            this.expression = false;                    // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A function expression.

        'SequenceExpression': function SequenceExpression() {
            this.type = types.SEQUENCE_EXPRESSION;
            this.expressions = [];                      // [ Expression ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A sequence expression, i.e., a comma-separated sequence of expressions.

        'UnaryExpression': function UnaryExpression() {
            this.type = types.UNARY_EXPRESSION;
            this.operator = null;                       // state.UnaryOperator
            this.argument = null;                       // Expression
            this.prefix = true;                         // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A unary operator expression.

        'BinaryExpression': function BinaryExpression() {
            this.type = types.BINARY_EXPRESSION;
            this.operator = null;                       // state.BinaryOperator
            this.left = null;                           // Expression
            this.right = null;                          // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A binary operator expression.

        'AssignmentExpression': function AssignmentExpression() {
            this.type = types.ASSIGNMENT_EXPRESSION;
            this.operator = null;                       // state.AssignmentOperator
            this.left = null;                           // Expression
            this.right = null;                          // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An assignment operator expression.

        'UpdateExpression': function UpdateExpression() {
            this.type = types.UPDATE_EXPRESSION;
            this.operator = null;                       // state.UpdateOperator
            this.argument = null;                       // Expression
            this.prefix = true;                         // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An update (increment or decrement) operator expression.

        'LogicalExpression': function LogicalExpression() {
            this.type = types.LOGICAL_EXPRESSION;
            this.operator = null;                       // state.LogicalOperator
            this.left = null;                           // Expression
            this.right = null;                          // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A logical operator expression.

        'ConditionalExpression': function ConditionalExpression() {
            this.type = types.CONDITIONAL_EXPRESSION;
            this.test = null;                           // Expression
            this.consequent = null;                     // Expression
            this.alternate = null;                      // Expression
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A conditional expression, i.e., a ternary ?/: expression.

        'NewExpression': function NewExpression() {
            this.type = types.NEW_EXPRESSION;
            this.callee = null;                         // Expression
            this.arguments = [];                        // [ Expression | null ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A new expression.

        'CallExpression': function CallExpression(callee) {
            this.type = types.CALL_EXPRESSION;
            this.callee = callee;                       // Expression
            this.arguments = [];                        // [ Expression | null ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A function or method call expression.

        'MemberExpression': function MemberExpression() {
            this.type = types.MEMBER_EXPRESSION;
            this.object = null;                         // Expression
            this.property = null;                       // Identifier | Expression
            this.computed = false;                      // boolean
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A member expression. If computed === true, the node corresponds to a computed e1[e2] expression and property is an Expression. If computed === false, the node corresponds to a static e1.x expression and property is an Identifier.

        // ### Clauses

        'SwitchCase': function SwitchCase() {
            this.type = types.SWITCH_CASE;
            this.test = null;                           // Expression | null
            this.consequent = [];                       // [ Statement ]
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A case (if test is an Expression) or default (if test === null) clause in the body of a switch statement.

        'CatchClause': function CatchClause() {
            this.type = types.CATCH_CLAUSE;
            this.param = null;                          // Pattern
            this.body = null;                           // BlockStatement
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A catch clause following a try block. The optional guard property corresponds to the optional expression guard on the bound variable.

        // ### Miscellaneous

        'Identifier': function Identifier() {
            this.type = types.IDENTIFIER;
            this.name = '';                             // string
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // An identifier. Note that an identifier may be an expression or a destructuring pattern.

        'Literal': function Literal() {
            this.type = types.LITERAL;
            this.value = null;                          // string | boolean | null | number | RegExp
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.

        'LiteralNumber': function LiteralNumber() {
            this.type = types.LITERAL;
            this.value = 0;                             // number
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
        'LiteralString': function LiteralString() {
            this.type = types.LITERAL;
            this.value = '';                            // string
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
        'LiteralNull': function LiteralNull() {
            this.type = types.LITERAL;
            this.value = null;                          // null
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
        'LiteralRegExp': function LiteralRegExp() {
            this.type = types.LITERAL;
            this.value = null;                          // RegExp
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
        'LiteralTrue': function LiteralTrue() {
            this.type = types.LITERAL;
            this.value = true;                          // boolean true
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
        'LiteralFalse': function LiteralFalse() {
            this.type = types.LITERAL;
            this.value = false;                         // boolean false
            this.loc = methods.getSourceLocation();     // SourceLocation | null
        },
        // A literal token. Note that a literal can be an expression.
    };

    var operators = {

        // Assignment operator tokens.
        'AssignmentOperator': {
            'eq': new String('='),
            'plus': new String('+='),
            'minus': new String('-='),
            'mult': new String('*='),
            'div': new String('/='),
            'modulo': new String('%='),
            'left_shift': new String('<<='),
            'right_shift': new String('>>='),
            'zero_fill_right_shift': new String('>>>='),
            'OR': new String('|='),
            'XOR': new String('^='),
            'AND': new String('&=')
        },

        // Binary operator tokens.
        'BinaryOperator': {
            'eq_eq': new String('=='),
            'ex_eq': new String('!='),
            'eq_eq_eq': new String('==='),
            'ex_eq_eq': new String('!=='),
            'lt': new String('<'),
            'lt_eq': new String('<='),
            'gt': new String('>'),
            'gt_eq': new String('>='),
            'left_shift': new String('<<'),
            'right_shift': new String('>>'),
            'zero_fill_right_shift': new String('>>>'),
            'plus': new String('+'),
            'minus': new String('-'),
            'mult': new String('*'),
            'div': new String('/'),
            'modulo': new String('%'),
            'OR': new String('|'),
            'AND': new String('&'),
            'XOR': new String('^'),
            'in': new String('in'),
            'instanceof': new String('instanceof')
        },

        // Logical operator tokens.
        'LogicalOperator': {
            'OR': new String('||'),
            'AND': new String('&&')
        },

        // Update operator tokens.
        'UpdateOperator': {
            'increment': new String('++'),
            'decrement': new String('--')
        },

        // Unary operator tokens.
        'UnaryOperator': {
            'minus': new String('-'),
            'plus': new String('+'),
            'ex': new String('!'),
            'BITWISE_NOT': new String('~'),
            'typeof': new String('typeof'),
            'void': new String('void'),
            'delete': new String('delete')
        }
    };

    exports.type = types;
    exports.node = nodes;

    exports.methods = methods;

    exports.AssignmentOperator = operators.AssignmentOperator;
    exports.BinaryOperator = operators.BinaryOperator;
    exports.LogicalOperator = operators.LogicalOperator;
    exports.UpdateOperator = operators.UpdateOperator;
    exports.UnaryOperator = operators.UnaryOperator;

});

// Overture is a fast JavaScript parser written in JavaScript.
//
// Overture was written by Alistair Braidwood and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Overture are available at
//
//         [https://github.com/abraidwood/overture.git]
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/abraidwood/overture/issues
//
// Overture owes a lot of its code structure and initial work to
// Acorn:
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//         http://marijnhaverbeke.nl/git/acorn
//         https://github.com/marijnh/acorn.git
//

/* jshint -W053, strict:true, eqeqeq:true, quotmark:single, undef:true, unused:true, trailing:true  */
/* global  exports, module, define, self */

(function(mod) {
    'use strict';
    if (typeof(exports) === 'object' && typeof(module) === 'object') {return mod(exports);} // CommonJS
    if (typeof(define) === 'function' && define.amd) {return define(['exports'], mod);} // AMD
    mod(self.overture || (self.overture = {})); // Plain browser env
})(function(exports) {

    'use strict';

    exports.version = '0.2';

    // The main exported interface (under `self.overture` when in the
    // browser) is a `parse` function that takes a code string and
    // returns an abstract syntax tree as specified by [Mozilla parser
    // API][api], with the caveat that the SpiderMonkey-specific syntax
    // (`let`, `yield`, inline XML, etc) is not recognized.
    //
    // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

    var sourceFile;
    var readWord, isKeyword;

    var raiseReturnOutsideFunction = function() {};

    exports.parse = function(inpt, opts) {
        var state = {
            ch_: 0,
            nextChar: 0,
            tokPos: 0,
            tokStart: 0,
            tokEnd: 0,
            input: '',
            inputLen: 0,
            tokType: null,
            tokVal: null,
            tokRegexpAllowed: false,
            lastStart: 0,
            lastEnd: 0,
            inFunction: false,
            labels: [],
            strict: false,
            ecmaVersion: 5,
            strictSemicolons: false,
            allowTrailingCommas: true,
            forbidReserved: false,
            allowReturnOutsideFunction: false,
            locations: false,
            onComment: null,
            ranges: false,
            program: null,
            sourceFile: null,
            _word: '',
            tokStartLoc: null,
            tokEndLoc: null,
            lastEndLoc: null

        };
        buildState(state);

        state.input = String(inpt);
        state.inputLen = state.input.length;

        var opt;
        for (opt in defaultOptions) {
            state[opt] = defaultOptions[opt];
        }
        for (opt in opts) {
            state[opt] = opts[opt];
        }
        sourceFile = state.sourceFile || null;

        ParserAPI.methods.getSourceLocation = state.locations ?
            function(_state) {
                return function getSourceLocation_on() {
                    var s = new ParserAPI.node.SourceLocation();
                    s.start = _state.tokStartLoc;
                    s.source = sourceFile;
                    return s;
                };
            }(state) : function getSourceLocation_off() {
                return null;
            };

        isKeyword = state.ecmaVersion >= 6 ? isES6Keyword : isES5Keyword;

        raiseReturnOutsideFunction = function(state) {
            raise(state, null, '\'return\' outside of function');
        };

        return parseTopLevel(state);
    };

    // A second optional argument can be given to further configure
    // the parser process. These options are recognized:

    function DefaultOptions() {
        // `ecmaVersion` indicates the ECMAScript version to parse. Must
        // be either 3, 5 or 6. This
        // influences support for strict mode, the set of reserved words, and
        // support for getters and setters and other features.
        this.ecmaVersion = 5;
        // Turn on `strictSemicolons` to prevent the parser from doing
        // automatic semicolon insertion.
        this.strictSemicolons = false;
        // When `allowTrailingCommas` is false, the parser will not allow
        // trailing commas in array and object literals.
        this.allowTrailingCommas = true;
        // By default, reserved words are not enforced. Enable
        // `forbidReserved` to enforce them.
        this.forbidReserved = false;
        // When enabled, a return at the top level is not considered an
        // error.
        this.allowReturnOutsideFunction = false;
        // When `locations` is on, `loc` properties holding objects with
        // `start` and `end` properties in `{line, column}` form (with
        // line being 1-based and column 0-based) will be attached to the
        // nodes.
        this.locations = false;
        // A function can be passed as `onComment` option, which will
        // cause Overture to call that function with `(block, text, start,
        // end)` parameters whenever a comment is skipped. `block` is a
        // boolean indicating whether this is a block (`/* */`) comment,
        // `text` is the content of the comment, and `start` and `end` are
        // character offsets that denote the start and end of the comment.
        // When the `locations` option is on, two more parameters are
        // passed, the full `{line, column}` locations of the start and
        // end of the comments.
        this.onComment = null;
        // Nodes have their start and end characters offsets recorded in
        // `start` and `end` properties (directly on the node, rather than
        // the `loc` object, which holds line/column data. To also add a
        // [semi-standardized][range] `range` property holding a `[start,
        // end]` array with the same numbers, set the `ranges` option to
        // `true`.
        //
        // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=74567
        this.ranges = false;
        // It is possible to parse multiple files into a single AST by
        // passing the tree produced by parsing the first file as
        // `program` option in subsequent parses. This will add the
        // toplevel forms of the parsed file to the `Program` (top) node
        // of an existing parse tree.
        this.program = null;
        // When `locations` is on, you can pass this to record the source
        // file in every node's `loc` object.
        this.sourceFile = null;
    }

    var defaultOptions = exports.defaultOptions = new DefaultOptions();

    // The `getLineInfo` function is mostly useful when the
    // `locations` option is off (for performance reasons) and you
    // want to find the line/column position for a given character
    // offset. `input` should be the code string that the offset refers
    // into.

    var getLineInfo = exports.getLineInfo = function getLineInfo(state, input, offset) {
        for (var line = 1, cur = 0;;) {
            state.lineBreak.lastIndex = cur;
            var match = state.lineBreak.exec(input);
            if (match && match.index < offset) {
                ++line;
                cur = match.index + match[0].length;
            } else {
                break;
            }
        }
        return {
            line: line,
            column: offset - cur
        };
    };


    // Overture is organized as a tokenizer and a recursive-descent parser.
    // Both use (closure-)global variables to keep their state and
    // communicate. We already saw the `options`, `input`, and
    // `state.inputLen` variables above (set in `parse`).

    // The current position of the tokenizer in the state.input.


    // The start and end offsets of the current token.


    // When `state.locations` is true, these hold objects
    // containing the tokens start and end line/column pairs.

    var tokCurLine = 1, tokLineStart = 0;

    // The type and value of the current token. Token types are objects,
    // named by variables against which they can be compared, and
    // holding properties that describe them (indicating, for example,
    // the precedence of an infix operator, and the original name of a
    // keyword token). The kind of value that's held in `state.tokVal` depends
    // on the type of the token. For literals, it is the literal value,
    // for operators, the operator name, and so on.


    // Interal state for the tokenizer. To distinguish between division
    // operators and regular expressions, it remembers whether the last
    // token was one that is allowed to be followed by an expression.
    // (If it is, a slash is probably a regexp, if it isn't it's a
    // division operator. See the `parseStatement` function for a
    // caveat.)


    // These store the position of the previous token, which is useful
    // when finishing a node and assigning its `end` position.


    // This is the parser's state. `state.inFunction` is used to reject
    // `return` statements outside of functions, `state.labels` to verify that
    // `break` and `continue` have somewhere to jump to, and `strict`
    // indicates whether strict mode is on.

    // This function is used to raise exceptions on parse errors. It
    // takes either a `{line, column}` object or an offset integer (into
    // the current `input`) as `pos` argument. It attaches the position
    // to the end of the error message, and then raises a `SyntaxError`
    // with that message.

    function raise(state, pos, message) {
        pos = pos || state.tokPos;
        if (typeof(pos) === 'number') {
            pos = getLineInfo(state, state.input, pos);
        }
        message += ' (' + pos.line + ':' + pos.column + ')';
        throw new SyntaxError(message);
    }

    // ## Token types

    // The assignment of fine-grained, information-carrying type objects
    // allows the tokenizer to store the information it has about a
    // token in a way that is very cheap for the parser to look up.

    // All token type variables start with an underscore, to make them
    // easy to recognize.

    // These are the general types. The `type` property is only used to
    // make them recognizeable when debugging.


    // By default, Reflect.parse() produces Node objects, which are plain JavaScript objects (i.e., their prototype derives from the standard Object prototype). All node types implement the following interface:
    function Node(type) {
        this.type = type || null;           // 'string'
        // @if LOCATIONS=true
        this.loc = new ParserAPI.node.SourceLocation();    // SourceLocation | null
        // @endif
    }

    // Overture helper
    var ObjectExpressionProp = function ObjectExpressionProp(state) {
        this.key = null;                    // Literal | Identifier
        this.value = null;                  // Expression
        this.kind = state.PropertyKind.init;      // "init" | "get" | "set"
    };

    // Overture helper
    var Label = function Label(name) {
        this.name = name;
        this.kind = null;
    };


    function buildState(state) {

        // Whether a single character denotes a newline.
        state.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.
        state.lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

        state._num = new Node('num');
        state._regexp = new Node('regexp');
        state._string = new Node('string');
        state._name = new Node('name');
        state._eof = new Binop(0);

        // Keyword tokens. The `keyword` property (also used in keyword-like
        // operators) indicates that the token originated from an
        // identifier-like word, which is used when parsing property names.
        //
        // The `beforeExpr` property is used to disambiguate between regular
        // expressions and divisions. It is set on all token types that can
        // be followed by an expression (thus, a slash after them would be a
        // regular expression).
        //
        // `isLoop` marks a keyword as starting a loop, which is important
        // to know when parsing a label, in order to allow or disallow
        // continue jumps to that label.

        state._break = new Keyword('break');
        state._case = new Keyword('case');
        state._catch = new Keyword('catch');
        state._continue = new Keyword('continue');
        state._var = new String('var');
        state._if = new Keyword('if');
        state._function = new Keyword('function');

        state._debugger = new Keyword('debugger');
        state._default = new Keyword('default');
        state._do = new Keyword('do');
        state._else = new Keyword('else');
        state._false = new Keyword('false');
        state._finally = new Keyword('finally');
        state._for = new Keyword('for');
        state._new = new Keyword('new');
        state._null = new Keyword('null');
        state._return = new Keyword('return');
        state._switch = new Keyword('switch');
        state._this = new Keyword('this');
        state._throw = new Keyword('throw');
        state._true = new Keyword('true');
        state._try = new Keyword('try');
        state._let = new String('let');
        state._const = new String('const');
        state._while = new Keyword('while');
        state._with = new Keyword('with');
        state._of = new Keyword('of');

        // Punctuation token types. Again, the `type` property is purely for debugging.

        state._bracketL = new Keyword('[');
        state._bracketR = new Keyword(']');
        state._braceL = new Keyword('{');
        state._braceR = new Keyword('}');
        state._parenL = new Keyword('(');
        state._parenR = new Keyword(')');
        state._comma = new Keyword(',');
        state._semi = new Keyword(';');
        state._colon = new Keyword(':');
        state._dot = new Keyword('.');
        state._question = new Keyword('?');
        state._ellipsis = new Keyword('...');


        // Some keywords are treated as regular operators. `in` sometimes
        // (when parsing `for`) needs to be tested against specifically, so
        // we assign a variable name to it for quick comparing.

        state._in = new Binop(7, {keyword:'in'});
        state._void = new Binop(0, {keyword:'void',prefix:true});
        state._delete = new Binop(0, {keyword:'delete',prefix:true});
        state._typeof = new Binop(0, {keyword:'typeof',prefix:true});
        state._instanceof = new Binop(7, {keyword:'instanceof'});


        // Operators. These carry several kinds of properties to help the
        // parser use them properly (the presence of these properties is
        // what categorizes them as operators).
        //
        // `binop`, when present, specifies that this operator is a binary
        // operator, and will refer to its precedence.
        //
        // `prefix` and `postfix` mark the operator as a prefix or postfix
        // unary operator. `isUpdate` specifies that the node produced by
        // the operator should be of type UpdateExpression rather than
        // simply UnaryExpression (`++` and `--`).
        //
        // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
        // binary operators with a very low precedence, that should result
        // in AssignmentExpression nodes.

        state._slash = new Binop(10);
        state._eq = new Binop(0, {isAssign:true});
        state._assign = new Binop(0, {isAssign:true});
        state._incdec = new Binop(0, {prefix:true,postfix:true});
        state._prefix = new Binop(0, {prefix:true});

        state._bin_minop = new Binop(0);
        state._logicalOR = new Binop(1);
        state._logicalAND = new Binop(2);
        state._bitwiseOR = new Binop(3);
        state._bitwiseXOR = new Binop(4);
        state._bitwiseAND = new Binop(5);
        state._equality = new Binop(6);
        state._relational = new Binop(7);
        state._bitShift = new Binop(8);
        state._plusMin = new Binop(9, {prefix:true});
        state._multiplyModulo = new Binop(10);

        state.PropertyKind = {
            'init': new String('init'),
            'get': new String('get'),
            'set': new String('set')
        };

        state._numstart = 0;
        state._numflags = 0;
        state._numprev = 0;
    }


    function Keyword(word, params) {
        this.keyword = new String(word);
        for(var key in params) {
            if(!params.hasOwnProperty(key)) {continue;}
            this[key] = params[key];
        }
    }

    function Binop(precedence, params) {
        this.precedence = precedence;
        for(var key in params) {
            if(!params.hasOwnProperty(key)) {continue;}
            this[key] = params[key];
        }
    }



    // This is a trick taken from Esprima. It turns out that, on
    // non-Chrome browsers, to check whether a string is in a set, a
    // predicate containing a big ugly `switch` statement is faster than
    // a regular expression, and on Chrome the two are about on par.
    //
    // eval was removed as it can't be optimized in v8 and the functions
    // are 'very hot' according to its tracing
    //
    // It starts by sorting the words by length.

    // The ECMAScript 3 reserved word list.

    function isReservedWord3(state) {
        switch (state._word.length) {
        case 3:
            return state._word==='int';
        case 4:
            return state._word==='byte'||state._word==='char'||state._word==='enum'||state._word==='goto'||state._word==='long';
        case 5:
            return state._word==='class'||state._word==='final'||state._word==='float'||state._word==='short'||state._word==='super';
        case 6:
            return state._word==='double'||state._word==='export'||state._word==='import'||state._word==='native'||state._word==='public'||state._word==='static'||state._word==='throws';
        case 7:
            return state._word==='boolean'||state._word==='extends'||state._word==='package'||state._word==='private';
        case 8:
            return state._word==='abstract'||state._word==='volatile';
        case 9:
            return state._word==='interface'||state._word==='protected'||state._word==='transient';
        case 10:
            return state._word==='implements';
        case 12:
            return state._word==='synchronized';
        default:
            return false;
        }
    }

    // ECMAScript 5 reserved words.

    function isReservedWord5(state) {
        switch (state._word.length) {
        case 4:
            return state._word === 'enum';
        case 5:
            return state._word === 'class' || state._word === 'super';
        case 6:
            return state._word === 'export' || state._word === 'import';
        case 7:
            return state._word === 'extends';
        default:
            return false;
        }
    }
    // The additional reserved words in strict mode.

    function isStrictReservedWord(state) {
        switch (state._word.length) {
        case 3:
            return state._word === 'let';
        case 5:
            return state._word === 'yield';
        case 6:
            return state._word === 'static' || state._word === 'public';
        case 7:
            return state._word === 'private' || state._word === 'package';
        case 9:
            return state._word === 'interface' || state._word === 'protected';
        case 10:
            return state._word === 'implements';
        default:
            return false;
        }
    }
    // The forbidden variable names in strict mode.

    function isStrictBadIdWord(state) {
        return state._word === 'eval' || state._word === 'arguments';
    }

    // And the keywords.

    function isES5Keyword(state) {
        switch (state._word.length) {
        case 4:
            switch (state._word) {
            case 'null': return state._null;
            case 'true': return state._true;
            case 'this': return state._this;
            case 'with': return state._with;
            case 'void': return state._void;
            case 'else': return state._else;
            case 'case': state.tokRegexpAllowed = true; return state._case;
            }
            break;
        case 5:
            switch (state._word) {
            case 'false': return state._false;
            case 'break': return state._break;
            case 'while': return state._while;
            case 'catch': return state._catch;
            case 'throw': return state._throw;
            }
            break;
        case 3:
            switch (state._word) {
            case 'var': return state._var;
            case 'for': return state._for;
            case 'try': return state._try;
            case 'new': return state._new;
            }
            break;
        case 6:
            switch (state._word) {
            case 'switch': return state._switch;
            case 'typeof': state.tokRegexpAllowed = true; return state._typeof;
            case 'delete': return state._delete;
            case 'return': state.tokRegexpAllowed = true; return state._return;
            }
            break;
        case 8:
            switch (state._word) {
            case 'function': return state._function;
            case 'continue': return state._continue;
            case 'debugger': return state._debugger;
            }
            break;
        case 2:
            switch (state._word) {
            case 'if': return state._if;
            case 'do': return state._do;
            case 'in': state.tokRegexpAllowed = true; return state._in;
            //case 'of': state.tokRegexpAllowed = true; return state._of;
            }
            break;
        case 7:
            switch (state._word) {
            case 'default': return state._default;
            case 'finally': return state._finally;
            }
            break;
        case 10:
            if (state._word === 'instanceof') {return state._instanceof;}
            break;
        }
        if (state.forbidReserved && (state.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(state)) {
            raise(state, state.tokStart, 'The keyword \'' + state._word + '\' is reserved');
        } else if (state.strict && isStrictReservedWord(state)) {
            raise(state, state.tokStart, 'The keyword \'' + state._word + '\' is reserved');
        } else {
            return state._name;
        }
    }

    function isES6Keyword(state) {
        switch (state.tokPos - state.tokStart) {
        case 4:
            switch (state._word) {
            case 'null': return state._null;
            case 'true': return state._true;
            case 'this': return state._this;
            case 'with': return state._with;
            case 'void': return state._void;
            case 'else': return state._else;
            case 'case': state.tokRegexpAllowed = true; return state._case;
            }
            break;
        case 5:
            switch (state._word) {
            case 'false': return state._false;
            case 'break': return state._break;
            case 'while': return state._while;
            case 'catch': return state._catch;
            case 'throw': return state._throw;
            case 'const': return state._const;
            }
            break;
        case 3:
            switch (state._word) {
            case 'var': return state._var;
            case 'for': return state._for;
            case 'try': return state._try;
            case 'new': return state._new;
            case 'let': return state._let;
            }
            break;
        case 6:
            switch (state._word) {
            case 'switch': return state._switch;
            case 'typeof': state.tokRegexpAllowed = true; return state._typeof;
            case 'delete': return state._delete;
            case 'return': state.tokRegexpAllowed = true; return state._return;
            }
            break;
        case 8:
            switch (state._word) {
            case 'function': return state._function;
            case 'continue': return state._continue;
            case 'debugger': return state._debugger;
            }
            break;
        case 2:
            switch (state._word) {
            case 'if': return state._if;
            case 'do': return state._do;
            case 'in': state.tokRegexpAllowed = true; return state._in;
            //case 'of': state.tokRegexpAllowed = true; return state._of;
            }
            break;
        case 7:
            switch (state._word) {
            case 'default': return state._default;
            case 'finally': return state._finally;
            }
            break;
        case 10:
            if (state._word === 'instanceof') {return state._instanceof;}
            break;
        }
        return state._name;
    }

    // ## Character categories

    // Big ugly regular expressions that match characters in the
    // whitespace, identifier, and identifier-start categories. These
    // are only applied when a character is found to actually have a
    // code point above 128.

    var nonASCIIidentifierStartChars = '\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc';
    var nonASCIIidentifierChars = '\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f';
    var nonASCIIidentifierStart = new RegExp('[' + nonASCIIidentifierStartChars + ']');
    var nonASCIIidentifier = new RegExp('[' + nonASCIIidentifierStartChars + nonASCIIidentifierChars + ']');

    // Test whether a given character code starts an identifier.

    var isIdentifierStart = new Array(65536);
    var isIdentifierChar = new Array(65536);

    function isIdentifierStart_fn(code) {
        if (code < 65) return code === 36;
        if (code < 91) return true;
        if (code < 97) return code === 95;
        if (code < 123)return true;
        if (code >= 0xaa) {
            return nonASCIIidentifierStart.test(String.fromCharCode(code));
        }
        return false;
    }

    // Test whether a given character is part of an identifier.

    // http://jsperf.com/isidentifierchar/4
    function isIdentifierChar_fn(code) {
        if (code < 48) return code === 36;
        if (code < 58) return true;
        if (code < 65) return false;
        if (code < 91) return true;
        if (code < 97) return code === 95;
        if (code < 123)return true;
        if (code >= 0xaa) {
            return nonASCIIidentifier.test(String.fromCharCode(code));
        }
        return false;
    }

    function setupIdentCharLUTs() {
        for(var ix=0;ix<65536;ix++) {
            isIdentifierStart[ix] = isIdentifierStart_fn(ix);
            isIdentifierChar[ix] = isIdentifierChar_fn(ix);
        }
    }
    setupIdentCharLUTs();

    // ## Tokenizer

    function skipSpace(state) {
        while (state.tokPos < state.inputLen) {
            state.ch_ = state.input.charCodeAt(state.tokPos);
            switch(state.ch_) {
            case 9:
            case 11:
            case 12:
            case 32:
            case 160:
            case 0x1680:
            case 0x180e:
            case 0x2028:
            case 0x2029:
            case 0x202f:
            case 0x205f:
            case 0x3000:
            case 0xfeff:
                ++state.tokPos;
                break;
            case 10:
            case 8232:
            case 8233:
                ++state.tokPos;
                // @if LOCATIONS=true
                ++tokCurLine;
                tokLineStart = state.tokPos;
                // @endif
                break;
            case 47:
                state.nextChar = state.input.charCodeAt(state.tokPos+1);
                if (state.nextChar === 42) {skipBlockComment(state);}
                else if (state.nextChar === 47) {skipLineComment(state);}
                else return;
                break;
            case 13:
                ++state.tokPos;
                state.ch_ = state.input.charCodeAt(state.tokPos);
                if (state.ch_ === 10) {
                    ++state.tokPos;
                }
                // @if LOCATIONS=true
                ++tokCurLine;
                tokLineStart = state.tokPos;
                // @endif
                break;
            default:
                if (state.ch_ >= 0x2000 && state.ch_ <= 0x200a) {
                    ++state.tokPos;
                } else {
                    return;
                }
            }
        }
    }

    // Reset the token state. Used at the start of a parse.

    function initTokenState(state) {
        state.tokPos = 0;
        state.tokRegexpAllowed = true;
        // @if LOCATIONS=true
        tokCurLine = 1;
        tokLineStart = 0;
        state.lastEndLoc = new ParserAPI.node.Position(state);
        state.lastEndLoc.line = tokCurLine;
        state.lastEndLoc.column = state.tokPos - tokLineStart;
        // @endif
        skipSpace(state);
    }

    // Called at the end of every token. Sets `state.tokEnd`, `state.tokVal`, and
    // `state.tokRegexpAllowed`, and skips the space after the token, so that
    // the next one's `tokStart` will point at the right position.

    function finishToken(state, type, val) {
        // @if LOCATIONS=true
        state.tokEndLoc = new ParserAPI.node.Position(state);
        state.tokEndLoc.line = tokCurLine;
        state.tokEndLoc.column = state.tokPos - tokLineStart;
        // @endif
        state.tokEnd = state.tokPos;
        state.tokType = type;
        state.tokVal = val;
        skipSpace(state);
    }

    // Skip a block comment '/* ... */'
    // http://jsperf.com/skipblockcomment/2
    var _start = 0;
    var _end = 0;
    var _comment = '';
    var _match = null;
    var _lastMatch = '';

    var _endBlockComment = new String('*/');

    function skipBlockComment(state) {
        _start = state.tokPos;
        state.tokPos += 2;
        _end = state.input.indexOf(_endBlockComment, state.tokPos);
        if (_end === -1) raise(state, state.tokPos - 2, 'Unterminated comment');
        state.tokPos = _end + 2;
        state.ch_ = state.input.charCodeAt(state.tokPos);

        // @if LOCATIONS=true
        _comment = state.input.slice(_start + 2, _end);
        var _match = _comment.match(state.lineBreak);
        if(_match) {
            tokCurLine += _match.length;
            _lastMatch = _match[_match.length-1];
            tokLineStart = state.input.lastIndexOf(_lastMatch,state.tokPos) + _lastMatch.length;
        }
        // @endif
    }

    // Skip a line comment '// ... <newline>'
    // http://jsperf.com/skiplinecomment/2
    function skipLineComment(state) {
        state.tokPos += 2;
        state.ch_ = state.input.charCodeAt(state.tokPos);
        while (state.ch_ !== 10 && state.ch_ !== 13 && state.tokPos < state.inputLen && state.ch_ !== 8232 && state.ch_ !== 8233) {
            ++state.tokPos;
            state.ch_ = state.input.charCodeAt(state.tokPos);
        }
    }

    // Called at the start of the parse and after every token. Skips
    // whitespace and comments.
    // http://jsperf.com/skipspace/4


    // ### Token reading

    // Read '.[0-9]', '...' and '.'
    // The interpretation of a dot depends on whether it is followed
    // by a digit or two more dots.
    function readToken_dot(state) {
        state.nextChar = state.input.charCodeAt(state.tokPos+1);
        if (state.nextChar >= 48 && state.nextChar <= 57) {
            state.ch_ = 46;
            readNumber(state);
        } else if(state.nextChar === 46 && state.ecmaVersion >= 6 && state.input.charCodeAt(state.tokPos+2) === 46) {
            state.tokPos += 3;
            finishToken(state, state._ellipsis);
        } else {
            ++state.tokPos;
            state.tokRegexpAllowed = true;
            finishToken(state, state._dot);
        }
    }

    // Read '/=' and '='
    // Line and block comments are skipped by skipSpace before we get here
    function readToken_slash(state) {
        ++state.tokPos;
        if (state.tokRegexpAllowed) {
            readRegexp(state);
            return;
        }

        state.nextChar = state.input.charCodeAt(state.tokPos);

        if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.div);
        } else {
            finishToken(state, state._slash, ParserAPI.BinaryOperator.div);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '*=' and '*'
    function readToken_multiply(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.mult);
        } else {
            finishToken(state, state._multiplyModulo, ParserAPI.BinaryOperator.mult);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '%=' and '%'
    function readToken_modulo(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.modulo);
        } else {
            finishToken(state, state._multiplyModulo, ParserAPI.BinaryOperator.modulo);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '||', '|=' and '|'
    function readToken_OR(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 124) {
            ++state.tokPos;
            finishToken(state, state._logicalOR, ParserAPI.LogicalOperator.OR);
        } else if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.OR);
        } else {
            finishToken(state, state._bitwiseOR, ParserAPI.BinaryOperator.OR);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '&&', '&=' and '&'
    function readToken_AND(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 38) {
            ++state.tokPos;
            finishToken(state, state._logicalAND, ParserAPI.LogicalOperator.AND);
        } else if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.AND);
        } else {
            finishToken(state, state._bitwiseAND, ParserAPI.BinaryOperator.AND);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '^=' and '^'
    function readToken_XOR(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.XOR);
        } else {
            finishToken(state, state._bitwiseXOR, ParserAPI.BinaryOperator.XOR);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '++', '+=' and '+'
    function readToken_plus(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 43) {
            ++state.tokPos;
            finishToken(state, state._incdec, ParserAPI.UpdateOperator.increment);
        } else if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.plus);
        } else {
            finishToken(state, state._plusMin, ParserAPI.UnaryOperator.plus);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '--', '-=' and '-'
    function readToken_minus(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 45) {
            ++state.tokPos;
            finishToken(state, state._incdec, ParserAPI.UpdateOperator.decrement);
        } else if (state.nextChar === 61) {
            ++state.tokPos;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.minus);
        } else {
            finishToken(state, state._plusMin, ParserAPI.UnaryOperator.minus);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '<<=' and '<<'
    function readToken_leftShift(state) {
        if (state.input.charCodeAt(state.tokPos + 1) === 61) {
            state.tokPos += 2;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.left_shift);
        } else {
            ++state.tokPos;
            finishToken(state, state._bitShift, ParserAPI.BinaryOperator.left_shift);
        }
    }

    // Read '<=' and '<'
    function readToken_lessThan(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 60) {
            readToken_leftShift(state);
        } else {
            if (state.nextChar === 61) {
                ++state.tokPos;
                finishToken(state, state._bitShift, ParserAPI.BinaryOperator.lt_eq);
            } else {
                finishToken(state, state._relational, ParserAPI.BinaryOperator.lt);
            }
        }
        state.tokRegexpAllowed = true;
    }

    // Read '>>=', '>>>=', '>>>' and '>>'
    function readToken_rightShift(state) {
        state.nextChar = state.input.charCodeAt(state.tokPos + 1);

        if (state.nextChar === 61) {
            state.tokPos += 2;
            finishToken(state, state._assign, ParserAPI.AssignmentOperator.right_shift);
        } else if (state.nextChar === 62) {
            state.nextChar = state.input.charCodeAt(state.tokPos + 2);
            if (state.nextChar === 61) {
                state.tokPos += 3;
                finishToken(state, state._assign, ParserAPI.AssignmentOperator.zero_fill_right_shift);
            } else {
                state.tokPos += 2;
                finishToken(state, state._bitShift, ParserAPI.BinaryOperator.zero_fill_right_shift);
            }
        } else {
            ++state.tokPos;
            finishToken(state, state._bitShift, ParserAPI.BinaryOperator.right_shift);
        }
    }

    // Read '>=' and '>'
    function readToken_greaterThan(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 62) {
            readToken_rightShift(state);
        } else {
            if (state.nextChar === 61) {
                ++state.tokPos;
                finishToken(state, state._bitShift, ParserAPI.BinaryOperator.gt_eq);
            } else {
                finishToken(state, state._relational, ParserAPI.BinaryOperator.gt);
            }
        }
        state.tokRegexpAllowed = true;
    }

    // Read '!==', '!=' and '!'
    function readToken_exclamation(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 61) {
            if (state.input.charCodeAt(state.tokPos+1) === 61) {
                state.tokPos += 2;
                finishToken(state, state._equality, ParserAPI.BinaryOperator.ex_eq_eq);
            } else {
            ++state.tokPos;
                finishToken(state, state._equality, ParserAPI.BinaryOperator.ex_eq);
            }
        } else {
            finishToken(state, state._prefix, ParserAPI.UnaryOperator.ex);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '===', '==' and '='
    function readToken_equal(state) {
        ++state.tokPos;
        state.nextChar = state.input.charCodeAt(state.tokPos);
        if (state.nextChar === 61) {
            ++state.tokPos;
            if (state.input.charCodeAt(state.tokPos) === 61) {
                ++state.tokPos;
                finishToken(state, state._equality, ParserAPI.BinaryOperator.eq_eq_eq);
            } else {
                finishToken(state, state._equality, ParserAPI.BinaryOperator.eq_eq);
            }
        } else {
            finishToken(state, state._eq, ParserAPI.AssignmentOperator.eq);
        }
        state.tokRegexpAllowed = true;
    }

    // Read '~'
    function readToken_BITWISE_NOT(state) {
        ++state.tokPos;
        finishToken(state, state._prefix, ParserAPI.UnaryOperator.BITWISE_NOT);
        state.tokRegexpAllowed = true;
    }

    // Read '0[0-9.eExX]'
    function readMaybeHex(state) {
        state.nextChar = state.input.charCodeAt(state.tokPos+1);
        if (state.nextChar === 120 || state.nextChar === 88) {
            readHexNumber(state);
        } else {
            readNumber(state);
        }
    }

    // If we are here, we either found a non-ASCII identifier
    // character, or something that's entirely disallowed.

    function readToken_default(state) {
        if (state.ch_ === 92) {
            finishToken(state, state._name, readWord_Esc(state, '', isIdentifierStart));
        } else if (isIdentifierStart[state.ch_]) {
            readWord(state);
        } else {
            raise(state, state.tokPos, 'Unexpected character \'' + String.fromCharCode(state.ch_) + '\'');
        }

    }

    function getTokenFromCode(state) {
        switch(state.ch_) {
        case 59: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._semi); break;
        case 40: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._parenL); break;
        case 41: ++state.tokPos; state.tokRegexpAllowed = false; finishToken(state, state._parenR); break;
        case 61: readToken_equal(state); break;

        case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
            readNumber(state);
            break;

        case 44: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._comma); break;

        case 48: readMaybeHex(state); break;
        case 91: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._bracketL); break;
        case 93: ++state.tokPos; state.tokRegexpAllowed = false; finishToken(state, state._bracketR); break;
        case 123: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._braceL); break;
        case 125: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._braceR); break;
        case 124: readToken_OR(state); break;
        case 62: readToken_greaterThan(state); break;
        case 58: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._colon); break;
        case 47: readToken_slash(state); break;
        case 45: readToken_minus(state); break;
        case 39: readString(state); break;

        case 63: ++state.tokPos; state.tokRegexpAllowed = true; finishToken(state, state._question); break;
        case 34: readString(state); break;
        case 46: readToken_dot(state); break;

        case 38: readToken_AND(state); break;
        case 94: readToken_XOR(state); break;
        case 60: readToken_lessThan(state); break;
        case 33: readToken_exclamation(state); break;
        case 126: readToken_BITWISE_NOT(state); break;

        case 37: readToken_modulo(state); break;
        case 42: readToken_multiply(state); break;
        case 43: readToken_plus(state); break;

        default:
            readToken_default(state);
        }
    }

    function readToken_forceRegexp(state) {
        state.tokStart = state.tokPos;
        return readRegexp(state);
    }

    function readToken(state) {
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!
        // readToken is necessarily big to avoid inlining in v8!

        // @if LOCATIONS=true
        state.tokStartLoc = new ParserAPI.node.Position(state);
        state.tokStartLoc.line = tokCurLine;
        state.tokStartLoc.column = state.tokPos - tokLineStart;
        // @endif

        if (state.tokPos >= state.inputLen) {
            finishToken(state, state._eof);
        } else {
            state.tokStart = state.tokPos;

            // Identifier or keyword. '\uXXXX' sequences are allowed in
            // identifiers, so '\' also dispatches to that.
            if (isIdentifierStart[state.ch_]===true) {
                readWord(state);
            } else {
                getTokenFromCode(state);
            }
        }
    }

    // Parse a regular expression. Some context-awareness is necessary,
    // since a '/' inside a '[]' set does not end the expression.
    // http://jsperf.com/readregexp/5

    var _flags = 0;
    var _content = '';
    var _mods = '';
    var _re = null;

    function readRegexp(state) {
        _start = state.tokPos;
        _flags = 0; // ESCAPED | IN CLASS

        for (;;) {
            state.ch_ = state.input.charCodeAt(state.tokPos);
            if (state.tokPos >= state.inputLen || state.ch_ === 10 || state.ch_ === 13 || state.ch_ === 8232 || state.ch_ === 8233) {
                raise(state, _start, 'Unterminated regular expression');
            }
            if ((_flags & 1) !== 0) { // escaped
                _flags &= 2; // escaped = false
            } else {
                if (state.ch_ === 91) { // '['
                    _flags |= 2; // inclass = true
                } else if (state.ch_ === 93 && (_flags & 2) !== 0) {
                    _flags &= 1; // inclass = false
                } else if (state.ch_ === 47 && (_flags & 2 ^ 2) !== 0) { // inclass == false
                    break;
                } else if (state.ch_ === 92) {
                    _flags |= 1; // escaped = true
                }
            }
            ++state.tokPos;
        }
        _content = state.input.substring(_start, state.tokPos);
        ++state.tokPos;

        state.tokRegexpAllowed = false;

        readWord_regexpMods(state);
        try {
            _re = new RegExp(_content, _mods);
        } catch (e) {
            if (e instanceof SyntaxError) {raise(state, _start, e.message);}
            raise(state, e);
        }
            finishToken(state, state._regexp, _re);
        }

    // Read a hex number with optionally specified length
    // Reads the numeric side of \x[0-9a-f]{2}, \u[0-9a-f]{4}, \U[0-9a-f]{8}, and 0x[0-9a-f]+
    // http://jsperf.com/readhex/4
    var _total = 0;
    var _i = 0;

    function readInt16(state, len) {
        _start=state.tokPos;
        _total=0;
        state.ch_=0;
        _i=0;

        len = len || Infinity;

        for(;_i<len;_i++,state.tokPos++) {
            state.ch_ = state.input.charCodeAt(state.tokPos);
            if (state.ch_ >= 48 && state.ch_ <= 57) {
                _total = _total * 16 +  state.ch_ - 48;
            } else if (state.ch_ >= 97 && state.ch_ <= 102) {
                _total = _total * 16 + state.ch_ - 87; // 87 = 97 - 10
            } else if (state.ch_ >= 65 && state.ch_ <= 90) {
                _total = _total * 16 + state.ch_ - 55; // 55 = 65 - 10
            }
            else break;
        }
        if (state.tokPos === _start || len !== Infinity && state.tokPos - _start !== len) {
            return -1;
        }
        return _total;
    }

    // Read 0x[0-9]+ with checks
    var _val = 0;
    function readHexNumber(state) {
        state.tokPos += 2;
        _val = readInt16(state, 0);
        if (_val === -1) {
            raise(state, state.tokStart + 2, 'Expected hexadecimal number');
        } else if (isIdentifierStart[state.input.charCodeAt(state.tokPos)]===true) {
            raise(state, state.tokPos, 'Identifier directly after number');
        } else {
            state.tokRegexpAllowed = false;
            finishToken(state, state._num, _val);
        }
    }
    // Read an integer, octal integer, or floating-point number.
    //http://jsperf.com/readnumber/3
    function readNumber(state) {
        state._numstart = state.tokPos;
        state._numflags = state.ch_ === 48 ? 8 : 0;    // FLOAT | EXP | OCTAL | ZERO-START
        state._numprev = 0;

        while(state.tokPos < state.inputLen) {
            if (state.ch_ < 48 || state.ch_ > 55) { // 0-7
                if (state.ch_ === 56 || state.ch_ === 57) { // 89
                    state._numflags |= 4;
                } else if (state.ch_ === 46) { // '.'
                    if ((state._numflags & 1) !== 0) {
                        break;
                    } else {
                        state._numflags |= 1;
                    }
                } else if (state.ch_ === 43 || state.ch_ === 45) { // '+-'
                    if (state._numprev !== 101 && state._numprev !== 69) { // 'eE'
                        break;
                    }
                } else if (state.ch_ === 101 || state.ch_ === 69) { // 'eE'
                    if ((state._numflags & 2) !== 0) {
                        raise(state, state.tokPos, 'Identifier directly after number');
                        break;
                    } else {
                        state._numflags |= 2;
                    }
                } else if (isIdentifierStart[state.input.charCodeAt(state.tokPos)]===true) {
                    if ((state._numflags & 2) !== 0) {
                        raise(state, state._numstart, 'Invalid number');
                    } else {
                        raise(state, state.tokPos, 'Identifier directly after number');
                    }
                    break;
                } else {
                    break;
                }
            }
            state._numprev = state.ch_;
            state.ch_ = state.input.charCodeAt(++state.tokPos);
        }

        if ((state._numflags & 2) !== 0 && (state._numprev === 101 || state._numprev === 69 || state._numprev === 43 || state._numprev === 45)) { // 'eE','+-'
            raise(state, state._numstart, 'Invalid number');
        }

        if ((state._numflags & 1) !== 0) {
            finishToken(state, state._num, parseFloat(state.input.substring(state._numstart, state.tokPos)));
        } else if ((state._numflags & 8) === 0 || (state.tokPos - state._numstart) === 1) {
            finishToken(state, state._num, parseFloat(state.input.substring(state._numstart, state.tokPos)) | 0);
        } else if (state.strict || (state._numflags & 4) !== 0) {
            raise(state, state._numstart, 'Invalid number');
        } else {
            finishToken(state, state._num, parseInt(state.input.substring(state._numstart, state.tokPos), 8));
        }

        state.tokRegexpAllowed = false;
    }

    // Read octal literals \000 to \377
    function readOctalLiteral(state, ch) {
        var shift = 0;
        var ret = ch - 48;

        var ch2 = state.input.charCodeAt(state.tokPos);
        if (ch2 >= 48 && ch2 <= 55) {    // 0-7
            shift = 1;
            ret = ret * 8 + ch2 - 48;

            if (ch < 52) { // '3' because value must be less than 255 overall -> 377 in octal
                var ch3 = state.input.charCodeAt(state.tokPos+1);
                if (ch3 >= 48 && ch3 <= 55) {    // 0-7
                    shift = 2;
                    ret = ret * 8 + ch3 - 48;
                }
            }
        }
        if (ret !== 0) {
            if (state.strict) raise(state, state.tokPos - 2, 'Octal literal in strict mode');
            state.tokPos += shift;
        }
        return ret;
    }

    var rs_str = '';

    // Used to read character escape sequences ('\x', '\u', '\U').
    function readHexChar(state, len) {
        _val = readInt16(state, len);
        if (_val === -1) {
            raise(state, state.tokStart, 'Bad character escape sequence');
        }
        return _val;
    }

    // Read escaped chars in strings
    // http://jsperf.com/readstring/4
    function readString_Esc(state) {
        state.ch_ = state.input.charCodeAt(++state.tokPos);
        ++state.tokPos;

        switch(state.ch_) {
            case 110: rs_str+='\n'; break;
            case 114: rs_str+='\r'; break;
            case 120: rs_str+=String.fromCharCode(readHexChar(state, 2)); break;
            case 117: rs_str+=String.fromCharCode(readHexChar(state, 4)); break;
            case 85: rs_str+=String.fromCharCode(readHexChar(state, 8)); break;
            case 116: rs_str+='\t'; break;
            case 98: rs_str+='\b'; break;
            case 118: rs_str+='\x0b'; break;
            case 102: rs_str+='\f'; break;
            case 13:
                if (state.input.charCodeAt(state.tokPos) === 10) ++state.tokPos;
                // @if LOCATIONS=true
                tokLineStart = state.tokPos;
                ++tokCurLine;
                // @endif
                break;
            case 10:
                // @if LOCATIONS=true
                tokLineStart = state.tokPos;
                ++tokCurLine;
                // @endif
                break;
            default:
                if (state.ch_ >= 48 & state.ch_ <= 55) { // 0-7 -> possible octal
                    state.ch_ = readOctalLiteral(state, state.ch_);
                }
                rs_str+=String.fromCharCode(state.ch_);
        }
    }

    // Read a string ending with a quote - either ' or "
    var _lastEsc = 0;
    var _quote = 0;
    function readString(state) {
        _quote = state.ch_;
        ++state.tokPos;
        rs_str='';

        _start = state.tokPos;
        _lastEsc = state.tokPos;
        state.ch_ = 0;

        while (state.tokPos < state.inputLen) {
            state.ch_ = state.input.charCodeAt(state.tokPos);

            if (state.ch_ === _quote) {
                if (_lastEsc === _start) {
                    rs_str = state.input.substring(_lastEsc,state.tokPos);
                } else {
                    if (_lastEsc !== state.tokPos) {
                        rs_str+=state.input.substring(_lastEsc,state.tokPos);
                    }
                }
                ++state.tokPos;
                state.tokRegexpAllowed = false;
                finishToken(state, state._string, rs_str);
                return;

            } else if (state.ch_ === 92) { // '\'
                if (_lastEsc !== state.tokPos) {
                    rs_str+=state.input.substring(_lastEsc,state.tokPos);
                }
                readString_Esc(state);
                _lastEsc = state.tokPos;

            } else if (state.ch_ === 13 || state.ch_ === 10 || state.ch_ === 8232 || state.ch_ === 8233) {
                raise(state, state.tokStart, 'Unterminated string constant');
                break;
            } else {
                ++state.tokPos;
            }
        }
        if (state.tokPos >= state.inputLen) {
            raise(state, state.tokStart, 'Unterminated string constant');
        }
    }

    // Read the mod characters which may immediately follow a RegExp
    // 'g', '\u0067', 'i', '\u0069', 'm', '\u006d', '\u006D'

    var _start2 = 0;
    function readWord_regexpMods(state) {
        _start2 = state.tokPos;
        state.ch_ = state.input.charCodeAt(state.tokPos);
        _flags = 0; // g = 1, i = 2, m = 4
        _mods = '';

        for (;state.tokPos<state.inputLen;) {
            if (state.ch_ === 103 && (_flags & 1) === 0) {
                _flags |= 1;
                _mods += 'g';
                ++state.tokPos;
            } else if (state.ch_ === 105 && (_flags & 2) === 0) {
                _flags |= 2;
                _mods += 'i';
                ++state.tokPos;
            } else if (state.ch_ === 109 && (_flags & 4) === 0) {
                _flags |= 4;
                _mods += 'm';
                ++state.tokPos;
            } else if (state.ch_ === 92) { // \u006[79Dd]
                if (
                    state.input.charCodeAt(state.tokPos+1) === 117 &&
                    state.input.charCodeAt(state.tokPos+2) === 48 &&
                    state.input.charCodeAt(state.tokPos+3) === 48 &&
                    state.input.charCodeAt(state.tokPos+4) === 54
                    ) {
                    state.ch_ = state.input.charCodeAt(state.tokPos+5);
                    if (state.ch_ === 55 && (_flags & 1) === 0) {
                        _flags |= 1;
                        _mods += 'g';
                        state.tokPos += 6;
                    } else if (state.ch_ === 57 && (_flags & 2) === 0) {
                        _flags |= 2;
                        _mods += 'i';
                        state.tokPos += 6;
                    } else if ((state.ch_ === 68 || state.ch_ === 100) && (_flags & 4) === 0) {
                        _flags |= 4;
                        _mods += 'm';
                        state.tokPos += 6;
                    } else {
                        readHexChar(state, 4);
                        raise(state, _start2, 'Invalid regexp flag');
                    }
                } else {
                    readHexChar(state, 4);
                    raise(state, _start2, 'Invalid regexp flag');
                }
            } else if (isIdentifierChar[state.ch_] === true) {
                raise(state, _start2, 'Invalid regexp flag');
            } else {
                break;
            }
            state.ch_ = state.input.charCodeAt(state.tokPos);
        }
    }

    // Slow function to build strings character by character.  Called
    // only when the quick function hits an escape char
    // http://jsperf.com/readword/3
    var _esc = 0;
    var _escStr = '';
    function readWord_Esc(state, word, identifierFn) {
        for (;state.tokPos<state.inputLen;) {
            state.ch_ = state.input.charCodeAt(state.tokPos);
            if (identifierFn[state.ch_] === true) {
                word += state.input.charAt(state.tokPos);
                ++state.tokPos;
            } else if (state.ch_ === 92) { // "\"
                if (state.input.charCodeAt(++state.tokPos) !== 117) //"u"
                    raise(state, state.tokPos, 'Expecting Unicode escape sequence \\uXXXX');
                ++state.tokPos;
                _esc = readHexChar(state, 4);
                _escStr = String.fromCharCode(_esc);
                if (_escStr === '') {
                    raise(state, state.tokPos - 1, 'Invalid Unicode escape');
                } else if (identifierFn[_esc] !== true) {
                    raise(state, state.tokPos - 4, 'Invalid Unicode escape');
                } else {
                    word += _escStr;
                }
            } else {
                break;
            }
        }
        return word;
    }

    // Read characters until one's not an allowed identifier char
    function readWord_simple(state) {
        var _start = state.tokPos;
        ++state.tokPos;
        while (state.tokPos<state.inputLen) {
            state.ch_ = state.input.charCodeAt(state.tokPos);
            if (isIdentifierChar[state.ch_]===true) ++state.tokPos;
            else if (state.ch_ === 92)
                return readWord_Esc(state, state.input.substring(_start, state.tokPos), isIdentifierChar);
            else break;
        }
        return state.input.substring(_start, state.tokPos);
    }

    // Read an identifier or keyword token. Will check for strict reserved
    // words when necessary.
    readWord = function readWord(state) {
        state.tokRegexpAllowed = false;

        state._word = readWord_simple(state);
        if (state._word.length > 1 && state._word.length < 11) {
            state.tokType = isKeyword(state);
        } else {
            state.tokType = state._name;
        }
        finishToken(state, state.tokType, state._word);
    };

    // ## Parser
    // A recursive descent parser operates by defining functions for all
    // syntactic elements, and recursively calling those, each function
    // advancing the input stream and returning an AST node. Precedence
    // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
    // instead of `(!x)[1]` is handled by the fact that the parser
    // function that parses unary prefix operators is called first, and
    // in turn calls the function that parses `[]` subscripts — that
    // way, it'll receive the node for `x[1]` already parsed, and wraps
    // *that* in the unary operator node.
    //
    // Overture uses an [operator precedence parser][opp] to handle binary
    // operator precedence, because it is much more compact than using
    // the technique outlined above, which uses different, nesting
    // functions to specify precedence, for all of the ten binary
    // precedence levels that JavaScript defines.
    //
    // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser



    // Continue to the next token.
    function next(state) {
        state.lastEnd = state.tokEnd;
        // @if LOCATIONS=true
        state.lastEndLoc = state.tokEndLoc;
        // @endif
        readToken(state);
    }

    // Enter strict mode. Re-reads the next token to please pedantic
    // tests ("use strict"; 010; -- should fail).
    function setStrict(state, strct) {
        state.strict = strct;
        state.tokPos = state.tokStart;

        // @if LOCATIONS=true
        while (state.tokPos < tokLineStart) {
            tokLineStart = state.input.lastIndexOf('\n', tokLineStart - 2) + 1;
            --tokCurLine;
        }
        // @endif

        skipSpace(state);
        readToken(state);
    }

    var _use_strict = 'use strict';

    // Test whether a statement node is the string literal `"use strict"`.
    function isUseStrict(state, stmt) {
        return state.ecmaVersion >= 5 && stmt.type === ParserAPI.type.EXPRESSION_STATEMENT &&
            stmt.expression.type === ParserAPI.type.LITERAL && stmt.expression.value === _use_strict;
    }

    // Predicate that tests whether the next token is of the given
    // type, and if yes, consumes it as a side effect.
    function eat(state, type) {
        if (state.tokType === type) {
            next(state);
            return true;
        }
        return false;
    }

    // Tests to see if a semicolon can be inserted at the current position.
    function cannotInsertSemicolon(state) {
        return state.tokType !== state._eof && state.tokType !== state._braceR && !state.newline.test(state.input.substring(state.lastEnd, state.tokStart));
    }

    function not_semicolon(state) {
        if (state.tokType === state._semi) {
            next(state);
            return false;
        } else {
            return state.tokType !== state._eof && state.tokType !== state._braceR && !state.newline.test(state.input.substring(state.lastEnd, state.tokStart));
        }
    }

    function semicolon(state) {
        if (not_semicolon(state)) unexpected(state);
    }

    // Expect a token of a given type. If found, consume it, otherwise,
    // raise an unexpected token error.

    function expect(state, type) {
        if (state.tokType === type) next(state);
        else unexpected(state);
    }

    // Raise an unexpected token error.

    function unexpected(state) {
        raise(state, state.tokStart, 'Unexpected token');
    }

    // Verify that a node is an lval — something that can be assigned
    // to.

    function checkLVal(state, expr) {
        if (expr.type === ParserAPI.type.MEMBER_EXPRESSION) {
            return;
        } else if (expr.type === ParserAPI.type.IDENTIFIER) {
            state._word = expr.name;
            if (state.strict && isStrictBadIdWord(state))
                raise(state, state.tokPos, 'Assigning to ' + expr.name + ' in strict mode');
        } else {
            raise(state, state.tokPos, 'Assigning to rvalue');
        }
    }

    // ### Statement parsing

    // Parse a program. Initializes the parser, reads any number of
    // statements, and wraps them in a Program node.    Optionally takes a
    // `program` argument.    If present, the statements will be appended
    // to its body instead of creating a new node.

    function parseTopLevel(state) {
        initTokenState(state);
        state.lastEnd = state.tokPos;
        state.inFunction = null;
        state.strict = null;
        state.labels = [];
        readToken(state);

        var node = state.program || new ParserAPI.node.Program();
        var stmt = null;
        if (state.tokType !== state._eof) {
                stmt = parseStatement(state);
                node.body.push(stmt);
                if (isUseStrict(state, stmt)) setStrict(state, true);

                while(state.tokType !== state._eof) {
                    stmt = parseStatement(state);
                    node.body.push(stmt);
                }
        }
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    var str_loop = new String('loop');
    var str_switch = new String('switch');

    var loopLabel = {kind: str_loop};
    var switchLabel = {kind: str_switch};


    // Verifies that there is an actual destination to break or
    // continue to.
    function check_label_exists_break(state, label, starttype) {
        var i=0;
        var leni = state.labels.length;

        for (; i < leni; ++i) {
            var lab = state.labels[i];
            if (label === null || lab.name === label.name) {
                break;
            }
        }
        if (i === leni) raise(state, state.tokPos, 'Unsyntactic ' + starttype.keyword);
    }

    // Parse 'break' either from loop or switch
    function parse_BreakStatement(state) {
        var starttype = state.tokType;
        var node = new ParserAPI.node.BreakStatement();
        next(state);

        if (not_semicolon(state)) {
            if (state.tokType !== state._name) unexpected(state);
            else {
                node.label = parse_Identifier(state);
                semicolon(state);
            }
        }
        check_label_exists_break(state, node.label, starttype);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Verifies that there is an actual destination to break or
    // continue to.
    function check_label_exists_continue(state, label, starttype) {
        var i=0;
        var leni = state.labels.length;
        var lab;

        for (; i < leni; ++i) {
            lab = state.labels[i];
            if (label === null || lab.name === label.name) {
                if (lab.kind !== null && (lab.kind === str_loop)) break;
            }
        }
        if (i === leni) raise(state, state.tokPos, 'Unsyntactic ' + starttype.keyword);
    }

    // Parse 'continue' either in loop
    function parse_ContinueStatement(state) {
        var starttype = state.tokType;
        var node = new ParserAPI.node.ContinueStatement();
        next(state);

        if (not_semicolon(state)) {
            if (state.tokType !== state._name) unexpected(state);
            else {
                node.label = parse_Identifier(state);
                semicolon(state);
            }
        }
        check_label_exists_continue(state, node.label, starttype);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'debugger'
    function parse_DebuggerStatement(state) {
        var node = new ParserAPI.node.DebuggerStatement();
        next(state);
        semicolon(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'do { } while()'
    function parse_DoWhileStatement(state) {
        var node = new ParserAPI.node.DoWhileStatement();
        next(state);
        state.labels.push(loopLabel);
        node.body = parseStatement(state);
        state.labels.pop();
        if(state.tokType !== state._while) { unexpected(state); }
        next(state);
        node.test = parseParenExpression(state);
        semicolon(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'for (;;) {}' and 'for ( in ) {}'
    // Disambiguating between a `for` and a `for`/`in` loop is
    // non-trivial. Basically, we have to parse the init `var`
    // statement or expression, disallowing the `in` operator (see
    // the second parameter to `parseExpression`), and then check
    // whether the next token is `in`. When there is no init part
    // (semicolon immediately after the opening parenthesis), it is
    // a regular `for` loop.

    function parseStatement_for(state) {
        var init = null;
        var node = null;
        // @if LOCATIONS=true
        var loc = new ParserAPI.node.SourceLocation();
        loc.start = state.tokStartLoc;
        loc.source = sourceFile;
        // @endif
        next(state);
        state.labels.push(loopLabel);
        if(state.tokType !== state._parenL) { unexpected(state); }
        next(state);
        if (state.tokType === state._semi) {
            node = parse_ForStatement(state);
        } else if (state.tokType === state._var || state.tokType === state._let) {
            init = new ParserAPI.node.VariableDeclaration(state);
            next(state);
            parseVar(state, init, true);
            // @if LOCATIONS=true
            init.loc.end = state.lastEndLoc;
            // @endif

            if (init.declarations.length === 1) {
                if(state.tokType === state._in) {
                    next(state);
                    node = parse_ForInStatement(state);
                    node.left = init;
                // } else if(state.tokType === state._of) {
                //     next(state);
                //     node = parse_ForOfStatement(state);
                //     node.left = init;
                } else {
                    node = parse_ForStatement(state);
                    node.init = init;
                }
            } else {
                node = parse_ForStatement(state);
                node.init = init;
            }
        } else {
            init = parseExpression(state, true);
            if(state.tokType === state._in) {
                next(state);
                checkLVal(state, init);
                node = parse_ForInStatement(state);
                node.left = init;
            // } else if(state.tokType === state._of) {
            //     next(state);
            //     checkLVal(state, init);
            //     node = parse_ForOfStatement(state);
            //     node.left = init;
            } else {
                node = parse_ForStatement(state);
                node.init = init;
            }
        }
        state.labels.pop();
        // @if LOCATIONS=true
        node.loc.start = loc.start;
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'function'
    function parse_Function(state) {
        var node = new ParserAPI.node.FunctionDeclaration();
        next(state);
        if (state.tokType !== state._name) unexpected(state);
        return parseFunction(state, node);
    }

    // Parse 'if() {}'
    function parse_IfStatement(state) {
        var node = new ParserAPI.node.IfStatement();
        next(state);
        node.test = parseParenExpression(state);
        node.consequent = parseStatement(state);
        if(state.tokType === state._else) {
            next(state);
            node.alternate = parseStatement(state);
        }
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'return'
    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    function parse_ReturnStatement(state) {
        if (state.inFunction) {
            var node = new ParserAPI.node.ReturnStatement();
            next(state);
            if (not_semicolon(state)) {
                node.argument = parseExpression(state, false);
                semicolon(state);
            }
            // @if LOCATIONS=true
            node.loc.end = state.lastEndLoc;
            // @endif
            return node;
        } else  {
            raiseReturnOutsideFunction(state);
        }
    }

    // Parse 'switch() {<case:>* <default:>?}'
    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    function parse_SwitchStatement(state) {
        var node = new ParserAPI.node.SwitchStatement();
        var cur = null, sawDefault = false;
        next(state);
        node.discriminant = parseParenExpression(state);
        if(state.tokType !== state._braceL) { unexpected(state); }
        next(state);
        state.labels.push(switchLabel);

        for (;;) {
            if (state.tokType === state._braceR) {
                next(state);
                break;

            } else if (state.tokType === state._case) {
                cur = new ParserAPI.node.SwitchCase();
                node.cases.push(cur);
                next(state);
                cur.test = parseExpression(state, false);
                if(state.tokType !== state._colon) { unexpected(state); }
                next(state);

            } else if (state.tokType === state._default) {
                if (sawDefault) {
                    raise(state, state.lastStart, 'Multiple default clauses');
                } else {
                    sawDefault = true;
                    cur = new ParserAPI.node.SwitchCase();
                    node.cases.push(cur);
                    next(state);
                    if(state.tokType !== state._colon) { unexpected(state); }
                    next(state);
                }

            } else {
                if (cur === null) unexpected(state);
                cur.consequent.push(parseStatement(state));
            }
            // @if LOCATIONS=true
            if(cur !== null) {
                cur.loc.end = state.lastEndLoc;
            }
            // @endif
        }
        state.labels.pop();
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'throw'
    function parse_ThrowStatement(state) {
        var node = new ParserAPI.node.ThrowStatement();
        next(state);
        if(state.newline.test(state.input.substring(state.lastEnd, state.tokStart)))
            raise(state, state.lastEnd, 'Illegal newline after throw');
        node.argument = parseExpression(state, false);
        semicolon(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'try {} catch() {}', 'try {} finally {}', 'try {} catch() {} finally {}'
    function parse_TryStatement(state) {
        var node = new ParserAPI.node.TryStatement();
        next(state);
        node.block = parse_BlockStatement(state);

        if (state.tokType === state._catch) {
            var clause = new ParserAPI.node.CatchClause();
            next(state);
            if(state.tokType !== state._parenL) { unexpected(state); }
            next(state);
            clause.param = parse_Identifier(state);
            state._word = clause.param.name;
            if (state.strict && isStrictBadIdWord(state))
                raise(state, state.tokPos, 'Binding ' + clause.param.name + ' in strict mode');
            if(state.tokType !== state._parenR) { unexpected(state); }
            next(state);
            clause.body = parse_BlockStatement(state);
            // @if LOCATIONS=true
            clause.loc.end = state.lastEndLoc;
            // @endif
            node.handler = clause;
        }

        if(state.tokType === state._finally) {
            next(state);
            node.finalizer = parse_BlockStatement(state);
        }

        if (node.handler === null && node.finalizer === null)
            raise(state, state.tokPos, 'Missing catch or finally clause');

        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'var'
    function parseStatement_var(state) {
        var node = new ParserAPI.node.VariableDeclaration(state);
        next(state);
        parseVar(state, node, false);
        semicolon(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'while() {}'
    function parse_WhileStatement(state) {
        var node = new ParserAPI.node.WhileStatement();
        next(state);
        node.test = parseParenExpression(state);
        state.labels.push(loopLabel);
        node.body = parseStatement(state);
        state.labels.pop();
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse 'with () {}'
    function parse_WithStatement(state) {
        var node = new ParserAPI.node.WithStatement();
        if (state.strict) raise(state, state.tokStart, '\'with\' in strict mode');
        next(state);
        node.object = parseParenExpression(state);
        node.body = parseStatement(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse an empty statement, i.e. a solitary semicolon
    function parse_EmptyStatement(state) {
        var node = new ParserAPI.node.EmptyStatement();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.

    function parse_maybeLabeledStatement(state) {
        var starttype = state.tokType;
        var i;
        var leni;
        var node = null;
        var label = null;
        var maybeName = state.tokVal;
        var expr = parseExpression(state, false);

        if (starttype === state._name && expr.type === ParserAPI.type.IDENTIFIER && state.tokType === state._colon) {
            next(state);
            node = new ParserAPI.node.LabeledStatement();
            for (i = 0, leni = state.labels.length; i < leni; ++i)
                if (state.labels[i].name === maybeName) raise(state, state.tokPos, 'Label \'' +maybeName+ '\' is already declared');
            label = new Label(maybeName);
            switch(state.tokType) {
                case state._do:
                case state._for:
                case state._while:
                    label.kind = str_loop;
                    break;
                case state._switch:
                    label.kind = str_switch;
                    break;
            }
            state.labels.push(label);
            node.body = parseStatement(state);
            state.labels.pop();
            node.label = expr;
        } else {
            node = new ParserAPI.node.ExpressionStatement();
            node.expression = expr;
            semicolon(state);
        }
        // @if LOCATIONS=true
        node.loc.start = expr.loc.start;
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;

    }

    function parse_ExpressionStatement(state) {
        var node = new ParserAPI.node.ExpressionStatement();
        node.expression = parseExpression(state, false);
        semicolon(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }


    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.
    // Defaults include: state._incdec, state._string, state._new, state._bracketL
    function parseStatement(state) {
        switch (state.tokType) {
            case state._name: return parse_maybeLabeledStatement(state);
            case state._braceL: return parse_BlockStatement(state);
            case state._if: return parse_IfStatement(state);
            case state._var: return parseStatement_var(state);
            case state._return: return parse_ReturnStatement(state);
            case state._this: return parse_ExpressionStatement(state);
            case state._function: return parse_Function(state);
            case state._break: return parse_BreakStatement(state);
            case state._for: return parseStatement_for(state);
            case state._while: return parse_WhileStatement(state);
            case state._do: return parse_DoWhileStatement(state);
            case state._throw: return parse_ThrowStatement(state);
            case state._try: return parse_TryStatement(state);
            case state._parenL: return parse_ExpressionStatement(state);
            case state._continue: return parse_ContinueStatement(state);
            case state._delete: return parse_ExpressionStatement(state);
            case state._semi: return parse_EmptyStatement(state);
            case state._switch: return parse_SwitchStatement(state);

            case state._debugger: return parse_DebuggerStatement(state);
            case state._let: return parseStatement_var(state);
            case state._const: return parseStatement_var(state);
            case state._with: return parse_WithStatement(state);
            case state._slash:
                readToken_forceRegexp(state);
                return parse_ExpressionStatement(state);
            default:
                return parse_ExpressionStatement(state);
        }
    }


    // Used for constructs like `switch` and `if` that insist on
    // parentheses around their expression.

    function parseParenExpression(state) {
        if(state.tokType !== state._parenL) { unexpected(state); }
        next(state);
        var val = parseExpression(state, false);
        if(state.tokType !== state._parenR) { unexpected(state); }
        next(state);
        return val;
    }

    // Parse a semicolon-enclosed block of statements, handling `"use
    // strict"` declarations when `allowStrict` is true (used for
    // function bodies).

    function parse_BlockStatement(state) {
        var node = new ParserAPI.node.BlockStatement();
        var _strict = false;
        var oldStrict;
        if(state.tokType !== state._braceL) { unexpected(state); }
        next(state);
        if (state.tokType !== state._braceR) {
            for(;;) {
                var stmt = parseStatement(state);
                node.body.push(stmt);
                if (isUseStrict(state, stmt)) {
                    oldStrict = _strict;
                    setStrict(state, _strict = true);
                }
                if (state.tokType === state._braceR) {
                    next(state);
                    break;
                }
            }
        } else {
            next(state);
        }
        if (_strict && !oldStrict) setStrict(state, false);

        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse a regular `for` loop. The disambiguation code in
    // `parseStatement` will already have parsed the init statement or
    // expression.

    function parse_ForStatement(state) {
        var node = new ParserAPI.node.ForStatement();
        if(state.tokType !== state._semi) { unexpected(state); }
        next(state);
        if (state.tokType !== state._semi) node.test = parseExpression(state, false);
        if(state.tokType !== state._semi) { unexpected(state); }
        next(state);
        if (state.tokType !== state._parenR) node.update = parseExpression(state, false);
        if(state.tokType !== state._parenR) { unexpected(state); }
        next(state);
        node.body = parseStatement(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse a 'for ( in ) {}' loop.
    function parse_ForInStatement(state) {
        var node = new ParserAPI.node.ForInStatement();
        node.right = parseExpression(state, false);
        if(state.tokType !== state._parenR) { unexpected(state); }
        next(state);
        node.body = parseStatement(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse a 'for ( of ) {}' loop.
    function parse_ForOfStatement(state) {
        var node = new ParserAPI.node.ForOfStatement();
        node.right = parseExpression(state, false);
        if(state.tokType !== state._parenR) { unexpected(state); }
        next(state);
        node.body = parseStatement(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse a list of variable declarations.
    function parseVar(state, node, noIn) {
        for (;;) {
            var decl = new ParserAPI.node.VariableDeclarator();
            decl.id = parse_Identifier(state);
            state._word = decl.id.name;
            if (state.strict && isStrictBadIdWord(state))
                raise(state, state.tokPos, 'Binding ' + decl.id.name + ' in strict mode');
            if (state.tokType === state._eq) {
                next(state);
                decl.init = parseMaybeAssign(state, noIn);
            } else if(node.kind === state._const) {
                unexpected(state);
            }
            // @if LOCATIONS=true
            decl.loc.end = state.lastEndLoc;
            // @endif
            node.declarations.push(decl);
            if (state.tokType !== state._comma) break;
            next(state);
        }
    }

    // ### Expression parsing

    // These nest, from the most general expression type at the top to
    // 'atomic', nondivisible expression types at the bottom. Most of
    // the functions will simply let the function(s) below them parse,
    // and, *if* the syntactic construct they handle is present, wrap
    // the AST node that the inner parser gave them in another node.

    // Parse a full expression. The arguments are used to forbid comma
    // sequences (in argument lists, array literals, or object literals)
    // or the `in` operator (in for loops initalization expressions).

    function parseExpression(state, noIn) {
        var expr = parseMaybeAssign(state, noIn);
        if (state.tokType === state._comma) {
            var node = new ParserAPI.node.SequenceExpression();
            node.expressions.push(expr);
            while (state.tokType === state._comma) {
                next(state);
                node.expressions.push(parseMaybeAssign(state, noIn));
            }
            // @if LOCATIONS=true
            node.loc.start = expr.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return node;
        }
        return expr;
    }

    // Parse an assignment expression. This includes applications of
    // operators like `+=`.

    function parseMaybeAssign(state, noIn) {
        var left = parseMaybeConditional(state, noIn);
        if (state.tokType.isAssign) {
            var node = new ParserAPI.node.AssignmentExpression();
            node.operator = state.tokVal;
            node.left = left;
            next(state);
            node.right = parseMaybeAssign(state, noIn);
            checkLVal(state, left);
            // @if LOCATIONS=true
            node.loc.start = left.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return node;
        }
        return left;
    }

    // Parse a ternary conditional (`?:`) operator.

    function parseMaybeConditional(state, noIn) {
        var expr = parseExprOp(state, parseMaybeUnary(state), state._bin_minop, noIn);
        if (state.tokType === state._question) {
            next(state);
            var node = new ParserAPI.node.ConditionalExpression();
            node.test = expr;
            node.consequent = parseMaybeAssign(state, false);
            if(state.tokType !== state._colon) { unexpected(state); }
            next(state);
            node.alternate = parseMaybeAssign(state, noIn);
            // @if LOCATIONS=true
            node.loc.start = expr.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return node;
        }
        return expr;
    }

    // Start the precedence parser.

    // Parse binary operators with the operator precedence parsing
    // algorithm. `left` is the left-hand side of the operator.
    // `minPrec` provides context that allows the function to stop and
    // defer further parser to one of its callers when it encounters an
    // operator that has a lower precedence than the set it is parsing.

    function parseExprOp(state, left, minTokType, noIn) { // what to do about this garbage producing noIn?
        var node = null;
        var curTokType = state.tokType;

        if (curTokType.precedence !== 0 && curTokType.precedence > minTokType.precedence && (!noIn || state.tokType !== state._in)) {

            if (state.tokVal === ParserAPI.LogicalOperator.AND || state.tokVal === ParserAPI.LogicalOperator.OR) {
                node = new ParserAPI.node.LogicalExpression();
            } else {
                node = new ParserAPI.node.BinaryExpression();
            }
            node.left = left;
            node.operator = state.tokVal;
            next(state);
            node.right = parseExprOp(state, parseMaybeUnary(state), curTokType, noIn);
            // @if LOCATIONS=true
            node.loc.start = node.left.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseExprOp(state, node, minTokType, noIn);
        }
        return left;
    }

    // Parse unary operators, both prefix and postfix.

    var _delete_str = 'delete';

    function parseMaybeUnary(state) {
        var node = null;
        if (state.tokType.prefix) {
            if (state.tokType === state._incdec) {
                node = new ParserAPI.node.UpdateExpression();
                node.operator = state.tokVal;
                state.tokRegexpAllowed = true;
                next(state);
                node.argument = parseMaybeUnary(state);
                checkLVal(state, node.argument);
            } else {
                node = new ParserAPI.node.UnaryExpression();
                node.operator = state.tokVal;
                state.tokRegexpAllowed = true;
                next(state);
                node.argument = parseMaybeUnary(state);
                if (state.strict && node.operator === _delete_str &&
                             node.argument.type === ParserAPI.type.IDENTIFIER)
                raise(state, state.tokPos, 'Deleting local variable in strict mode');
            }
        } else {
            var expr = parseExprSubscripts(state);
            while (state.tokType === state._incdec && cannotInsertSemicolon(state)) {
                node = new ParserAPI.node.UpdateExpression();
                // @if LOCATIONS=true
                node.loc.start = expr.loc.start;
                // @endif
                node.operator = state.tokVal;
                node.prefix = false;
                node.argument = expr;
                checkLVal(state, expr);
                next(state);
                expr = node;
            }
            node = expr;
        }
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse call, dot, and `[]`-subscript expressions.

    function parseExprSubscripts(state) {
        return parseSubscripts(state, parseExprAtom(state));
    }

    function parseSubscripts(state, base) {
        var node = null;
        if (state.tokType === state._dot) {
            next(state);
            node = new ParserAPI.node.MemberExpression();
            node.object = base;
            node.computed = false;
            node.property = parse_Identifier_liberal(state);
            // @if LOCATIONS=true
            node.loc.start = base.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseSubscripts(state, node);

        } else if (state.tokType === state._bracketL) {
            next(state);
            node = new ParserAPI.node.MemberExpression();
            node.object = base;
            node.computed = true;
            node.property = parseExpression(state, false);
            if(state.tokType !== state._bracketR) { unexpected(state); }
            next(state);
            // @if LOCATIONS=true
            node.loc.start = base.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseSubscripts(state, node);

        } else if (state.tokType === state._parenL) {
            next(state);
            node = new ParserAPI.node.CallExpression(base);
            parse_ExpressionList(state, node.arguments);
            // @if LOCATIONS=true
            node.loc.start = base.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseSubscripts(state, node);

        } else {
            return base;
        }
    }

    function parseSubscripts_nocalls(state, base) {
        var node = null;
        if (state.tokType === state._dot) {
            next(state);
            node = new ParserAPI.node.MemberExpression();
            node.object = base;
            node.computed = false;
            node.property = parse_Identifier_liberal(state);
            // @if LOCATIONS=true
            node.loc.start = base.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseSubscripts_nocalls(state, node);

        } else if (state.tokType === state._bracketL) {
            next(state);
            node = new ParserAPI.node.MemberExpression();
            node.object = base;
            node.computed = true;
            node.property = parseExpression(state, false);
            if(state.tokType !== state._bracketR) { unexpected(state); }
            next(state);
            // @if LOCATIONS=true
            node.loc.start = base.loc.start;
            node.loc.end = state.lastEndLoc;
            // @endif
            return parseSubscripts_nocalls(state, node);

        } else {
            return base;
        }
    }

    // Parse an atomic expression — either a single token that is an
    // expression, an expression started by a keyword like `function` or
    // `new`, or an expression wrapped in punctuation like `()`, `[]`,
    // or `{}`.

    function parse_ThisExpression(state) {
        var node = new ParserAPI.node.ThisExpression();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_Literal_Number(state) {
        var node = new ParserAPI.node.LiteralNumber();
        node.value = state.tokVal;
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_Literal_String(state) {
        var node = new ParserAPI.node.LiteralString();
        node.value = state.tokVal;
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_Literal_Regexp(state) {
        var node = new ParserAPI.node.LiteralRegExp();
        node.value = state.tokVal;
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_Literal_Null(state) {
        var node = new ParserAPI.node.LiteralNull();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }
    function parse_Literal_True(state) {
        var node = new ParserAPI.node.LiteralTrue();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }
    function parse_Literal_False(state) {
        var node = new ParserAPI.node.LiteralFalse();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parseExprAtom_parenL(state) {
        // @if LOCATIONS=true
        var tokStartLoc1 = state.tokStartLoc;
        // @endif
        next(state);
        var val = parseExpression(state, false);
        // @if LOCATIONS=true
        val.loc.start = tokStartLoc1;
        val.loc.end = state.tokEndLoc;
        // @endif
        if(state.tokType !== state._parenR) { unexpected(state); }
        next(state);
        return val;
    }

    function parse_ArrayExpression(state) {
        var node = new ParserAPI.node.ArrayExpression();
        next(state);
        parse_ArrayExpressionList(state, node.elements);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_FunctionExpression(state) {
        var node = new ParserAPI.node.FunctionExpression();
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return parseFunction(state, node);
    }

    function parseExprAtom(state) {
        switch (state.tokType) {
            case state._name: return parse_Identifier(state);
            case state._num: return parse_Literal_Number(state);
            case state._this: return parse_ThisExpression(state);
            case state._parenL: return parseExprAtom_parenL(state);
            case state._string: return parse_Literal_String(state);
            case state._function: return parse_FunctionExpression(state);
            case state._braceL: return parse_ObjectExpression(state);
            case state._bracketL: return parse_ArrayExpression(state);
            case state._new: return parse_NewExpression(state);
            case state._null: return parse_Literal_Null(state);
            case state._true: return parse_Literal_True(state);
            case state._false: return parse_Literal_False(state);
            case state._regexp: return parse_Literal_Regexp(state);

            default:
                unexpected(state);
        }
    }

    // New's precedence is slightly tricky. It must allow its argument
    // to be a `[]` or dot subscript expression, but not a call — at
    // least, not without wrapping it in parentheses. Thus, it uses the

    function parse_NewExpression(state) {
        var node = new ParserAPI.node.NewExpression();
        next(state);
        node.callee = parseSubscripts_nocalls(state, parseExprAtom(state, false));
        if (state.tokType === state._parenL) {
            next(state);
            parse_ExpressionList(state, node.arguments);
        }
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse an object literal.

    function parsePropertyName(state) {
        if (state.tokType === state._string || state.tokType === state._num) {
            return parseExprAtom(state);
        } else {
            return parse_Identifier_liberal(state);
        }
    }

    // getters and setters are not allowed to clash — either with
    // each other or with an init property — and in strict mode,
    // init properties are also not allowed to be repeated.

    function parseGetterOrSetter(state, prop) {
        if (state.ecmaVersion >= 5 && prop.key.type === ParserAPI.type.IDENTIFIER) {
            if (prop.key.name === 'get') {
                prop.kind = state.PropertyKind.get;
                prop.key = parsePropertyName(state);
                if (state.tokType !== state._parenL) unexpected(state);
                prop.value = parseFunction(state, new ParserAPI.node.FunctionExpression());
            } else if (prop.key.name === 'set') {
                prop.kind = state.PropertyKind.set;
                prop.key = parsePropertyName(state);
                if (state.tokType !== state._parenL) unexpected(state);
                prop.value = parseFunction(state, new ParserAPI.node.FunctionExpression());
            } else unexpected(state);
        } else unexpected(state);
    }

    function validateObjectProperties(state, props) {
        var prop, other, i=0, j=0, len = props.length;

        for(;j<len;j++) {
            prop = props[j];
            if (prop.key.type === ParserAPI.type.IDENTIFIER) {
                for (i=j+1;i<len;i++) {
                    other = props[i];
                    if (other.key.type === ParserAPI.type.IDENTIFIER && other.key.name === prop.key.name) {
                        if (
                            (prop.kind === other.kind && (state.strict || prop.kind !== state.PropertyKind.init)) ||
                            (other.kind === state.PropertyKind.init && prop.kind !== state.PropertyKind.init) ||
                            (prop.kind === state.PropertyKind.init && other.kind !== state.PropertyKind.init)
                            ) {
                                raise(state, state.tokPos, 'Redefinition of property');
                            }
                    }
                }
            }
        }
    }

    function parse_ObjectExpression(state) {
        var node = new ParserAPI.node.ObjectExpression();
        next(state);

        if (state.tokType !== state._braceR) {
            for(;;) {
                var prop = new ObjectExpressionProp(state);
                prop.key = parsePropertyName(state);

                if (state.tokType === state._colon) {
                    next(state);
                    prop.value = parseMaybeAssign(state, false);
                    prop.kind = state.PropertyKind.init;
                } else {
                    parseGetterOrSetter(state, prop);
                }

                node.properties.push(prop);
                if (state.tokType === state._braceR) {
                    break;
                }
                if(state.tokType !== state._comma) { unexpected(state); }
                next(state);
                if (state.allowTrailingCommas && state.tokType === state._braceR) {
                    break;
                }
            }
        }

        next(state);
        validateObjectProperties(state, node.properties);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    // Parse a function declaration or literal
    function parseFunction(state, node) {
        if (state.tokType === state._name) node.id = parse_Identifier(state);

        if(state.tokType !== state._parenL) { unexpected(state); }

        next(state);

        if (state.tokType !== state._parenR) {
            for(;;) {
                if (state.ecmaVersion >= 6 && state.tokType === state._ellipsis) {
                    next(state);
                    node.rest = parse_Identifier(state);
                    if(state.tokType !== state._parenR) {
                        unexpected(state);
                    }
                    break;
                } else {
                    node.params.push(parse_Identifier(state));
                    if (state.tokType === state._parenR) {
                        break;
                    } else {
                        if(state.tokType !== state._comma) { unexpected(state); }
                        next(state);
                    }
                }
            }
        }
        next(state);

        // Start a new scope with regard to state.labels and the `state.inFunction`
        // flag (restore them to their old value afterwards).
        var oldInFunc = state.inFunction, oldLabels = state.labels;
        state.inFunction = true; state.labels = [];
        node.body = parse_BlockStatement(state);
        state.inFunction = oldInFunc; state.labels = oldLabels;

        // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.
        if (state.strict || node.body.body.length && isUseStrict(state, node.body.body[0])) {
            // Negative indices are used to reuse loop body for node.rest and node.id
            for (var i = -2, id; i < node.params.length; ++i) {
                if (i >= 0) {
                    id = node.params[i];
                } else if (i === -2) {
                    if (node.rest) id = node.rest;
                    else continue;
                } else {
                    if (node.id) id = node.id;
                    else continue;
                }
                state._word = id.name;
                if (isStrictReservedWord(state) || isStrictBadIdWord(state))
                    raise(state, state.tokPos, 'Defining \'' +id.name+ '\' in strict mode');
                if (i >= 0) for (var j = 0; j < i; ++j) if (id.name === node.params[j].name)
                    raise(state, state.tokPos, 'Argument name clash in strict mode');
            }
        }
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif

        return node;
    }

    // Parses a comma-separated list of expressions, and returns them as
    // an array. `close` is the token type that ends the list, and
    // `allowEmpty` can be turned on to allow subsequent commas with
    // nothing in between them to be parsed as `null` (which is needed
    // for array literals).

    function parse_ArrayExpressionList(state, list) {
        if (state.tokType !== state._bracketR) {
            for(;;) {
                if (state.tokType === state._comma) {
                    list.push(null);
                } else {
                    list.push(parseMaybeAssign(state, false));
                }

                if (state.tokType === state._bracketR) {
                    break;
                }

                if(state.tokType !== state._comma) { unexpected(state); }

                next(state);

                if (state.allowTrailingCommas && state.tokType === state._bracketR) {
                    break;
                }
            }
        }
        next(state);
    }

    function parse_ExpressionList(state, list) {
        if (state.tokType !== state._parenR) {
            for(;;) {
                list.push(parseMaybeAssign(state, false));
                if (state.tokType === state._parenR) {
                    break;
                } else {
                    if(state.tokType !== state._comma) { unexpected(state); }
                    next(state);
                }
            }
        }
        next(state);
    }

    // Parse the next token as an identifier. If `liberal` (used
    // when parsing properties), it will also convert keywords into
    // identifiers.

    function parse_Identifier_liberal(state) {
        var node = new ParserAPI.node.Identifier();
        node.name = state.tokType === state._name ? state.tokVal : (!state.forbidReserved && state.tokType.keyword) || unexpected(state);
        state.tokRegexpAllowed = false;
        next(state);
        // @if LOCATIONS=true
        node.loc.end = state.lastEndLoc;
        // @endif
        return node;
    }

    function parse_Identifier(state) {
        if (state.tokType !== state._name) {
            unexpected(state);
        } else {
            var node = new ParserAPI.node.Identifier();
            node.name = state.tokVal;
            state.tokRegexpAllowed = false;
            next(state);
            // @if LOCATIONS=true
            node.loc.end = state.lastEndLoc;
            // @endif
            return node;
        }
    }
});
