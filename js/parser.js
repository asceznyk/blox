var Stream = function(tokens) {
	this.tokens = tokens;
	this.index = 0;
	this.fill();
}

Stream.prototype.fill = function () {
	try {
		this.next = this.tokens[this.index++];
	} catch (err) {
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

Parser.prototype.expr = function () {
	let token = this.tokens.next;
	if (token.type == 'identifier' || token.type == 'value') {
	}
}



function parse(tokens) {	
	let ast = [];
	let tokenStream = new Stream(tokens);
	let parser = new Parser(tokenStream);

	while (parser.tokens.next !== null) {
		//do all the ast stuff
	}

	return ast;
}









