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

Parser.prototype.expr = function(prev) {
	let curr = this.tokens.next;
	if (curr.type === 'newline') {
		return prev;
	}

	this.tokens.peek();
	if (curr.type === 'identifier' || curr instanceof Literal) {
		return this.expr(curr);
	} else if (curr.type == 'operator') {
		let next = this.expr(null);
		curr['args'] = [prev, next];
		return this.expr(curr);
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


