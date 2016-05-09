const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.distinct('user', 'name', {
		sex: 'male'
	}).then( (docs) => {
		console.log(docs);
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch((err) => {
	console.error(err);
});