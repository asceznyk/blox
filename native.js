function nativePRINT(env, strs) {
	shell.innerHTML = strs;
	console.log(...strs);
	return strs;
}

function nativeIF(env, truth, fthen, felse) {
	let fn = truth.value == 1 ? fthen : felse;
	let expr = new Expression('call', fn);	
	return evalExpr(expr, env);
}

//function nativeWHILE



