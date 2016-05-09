const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.replace('user', {
		name: '.modernator'
	}, {
		age: 25,
		url: 'http://modernator.me'
	}).then( () => {
		console.log('doc replaced');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});