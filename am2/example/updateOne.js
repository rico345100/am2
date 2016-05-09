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
	}).then( () => {
		console.log('doc updated');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});