function run(program) {
	shell.innerHTML = program;
	//let parsed = parse(program)
}


let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







