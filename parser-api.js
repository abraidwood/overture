/* jshint -W053, strict:true, eqeqeq:true, quotmark:single, undef:true, unused:true, trailing:true  */
/* global  exports, module, define */

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

    // The type field is a string representing the AST variant type. Each subtype of Node is documented below with the specific string of its type field. You can use this field to determine which interface a node implements.
    var nodes = {

        // ### Programs

        'Program': function Program() {
            this.type = types.PROGRAM;
            this.body = [];                     // [ Statement ]
            this.loc = null;                    // SourceLocation | null
        },
        // A complete program source tree.

        'SourceLocation': function SourceLocation() {
            this.start = null;                  // Position
            this.end = null;                    // Position
            this.source = null;                 // string | null
        },
        // The loc field represents the source location information of the node. If the parser produced no information about the node's source location, the field is null; otherwise it is an object consisting of a start position (the position of the first character of the parsed source region) and an end position (the position of the first character after the parsed source region):

        // Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
        'Position': function Position() {
            this.line = 1;                      // number >= 1
            this.column = 0;                    // number >= 0
        },

        // ### Statements

        'EmptyStatement': function EmptyStatement() {
            this.type = types.EMPTY_STATEMENT;
            this.loc = null;                    // SourceLocation | null
        },
        // An empty statement, i.e., a solitary semicolon.

        'BlockStatement': function BlockStatement() {
            this.type = types.BLOCK_STATEMENT;
            this.body = [];                     // [ Statement ]
            this.loc = null;                    // SourceLocation | null
        },
        // A block statement, i.e., a sequence of statements surrounded by braces.

        'ExpressionStatement': function ExpressionStatement() {
            this.type = types.EXPRESSION_STATEMENT;
            this.expression = null;             // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // An expression statement, i.e., a statement consisting of a single expression.

        'IfStatement': function IfStatement() {
            this.type = types.IF_STATEMENT;
            this.test = null;                   // Expression
            this.consequent = null;             // Statement
            this.alternate = null;              // Statement | null
            this.loc = null;                    // SourceLocation | null
        },
        // An if statement.

        'LabeledStatement': function LabeledStatement() {
            this.type = types.LABELED_STATEMENT;
            this.label = null;                  // Identifier
            this.body = null;                   // Statement
            this.loc = null;                    // SourceLocation | null
        },
        // A labeled statement, i.e., a statement prefixed by a break/continue label.

        'BreakStatement': function BreakStatement() {
            this.type = types.BREAK_STATEMENT;
            this.label = null;                  // Identifier | null
            this.loc = null;                    // SourceLocation | null
        },
        // A break statement.

        'ContinueStatement': function ContinueStatement() {
            this.type = types.CONTINUE_STATEMENT;
            this.label = null;                  // Identifier | null
            this.loc = null;                    // SourceLocation | null
        },
        // A continue statement.

        'WithStatement': function WithStatement() {
            this.type = types.WITH_STATEMENT;
            this.object = null;                 // Expression
            this.body = null;                   // Statement
            this.loc = null;                    // SourceLocation | null
        },
        // A with statement.

        'SwitchStatement': function SwitchStatement() {
            this.type = types.SWITCH_STATEMENT;
            this.discriminant = null;           // Expression
            this.cases = [];                    // [ SwitchCase ]
            this.lexical = false;               // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // A switch statement. The lexical flag is metadata indicating whether the switch statement contains any unnested let declarations (and therefore introduces a new lexical scope).

        'ReturnStatement': function ReturnStatement() {
            this.type = types.RETURN_STATEMENT;
            this.argument = null;               // Expression | null
            this.loc = null;                    // SourceLocation | null
        },
        // A return statement.

        'ThrowStatement': function ThrowStatement() {
            this.type = types.THROW_STATEMENT;
            this.argument = null;               // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A throw statement.

        'TryStatement': function TryStatement() {
            this.type = types.TRY_STATEMENT;
            this.block = null;                  // BlockStatement
            this.handler = null;                // CatchClause | null
            this.finalizer = null;              // BlockStatement | null
            this.loc = null;                    // SourceLocation | null
        },
        // A try statement.

        'WhileStatement': function WhileStatement() {
            this.type = types.WHILE_STATEMENT;
            this.body = null;                   // Statement
            this.test = null;                   // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A while statement

        'DoWhileStatement': function DoWhileStatement() {
            this.type = types.DOWHILE_STATEMENT;
            this.body = null;                   // Statement
            this.test = null;                   // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A do/while statement.

        'ForStatement': function ForStatement() {
            this.type = types.FOR_STATEMENT;
            this.init = null;                   // VariableDeclaration | Expression | null
            this.test = null;                   // Expression | null
            this.update = null;                 // Expression | null
            this.body = null;                   // Statement
            this.loc = null;                    // SourceLocation | null
        },
        // A for statement.

        'ForInStatement': function ForInStatement() {
            this.type = types.FORIN_STATEMENT;
            this.left = null;                   // VariableDeclaration |  Expression
            this.right = null;                  // Expression
            this.body = null;                   // Statement
            this.loc = null;                    // SourceLocation | null
        },
        // A for/in statement, or, if each is true, a for each/in statement.

        'ForOfStatement': function ForOfStatement() {
            this.type = types.FOROF_STATEMENT;
            this.left = null;                   // VariableDeclaration |  Expression
            this.right = null;                  // Expression
            this.body = null;                   // Statement
            this.loc = null;                    // SourceLocation | null
        },
        // A for/of statement.

        'DebuggerStatement': function DebuggerStatement() {
            this.type = types.DEBUGGER_STATEMENT;
            this.loc = null;                    // SourceLocation | null
        },
        // A debugger statement.

        // ### Declarations

        'FunctionDeclaration': function FunctionDeclaration() {
            this.type = types.FUNCTION_DECLARATION;
            this.id = null;                     // Identifier
            this.params = [];                   // [ Pattern ]
            this.defaults = [];                 // [ Expression ]
            this.rest = null;                   // Identifier | null
            this.body = null;                   // BlockStatement | Expression
            this.expression = false;            // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // A function declaration.
        // Note: The id field cannot be null.

        'VariableDeclaration': function VariableDeclaration(state) {
            this.type = types.VARIABLE_DECLARATION;
            this.declarations = [];             // [ VariableDeclarator ]
            this.kind = state.tokType;          // "var" | "let" | "const"
            this.loc = null;                    // SourceLocation | null
        },
        // A variable declaration, via one of var, let, or const.

        'VariableDeclarator': function VariableDeclarator() {
            this.type = types.VARIABLE_DECLARATOR;
            this.id = null;                     // Pattern
            this.init = null;                   // Expression | null
            this.loc = null;                    // SourceLocation | null
        },
        // A variable declarator.
        // Note: The id field cannot be null.

        // ### Expressions

        'ThisExpression': function ThisExpression() {
            this.type = types.THIS_EXPRESSION;
            this.loc = null;                    // SourceLocation | null
        },
        // A this expression.

        'ArrayExpression': function ArrayExpression() {
            this.type = types.ARRAY_EXPRESSION;
            this.elements = [];                 // [ Expression | null ]
            this.loc = null;                    // SourceLocation | null
        },
        // An array expression.

        'ObjectExpression': function ObjectExpression() {
            this.type = types.OBJECT_EXPRESSION;
            this.properties = [];               // [ ObjectExpressionProp ]
            this.loc = null;                    // SourceLocation | null
        },
        // An object expression. A literal property in an object expression can have either a string or number as its value. Ordinary property initializers have a kind value "init"; getters and setters have the kind values "get" and "set", respectively.

        'FunctionExpression': function FunctionExpression() {
            this.type = types.FUNCTION_EXPRESSION;
            this.id = null;                     // Identifier | null
            this.params = [];                   // [ Pattern ]
            this.defaults = [];                 // [ Expression ]
            this.rest = null;                   // Identifier | null
            this.body = null;                   // BlockStatement | Expression
            this.expression = false;            // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // A function expression.

        'SequenceExpression': function SequenceExpression() {
            this.type = types.SEQUENCE_EXPRESSION;
            this.expressions = [];              // [ Expression ]
            this.loc = null;                    // SourceLocation | null
        },
        // A sequence expression, i.e., a comma-separated sequence of expressions.

        'UnaryExpression': function UnaryExpression() {
            this.type = types.UNARY_EXPRESSION;
            this.operator = null;               // state.UnaryOperator
            this.argument = null;               // Expression
            this.prefix = true;                 // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // A unary operator expression.

        'BinaryExpression': function BinaryExpression() {
            this.type = types.BINARY_EXPRESSION;
            this.operator = null;               // state.BinaryOperator
            this.left = null;                   // Expression
            this.right = null;                  // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A binary operator expression.

        'AssignmentExpression': function AssignmentExpression() {
            this.type = types.ASSIGNMENT_EXPRESSION;
            this.operator = null;               // state.AssignmentOperator
            this.left = null;                   // Expression
            this.right = null;                  // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // An assignment operator expression.

        'UpdateExpression': function UpdateExpression() {
            this.type = types.UPDATE_EXPRESSION;
            this.operator = null;               // state.UpdateOperator
            this.argument = null;               // Expression
            this.prefix = true;                 // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // An update (increment or decrement) operator expression.

        'LogicalExpression': function LogicalExpression() {
            this.type = types.LOGICAL_EXPRESSION;
            this.operator = null;               // state.LogicalOperator
            this.left = null;                   // Expression
            this.right = null;                  // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A logical operator expression.

        'ConditionalExpression': function ConditionalExpression() {
            this.type = types.CONDITIONAL_EXPRESSION;
            this.test = null;                   // Expression
            this.consequent = null;             // Expression
            this.alternate = null;              // Expression
            this.loc = null;                    // SourceLocation | null
        },
        // A conditional expression, i.e., a ternary ?/: expression.

        'NewExpression': function NewExpression() {
            this.type = types.NEW_EXPRESSION;
            this.callee = null;                 // Expression
            this.arguments = [];                // [ Expression | null ]
            this.loc = null;                    // SourceLocation | null
        },
        // A new expression.

        'CallExpression': function CallExpression(callee) {
            this.type = types.CALL_EXPRESSION;
            this.callee = callee;               // Expression
            this.arguments = [];                // [ Expression | null ]
            this.loc = null;                    // SourceLocation | null
        },
        // A function or method call expression.

        'MemberExpression': function MemberExpression() {
            this.type = types.MEMBER_EXPRESSION;
            this.object = null;                 // Expression
            this.property = null;               // Identifier | Expression
            this.computed = false;              // boolean
            this.loc = null;                    // SourceLocation | null
        },
        // A member expression. If computed === true, the node corresponds to a computed e1[e2] expression and property is an Expression. If computed === false, the node corresponds to a static e1.x expression and property is an Identifier.

        // ### Clauses

        'SwitchCase': function SwitchCase() {
            this.type = types.SWITCH_CASE;
            this.test = null;                   // Expression | null
            this.consequent = [];               // [ Statement ]
            this.loc = null;                    // SourceLocation | null
        },
        // A case (if test is an Expression) or default (if test === null) clause in the body of a switch statement.

        'CatchClause': function CatchClause() {
            this.type = types.CATCH_CLAUSE;
            this.param = null;                  // Pattern
            this.body = null;                   // BlockStatement
            this.loc = null;                    // SourceLocation | null
        },
        // A catch clause following a try block. The optional guard property corresponds to the optional expression guard on the bound variable.

        // ### Miscellaneous

        'Identifier': function Identifier() {
            this.type = types.IDENTIFIER;
            this.name = '';                     // string
            this.loc = null;                    // SourceLocation | null
        },
        // An identifier. Note that an identifier may be an expression or a destructuring pattern.

        'Literal': function Literal() {
            this.type = types.LITERAL;
            this.value = null;                  // number
            this.loc = null;                    // SourceLocation | null
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

    exports.AssignmentOperator = operators.AssignmentOperator;
    exports.BinaryOperator = operators.BinaryOperator;
    exports.LogicalOperator = operators.LogicalOperator;
    exports.UpdateOperator = operators.UpdateOperator;
    exports.UnaryOperator = operators.UnaryOperator;

});
