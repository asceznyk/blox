function run(program) {
	program += " ";
	let tokens = lex(program);
	tokens.push(new Term('seperator', '\n'));	
  interpret(parse(tokens), new Env()); 
  shell.scrollTop = shell.scrollHeight;
}

function setEndOfContenteditable(contentEditableElement) {
  let range,selection;
  if(document.createRange) {
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();    
    selection.addRange(range);
  } 
}

let shell = document.getElementById("shell");
let code = document.getElementById("code");
let runBtn = document.getElementById("run");
let clearBtn = document.getElementById("clear");

shell.innerHTML = '';

runBtn.addEventListener('click', function() {
	run(code.value);
});

clearBtn.addEventListener('click', function(){
  shell.innerHTML = '';
});

code.addEventListener('keydown', function(e) {
  if (e.keyCode == 9) {
    e.preventDefault();

    let start = this.selectionStart;
    let end = this.selectionEnd;

    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    this.selectionStart =
      this.selectionEnd = start + 1;
  } 
});



