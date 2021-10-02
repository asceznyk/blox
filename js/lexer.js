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
var Operators = ['=', '+', '-', '*', '/', '==', '++', '--', '+=', '-='];

function skipSpaceComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), '');
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), '');
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function tokenize(program) {
	let match;
	let token;
	
	if(match = /^[A-Za-z]+/.exec(program)) {
		token = match[0];
		if(Definitions.includes(token)) {
			token = new Term('definition', token);
		} else if(Bools.includes(token)) {
			token = new Literal(Boolean, token);
		} else {
			token = new Term('identifier', token);	
		}
	} else if (match = /^(["'])(?:(?=(\\?))\2.)*?\1/.exec(program)) {
		token = new Literal(String, match[0]);
	} else if (match = /^[0-9.0-9]+/.exec(program)) {
		token = new Literal(Number, match[0]);
	} else if (match = /^[\=\+\-\*\/]+/.exec(program)) {
		token = match[0];
		if(Operators.includes(token)) {
			token = new Term('operator', token);
		} else {
			throw new SyntaxError('Expected one of valid operators');
		}
	} else {
		token = {}
		match = [' '];
	}

	return [token, program.slice(match[0].length)];
}

function lexer(program) {
	program = skipSpaceComments(program);

	let tokens = [];
	while(program.match(/\S/) != null) {
		let [token, temp] = tokenize(program);
		program = skipSpaceComments(temp);
		tokens.push(token);
	}

	console.log(tokens);
	return tokens;
}


