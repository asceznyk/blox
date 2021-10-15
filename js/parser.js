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

var Parser = function(tokens) {
	this.tokens = tokens;
}

Parser.prototype.multipleExprs = function(sep, end) {
	let branch = [];
	if(this.tokens.next) /* rest to be written */
}

Parser.prototype.args = function() {
	if (this.tokens.next.name != ':') {
		return [];
	}
	this.tokens.peek();
	let next = this.tokens.next;
	if (next.name !== "(") {
		throw new SyntaxError("Expected '(' after ':'");
	} 
	this.tokens.peek();
	let branch = this.multipleExprs(",", ")");
	for (let b of branch) {
		if(b instanceof Literal || b.type !== 'identifier') {
			throw new SyntaxError("Expected variables");
		}
	}

	return branch;	
}

Parser.prototype.expr = function(prev) {
	let curr = this.tokens.next;
	if (curr !== null) {
		if (curr.name === ';') {
			return prev;
		}
	}
	this.tokens.peek();
	if (curr.type === 'identifier' || curr instanceof Literal) {
		return this.expr(curr);
	} else if (curr.type === 'operator') {
		let next = this.expr(null);
		curr['args'] = [prev, next];
		return this.expr(curr);
	} else if (curr.type === 'function') {
		let args = this.args();
	}
}

function parse(tokens) {	
	let ast = [];
	let tokenStream = new Stream(tokens);
	let parser = new Parser(tokenStream);
	
	while (parser.tokens.next !== null) {
		let expr = parser.expr(null);
		if(expr !== null) {
			ast.push(expr);
		}
		parser.tokens.peek();
	}

	return ast;
}


