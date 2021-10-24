let Parser = function(tokens) {
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
	
	if (this.tokens.next.name !== '(') {
		throw CaptureError(new SyntaxError(`Expected '(' after ':'`));
	}
	this.tokens.peek();
	
	let branch = this.multipleExprs(',', ')');
	for (let b of branch) {
		if(b instanceof Literal || b.type !== 'identifier') {
			throw CaptureError(new TypeError(`Cannot pass Literals as function arguments`));
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

	if ((curr.type === 'identifier' || 
		curr.type === 'null' || 
		curr instanceof Literal) && 
		prev === null) {
		return this.expr(curr, stops);
	} else {
		if (curr.type === 'operator') {
			let type = curr.name === '=' ? 'assignment' : 'operation'	
			if (type === 'assignment') {
				if(prev.type !== 'identifier' || prev instanceof Literal) {
					throw CaptureError(new TypeError(`Cannot assign to anything but symbols or chars`));
				}
			}

			expr = new Expression(type, curr.name);
			expr.args = [prev, this.expr(null, stops)];
		} else if (curr.name === '{') {
			expr = new Expression('function');
			expr.args = this.args();
			expr.body = this.multipleExprs('\n', '}');
		} else if (curr.name === '(') {
			expr = new Expression('call', prev);
			expr.args = this.multipleExprs(',', ')');
		} else if (curr.name === '[') {
			expr = new Expression('array');
			expr.args = this.multipleExprs(',', ']'); 
		} else if (curr.name === '.') {
			expr = new Expression('index');
			expr.args = [prev, this.expr(null, stops)];
		} else {
			throw CaptureError(new SyntaxError(`Unexpected token: ${curr.name}`));
		}

		return expr;
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


