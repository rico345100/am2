const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.delete('user', {
		sex: 'male'
	}, {
		many: true
	}).then( () => {
		console.log('doc deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});