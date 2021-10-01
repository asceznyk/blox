const Operators = ["=", "+", "-", "*", "/", "==", "<", ">"]; 

/*function lexer(program) {
	program = removeComments(program);
	//let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\:\!\$\%\(\)\{\}\,\<\>\[\]\n]|(["'])(?:(?=(\\?))\2.)*?\1/gmi));	
	return program;
}*/

function run(program) {
	program += " ";
	let tokens = lexer(program);
	shell.innerHTML = '--running program--';
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







