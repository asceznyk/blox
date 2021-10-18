var Literal = function(ftype, x) {
	this.value = ftype ==  Boolean ? JSON.parse(x) : ftype(x);
	this.type = typeof this.value;
}

var Term = function(type, x) {
	this.type = type;
	this.name = x;
}

var Expression = function (type, x = null) {
	this.type = type;
	this.name = x;
}

var Stream = function(tokens) {
	this.tokens = tokens;
	this.index = 0;
	this.fill(); 
}

Stream.prototype.fill = function () {
	this.next = this.tokens[this.index++];
	if(this.next === undefined) {
		this.next = null;
	}
}

Stream.prototype.peek = function () {
	let token = this.next;
	this.fill();
	return token;
}

var Bools = ['true', 'false'];
var Definitions = ['while', 'for', 'in', 'if', 'else', 'print'];
var DblOps = ['==', '++', '--', '+=', '-=', '*=', '/=', '**'];

