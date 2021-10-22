
function evalExpr(expr, env) {
	if (expr instanceof Literal) {
		return expr;
	} else if (expr.type === 'identifier') {
		let val = env.get(expr.name);
		if(!val) {
			throw CaptureError(new ReferenceError(`Undefined variable ${expr.name}`));
		}

		return val;
	} else if (expr.type === 'assignment') {
		let name = expr.args[0].name;
		if(name in env.items) {
			throw CaptureError(new ReferenceError(`Cannot re-assign variable ${name}`));
		}

		let val = evalExpr(expr.args[1], env);
		env.set(name, val);
		return val;
	} else if (expr.type === 'operation') {
		let [a, b] = expr.args.map(k => evalExpr(k, env));	

		if(!(a.type === b.type)) {
			throw CaptureError(new TypeError(`All Terms or Literals must be of same type`));
		}

		if(!(Operators.includes(expr.name))) {
			throw CaptureError(new ReferenceError(`Expected one of Operators ${Operators}`));
		}

		return new Literal(a.type === 'boolean' ? Boolean : Number, env.items[expr.name](a.value, b.value));
	}
}

function evalIter(ast, env) {
	let branch = [];
	for(let expr of ast) {
		branch.push(evalExpr(expr, env));
	}
	return branch;
}

function interpret(ast, env) {
	let evl = {};
	for(let expr of evalIter(ast, env)){
		evl = expr;
	}

	return evl;
}



