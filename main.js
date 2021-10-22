let tokens = [];
let ast = [];

function run(program) {
	program += " ";
	tokens = lex(program);
	tokens.push(new Term('seperator', '\n'));
	ast = parse(tokens);
	//interpret(ast, new Env());

	shell.innerHTML = ' \
	running.. <br/> \
	finished! \
	';	
}

let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







