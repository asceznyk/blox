const Types = ['number', 'bool', 'string'];
const Keywords = ['say', 'while', 'for', 'if', 'cnst'];
const Operators = ["=", "+", "-", "*", "/", "==", "<", ">"]; //let's see



function removeComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), "");
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), "");
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function lexer(program) {
	program = removeComments(program);
	let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\:\!\$\%\(\)\{\}\,\<\>\[\]\n]|\"(?<=\")(.*)(?=\")\"/gmi))
	
	return tokens;
}

function parser(tokens) {	
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







