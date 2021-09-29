const Types = ['number', 'boolean', 'string'];
const Keywords = ['say', 'while', 'for', 'if', 'else', 'cnst'];
const Operators = ["=", "+", "-", "*", "/", "==", "<", ">"]; 

function removeComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), '');
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), '');
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function lexer(program) {
	program = removeComments(program);
	let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\:\!\$\%\(\)\{\}\,\<\>\[\]\n]|(["'])(?:(?=(\\?))\2.)*?\1/gmi));	
	return tokens;
}

function checkStart(tokens) {	
	if(Operators.includes(tokens[0])) {
		throw new SyntaxError("Cannot start programs with Operators");
	} 
	return true
}

function parser(tokens, t) {	
	let ast = [];
	let block = {'name':null};

	if(!checkStart(tokens)) return

	if (tokens[t+1] == '{') {
		block['name'] = tokens[t]
		block['application'] = 'function'
		block['body'] = parser(tokens, t+2);
	}

	console.log(block);
}

function run(program) {
	let tokens = lexer(program);
	console.log(tokens);
	parser(tokens, 0);
	shell.innerHTML = '--running program--';
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







