function testStreamTerminate() {
	let s = new Stream(tokens);
	while (s.next !== null) {
		console.log(s.next);
		s.peek();
	}
}


