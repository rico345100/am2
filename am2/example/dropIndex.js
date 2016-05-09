const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.dropIndex('user', {
		name: 1
	}).then( () => {
		console.log('index deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});