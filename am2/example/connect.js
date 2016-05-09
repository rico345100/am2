const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	console.log('Connected!');
	
	am2.disconnect().then( () => {
		console.log('disconnected!');
	}).catch( (err) => {
		console.err(err);
		
		// if failed to disconnect, do forcely.
		am2.disconnect(true).then( () => {
			console.log('Forcely disconnected.');
		}).catch( (err) => {
			console.error(err);
		});
	});
	
}).catch( (err) => {
	console.error(err);
});