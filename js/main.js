const Operators = ["=", "+", "-", "*", "/", "==", "<", ">"]; 

function removeComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), '');
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), '');
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

/*function lexer(program) {
	program = removeComments(program);
	//let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\:\!\$\%\(\)\{\}\,\<\>\[\]\n]|(["'])(?:(?=(\\?))\2.)*?\1/gmi));	
	return program;
}*/

function checkStart(tokens) {	
	if(Operators.includes(tokens[0])) {
		throw new SyntaxError("Cannot start programs with Operators");
	} 
	return true
}

function parser(tokens, t, ast, block) {	
	if(!checkStart(tokens)) return

	block['name'] = tokens[t]
	if (tokens[t+1] == '{') {
		block['application'] = 'function'
		block['body'] = parser(tokens, t+2, ast, {});
	} else if (tokens[t+1] == '=') {
		//block['name'] = tokens[t]
	}
	 
	else if (tokens[t] == "\n") {
		return parser(tokens, t+1, ast, block);
	} 
}

function run(program) {
	shell.innerHTML = '--running program--';
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







