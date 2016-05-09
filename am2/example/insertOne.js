const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.insert('user', {
		name: '.modernator',
		age: 25,
		sex: 'male'
	}).then( () => {
		console.log('doc inserted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});