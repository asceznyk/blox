var NumLiteral = function(x) {
	this.type = 'NumLiteral';
	this.value = Number(x);
}

var Identifier = function(x) {
	this.type = 'Identifier';
	this.name = x;
}

function skipSpaceComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), '');
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), '');
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function classify(term) {

}

function lexer(program) {
	program = skipSpaceComments(program);

	let tokens = [];
	while(true) {
		let skip = program.search(/\s/g);
		if(skip == -1) break
		let term = program.slice(0, skip);
		program = program.slice(skip+1);
		console.log(term, '--', program);
	}


	return tokens;
}


