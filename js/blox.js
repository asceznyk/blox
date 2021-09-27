function removeComments(string) {
  string = string.replace((/\#([\s\S]|[\r\n]).+?(?=\#)\#/gsi), "");
  string = string.replace((/\`([\s\S]|[\r\n]).+?(?=\`)\`/gsi), "");
  let first = string.search(/\S/);
	if (first == -1) return "";
	return string.slice(first);
}

function lexer(program) {
	program = removeComments(program);
	program = program.replace((/[\n]/g), " ");
	program = program.replace((/[\s]/g), " ");
	let tokens = program.match((/[A-Za-z]+|[0-9.0-9]+|[\=\+\-\*\/\@\$\%\(\)\{\}\,\<\>\[\]]/gmi))
	
	return tokens;
}


function run(program) {
	let tokens = lexer(program);
	console.log(tokens);
	shell.innerHTML = '--running program--';
}


let shell = document.getElementById("shell");
let runBtn = document.getElementById("run");
runBtn.addEventListener('click', function() {;
	run(document.getElementById("code").value);
});







