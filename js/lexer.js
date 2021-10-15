function skipSpaceComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), '');
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), '');
  let first = string.search(/[\S\n]/);
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
	} else if (match = /^[\(\)\{\}\[\]\;\:\,\.]/.exec(program)) {
		token = new Term('seperator', match[0]);
	} else if (match = /^[\n\r]/.exec(program)) {
		token = new Term('newline', match[0]);
	} else {
		token = {}
		match = [' '];
	}

	return [token, program.slice(match[0].length)];
}

function lex(program) {
	program = skipSpaceComments(program);

	let tokens = [];
	while(program.match(/\S/) != null) {
		let [token, temp] = tokenize(program);
		program = skipSpaceComments(temp);
		tokens.push(token);
	}

	return tokens;
}


