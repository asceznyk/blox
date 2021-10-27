function run(program) {
	program += " ";
	let tokens = lex(program);
	tokens.push(new Term('seperator', '\n'));	
  interpret(parse(tokens), new Env());
}

let shell = document.getElementById("shell");
let codeTxt = document.getElementById("code")
let runBtn = document.getElementById("run");
let clearBtn = document.getElementById("clear");

shell.innerHTML = '';

runBtn.addEventListener('click', function() {
	run(document.getElementById("code").value);
});

clearBtn.addEventListener('click', function(){
  shell.innerHTML = '';
});

codeTxt.addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});







