function parseOperators(tokens, t) {
	let name = tokens[t-1];
	let value = tokens[t+1];
	let branch = tokens[t];

	branch['args'] = [name, value];
	return branch;
}

function parsePrint(tokens, t, expr) {
	let branch = tokens[t];
	branch['expr'] = expr;
	return branch;
}

function parseFunctions(tokens, t) {
	let branch = tokens[t];

	let sep = tokens[t+2]['name'];
	if(sep !== '{' && sep !== '(') {
		throw new SyntaxError('Expected { or (');
	}

	branch['id'] = tokens[t+1];
	branch['body'] = [];
	branch['args'] = [];

	//add functionality for args and body
	
	return branch;
}

function parseDefs(tokens, t) {
	let def = tokens[t];
	let branch = {};

	if(def['name'] == 'def') { 
		branch = parseFunctions(tokens, t);
	} else if (def['name'] == 'print') {
		branch = parsePrint(tokens, t);
	}
}

function parser(tokens, t = 0, ast = [{'type':'program', 'body':[]}]) {
	console.log(tokens);

	let token = tokens[t];

	if(token['type'] == 'operator') {
		parseOperators(tokens);
	} else {
		ast = parser(tokens, t+1, ast);
	}

	console.log(ast);
	return ast;
}









