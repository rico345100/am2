const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.count('user').then( (result) => {
		console.log(result);
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch((err) => {
	console.error(err);
});