const am2 = require('../index');

am2.connect('localhost', 'test')
.then( () => {
	
	am2.aggregate('user', [
		{
			$group: {
				_id: "$name"
			}
		},
		{
			$project: {
				_id: 0,
				path: "$_id"
			}
		},
		{
			$sort: {
				path: 1
			}
		},
		{
			$limit: 3
		}
	]).then( (docs) => {
		console.log(docs);
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch((err) => {
	console.error(err);
});