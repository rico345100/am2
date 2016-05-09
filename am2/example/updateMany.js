const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.update('user', {
		sex: 'male'
	}, {
		$set: {
			sex: 'man'
		},
		$currentDate: {
			lastModified: true
		}
	}, {
		many: true
	}).then( () => {
		console.log('docs updated');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});