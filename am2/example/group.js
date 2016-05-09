const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.group('user', [], {
		init: { count: 0 },
		reduce: function (obj, prev) { prev.count++; }
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