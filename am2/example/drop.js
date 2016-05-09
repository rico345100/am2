const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.drop('user').then( () => {
		console.log('collection dropped');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});