function strval(vals, env) {
	let fullstr = '';
	for(let val of vals) {
		if(val.type === 'function') {
			fullstr += '||function||';
		} else if (val.type === 'native') {
			fullstr += '||native||';
		} else if (val.type === 'number' || val.type === 'string') {
			fullstr += val.value;
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
	let strf = strval(strs, env);
	shell.innerHTML += strf + '<br/>';
	console.log(strf);
	return null;
}

function nativeIF(env, truth, fthen, felse) {
	let fn = truth.value === 1 ? fthen : felse;
	let expr = new Expression('call', fn);	
	return evalExpr(expr, env);
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



