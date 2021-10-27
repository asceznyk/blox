function strval(vals, env) {
	let fullstr = '';
	for(let val of vals) {
		if (val === null) {
			fullstr += '(null)';
		} else if(val.type === 'function') {
			fullstr += '(function)';
		} else if (val.type === 'native') {
			fullstr += '(native)';
		} else if (val.type === 'number') {
			fullstr += val.value;
		} else if (val.type === 'string') {
			fullstr += val.value.replace(/\"/g, '');
		} else if (val.type === 'identifier') {
			fullstr += evalExpr(val, env);
		} else if (val.type === 'array') {
			fullstr += val.args.map(k => k.value.toString());
		}

		fullstr += ' ';
	}

	return fullstr;
}

function nativePRINT(env, ...strs) {
	let fstr = strval(strs, env);
	shell.innerHTML += ' \
	<div class="line"> \
	' + fstr + 
	'</div>';
	console.log(fstr);
	return null;
}

function nativeIF(env, truth, fthen, felse) {
	let fn = truth.value === 1 ? fthen : felse;	
	return interpret(fn.body, env);
}

function nativeWHILE(env, cond, fdo) {
	let count = 0;
	while (evalExpr(cond, env).value === 1 && count < Limit) {
		interpret(fdo.body, env);
		count++;
	}
	return null;
}

function nativeLEN(env, arr) {
	if(arr.type !== 'array') {
		throw CaptureError(new TypeError(`Cannot return length of non-array`));
	}
	return evalExpr(new Literal(Number, arr.args.length), env);
}

