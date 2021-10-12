function parseOperators(tokens, t) {
	let name = tokens[t-1];
	let value = tokens[t+1];
	let operation = tokens[t];

	operation['args'] = [name, value];
	return operation;
}

function parseDefs(tokens, t) {

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









