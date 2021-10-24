function argCheck(fname, params, args) {
	if(params.length !== args.length) {
		throw CaptureError(new ReferenceError(`${args.length} arguments passed ${fname}  \
		requries ${params.length} arguments `));
	}
}

function funcCall(expr, env) {
	let fn = evalExpr(expr.name, env);
	let args = expr.args.map(k => evalExpr(k, env));	

	if(fn.type === 'function') {
		let params = fn.args;
		argCheck(expr.name, params, args);
		
		let body = fn.body;
		let childEnv = fn.env;

		for(let i = 0; i < params.length; i++) {
			childEnv.set(params[i].name, args[i]);
		}

		return interpret(body, childEnv);
	}
}

function evalExpr(expr, env) {
	let val, name;
	if (expr instanceof Literal || expr === null) {
		return expr;
	} else if (expr.type === 'identifier') {
		name = expr.name;
		val = env.get(name);
		if(!val) {
			throw CaptureError(new ReferenceError(`Undefined variable ${name}`));
		}

		return val;
	} else if (expr.type === 'assignment') {
		name = expr.args[0].name;
		if(name in env.items) {
			throw CaptureError(new ReferenceError(`Cannot re-assign variable ${name}`));
		}

		val = evalExpr(expr.args[1], env);	
		env.set(name, val);

		return val;
	} else if (expr.type === 'operation') {
		name = expr.name;
		let [a, b] = expr.args.map(k => evalExpr(k, env));

		let getVal = function() {
			return new Literal(a.type === 'boolean' ? Boolean : Number, env.items[name](a.value, b.value));
		}
		
		if(Increments.includes(name) || Assignments.includes(name)) {
			let term = expr.args[0];
			if(term.type !== 'identifier' || Definitions.includes(term.name) || Bools.includes(term.name)) {
				throw CaptureError(new SyntaxError(`Cannot operate on type ${term.type}`));
			}

			if(Increments.includes(name)) {
				if(b !== null) {
					throw CaptureError(new SyntaxError(`Cannot use increment-ops as arithmetic-ops`));
				}
				b = new Literal(Number, 1);	
			}

			val = getVal();
			env.set(term.name, val);
		} else {
			if(a.type !== b.type) {
				throw CaptureError(new TypeError(`All Terms or Literals must be of same type`));
			}
			val = getVal();
		}	
		
		return val;
	} else if (expr.type === 'function') {
		expr.env = new Env(env);
		return expr;
	} else if (expr.type === 'call') {
		return funcCall(expr, env);
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

