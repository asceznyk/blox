let tokens = [];
let ast = [];

function run(program) {
	program += " ";
	tokens = lex(program);
	tokens.push(new Term('newline', '\n'));
	ast = parse(tokens);
	shell.innerHTML = '--running program--';
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







