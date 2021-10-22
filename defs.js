var Bools = ['true', 'false'];
var Definitions = ['while', 'for', 'in', 'if', 'print'];
var DblOps = ['==', '++', '--', '+=', '-=', '*=', '/=', '**'];

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

var Env = function(parent=null) {
	this.parent = parent;
	this.items = {};
}

Env.prototype.get = function(name) {
	if(name in this.items) {
		return this.items[name];
	} else if (this.parent !== null) {
		return this.parent.get(name);
	} else {
		return null;
	}
}

Env.prototype.set = function(name, value) {
	this.items[name] = value;
}

Env.prototype.contains = function(name) {
	return name in this.items;
}

Env.prototype.str = function() {
	let str = '';
	for(let k in this.items) {
		str += k + ' := ' + this.items[k];
	}	
	return str;
}

function CaptureError(err) {
	try {
		throw err;
	} 
	catch(e) {
		shell.innerHTML = e.message;
		return e.message;
	}
}


