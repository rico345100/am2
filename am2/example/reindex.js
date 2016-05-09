const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.reIndex('user').then( () => {
		console.log('reindexed');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});