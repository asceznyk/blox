var tt = 0;
var ast = [];

function nextsym(tokens) {
	return tokens[tt++];
}

function block(tokens, sym) {
	if()

	if(sym.type == 'identifier' || sym instanceof Literal) {
		sym = nextsym(tokens);
		return block(tokens, sym);
	}
}

function parse(tokens) {
	block(tokens, tokens[tt]);
}





