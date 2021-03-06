function run() {
	let tokens = lex(code.value + ' ');
	tokens.push(new Term('seperator', '\n'));	
  interpret(parse(tokens), new Env()); 
  shell.scrollTop = shell.scrollHeight;
}

let shell = document.getElementById("shell");
let code = document.getElementById("code");
let runBtn = document.getElementById("run");
let clearBtn = document.getElementById("clear");

shell.innerHTML = '';

runBtn.addEventListener('click', function() {
	run();
});

clearBtn.addEventListener('click', function(){
  shell.innerHTML = '';
});

code.addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    let start = this.selectionStart;
    let end = this.selectionEnd;

    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    this.selectionStart = this.selectionEnd = start + 1;
  }
});



