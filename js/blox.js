function run(program) {
	console.log(program);
	//let parsed = parse(program)
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    run(contents);
  };
  reader.readAsText(file);
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);







