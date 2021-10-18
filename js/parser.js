var Parser = function(tokens) {
	this.tokens = tokens;
}

Parser.prototype.multipleExprs = function(sep, end) {
	let branch = [];
	let name = this.tokens.next.name;
	
	if(name === end) {
		this.tokens.peek();
	} else {

		let argParser = new Parser(this.tokens);
		while (name !== end) {
			let expr = argParser.expr(null, [sep, end]); 
			if (expr !== null) {
				branch.push(expr);
			}
			name = this.tokens.next.name;
			this.tokens.peek();
		}
	}

	return branch;
}

Parser.prototype.args = function() {
	if (this.tokens.next.name != ':') {
		return [];
	}
	this.tokens.peek();
	let next = this.tokens.next;
	if (next.name !== '(') {
		throw new SyntaxError("Expected '(' after ':'");
	} 
	this.tokens.peek();
	let branch = this.multipleExprs(',', ')');
	for (let b of branch) {
		if(b instanceof Literal || b.type !== 'identifier') {
			throw new SyntaxError("Expected variables");
		}
	}

	return branch;	
}

Parser.prototype.expr = function(prev, stops) {
	let expr;
	let curr = this.tokens.next;
	if (curr !== null) {
		if (stops.includes(curr.name)) {
			return prev;
		}
	}
	this.tokens.peek();

	if (curr.type === 'identifier' || curr instanceof Literal) {
		return this.expr(curr, stops);
	} else if (curr.type === 'operator') {
		let next = this.expr(null, ['\n']);
		expr = new Expression('operation', curr.name);
		expr.args = [prev, next];
		return this.expr(expr, ['\n']);
	} else if (curr.name === '{') {
		expr = new Expression('function');
		expr.args = this.args();
		expr.body = this.multipleExprs('\n', '}');
		return this.expr(expr, ['\n']);
	} else if (curr.name === '(') {
		expr = new Expression('call', prev);
		expr.args = this.multipleExprs(',', ')');
		return this.expr(expr, ['\n']);
	} else {
		throw new SyntaxError(`Unexpected expression ${prev}`);
	}
}

function parse(tokens) {	
	let ast = [];
	let tokenStream = new Stream(tokens);
	let parser = new Parser(tokenStream);
	
	while (parser.tokens.next !== null) {
		let expr = parser.expr(null, ['\n']);
		if(expr !== null) {
			ast.push(expr);
		}
		parser.tokens.peek();
	}

	return ast;
}


