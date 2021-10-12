let tokens = [];

function run(program) {
	program += " ";
	tokens = lexer(program);
	//let ast = parser(tokens);
	shell.innerHTML = '--running program--';
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







