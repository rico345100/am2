const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.createIndex('user', {
		name: 1
	}, {
		unique: true,
		sparse: true
	}).then( () => {
		console.log('index created');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});