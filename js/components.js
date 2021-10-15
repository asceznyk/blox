var Literal = function(ftype, x) {
	this.value = ftype ==  Boolean ? JSON.parse(x) : ftype(x);
	this.type = typeof this.value;
}

var Term = function(type, x) {
	this.type = type;
	this.name = x;
}

var Bools = ['true', 'false'];
var Definitions = ['def', 'while', 'for', 'in', 'if', 'else', 'return', 'print'];
var Operators = ['=', '+', '-', '*', '/', '==', '++', '--', '+=', '-=', '**'];


