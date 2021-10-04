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







