const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.insert('user', [
		{
			name: '.modernator',
			age: 25,
			sex: 'male'
		},
		{
			name: 'oldman',
			age: 25,
			sex: 'male'
		},
		{
			name: 'GOD',
			age: 25,
			sex: 'male'
		},
		{
			name: 'cuttie',
			age: 28,
			sex: 'female'
		},
		{
			name: 'g',
			age: 24,
			sex: 'female'
		}
	]).then( () => {
		console.log('docs inserted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch((err) => {
	console.error(err);
});