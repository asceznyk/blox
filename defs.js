let Bools = ['true', 'false'];
let Definitions = ['while', 'for', 'in', 'if', 'print', 'set'];
let Arithmetics = ['*', '+', '/', '-', '**', '%'];
let Increments = ['++', '--'];
let Assignments = ['-=', '+=', '*=', '/=', '**=', '%='];
let Comparisions = ['==', '<', '>', '<=', '>=', '!='];
let Operators = [].concat.apply([], [Arithmetics, Comparisions, Increments, Assignments]); 

let Literal = function(ftype, x) {
	this.value = ftype ==  Boolean ? JSON.parse(x) : ftype(x);
	this.type = typeof this.value;
}

let Term = function(type, x) {
	this.type = type;
	this.name = x;
}

let Expression = function (type, x = null) {
	this.type = type;
	this.name = x;
}

let Stream = function(tokens) {
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

function CheckIncrement(op) {
	return 
}

let Env = function(parent=null) {
	this.parent = parent;
	this.items = {};

	for(let op of Operators) {
		this.items[op] = Function('a, b', `return a ${Increments.includes(op) ? op[0] + '=' : op} b;`);
	}
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

