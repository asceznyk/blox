const Identifiers = ['var', 'val', 'const', 'stmt'];
const Types = ['number', 'bool', 'array', 'function'];
const Statements = ['print', 'while', 'for', 'if'];

function removeComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), "");
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), "");
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function lexer(program) {
	program = removeComments(program);
	//program = program.replace((/[\n]/g), " ");
	//program = program.replace((/[\s]/g), " ");
	let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\:\!\$\%\(\)\{\}\,\<\>\[\]\n]|\"(?<=\")(.*)(?=\")\"/gmi))
	
	return tokens;
}

function parser(tokens) {
	//goes through the tokens
	//returns an Abstract-Syntax-Tree (AST)
	
	let ast = [];
	let block = {'name':null, 'identifier':null};
	for (let t = 0; t < tokens.length; t++) {
		
	}
}

function run(program) {
	let tokens = lexer(program);
	console.log(tokens);
	parser(tokens);
	shell.innerHTML = '--running program--';
}


let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







