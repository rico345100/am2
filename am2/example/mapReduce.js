const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	function map() {
		emit(this.sex, 1);
	}
	
	function reduce(key, values) {
		return Array.sum(values);
	}
	
	am2.mapReduce('user', map, reduce , {
		out: 'user_mu'
	}).then( (docs) => {
		console.log(docs);
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch((err) => {
	console.error(err);
});