# AM2 - Abstracted MongoDB Module

AM2 is light weight, promise based abstracted Mongodb module.


##


### Methods

#### am2.connect(string url, string db, object options)
connect to MongoDB.

options:
* bool reconnect: reconnect automatically if disconnected from MongoDB
* number connectTimeout: connection timeout. default is 1000(ms).

```
am2.connect('localhost', 'test')
.then( () => {
	console.log('Connected!');
}).catch( (err) => {
	console.error(err);
});
```

##
#### am2.disconnect(bool force)
disconnect from MongoDB.

```
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
```

##

#### am2.insert(string collection, object doc)
#### am2.insert(string collection, array doc)
insert document or documents into collection. if doc is object, insert single object. else, is array, insert muliple objects.

```
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
```

##
#### am2.update(string collection, object filter, object update, object options)
update document or documents of collection. basically update single object but you can update multiple at same time with options.many = true.

options:
* bool many: update multiple docs matched by filter. default is false.
* bool upsert: create new document if there is no matched. default is false.

```
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
```

##
#### am2.replace(string collection, object filter, object doc, object options)
replace document that matched by filter.

options:
* bool upsert: create new document if there is no matched. default is false.

```
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
```

##
#### am2.delete(string collection, object filter, object options)
delete document or documents.

options:
* bool many: delete all documents that matched by filter. default is false.

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.delete('user', {
		sex: 'male'
	}, {
		many: true
	}).then( () => {
		console.log('doc deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});
```

##
#### am2.drop(string collection)
drop collection.

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.drop('user').then( () => {
		console.log('collection deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});
```

##
#### am2.find(string collection, object query, object options)
find documents.

options:
* number skip: number of skipping documents from result. default is undefined.
* number limit: number of limited documents from result. default is undefined.
* array paginate: combine skip and limit as single argument with array. first element is skip and second is limit. if skip and limit set with paginate, they will ignored. default is undefined.
* array excludes: list of field that want to exclude from result. default is undefined.

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.find('user', {}, {
		excludes: ['name']	// fields for exclude from result
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
```

##
#### am2.count(string collection, object query, object options)
count matched documents in collection.

options:
* number skip
* number limit

```
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
```

##
#### am2.createIndex(string collection, object index, object options)
create index.

options: see [here](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#createIndex).

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.createIndex('user', {
		name: 1
	}, {
		unique: true,
		sparse: true
	}).then( () => {
		console.log('index created');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});
```

##
#### am2.dropIndex(string collection, object index)
drop index.

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.dropIndex('user', {
		name: 1
	}).then( () => {
		console.log('index deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});
```

##
#### am2.dropIndexes(string collection)
delete all indexes.

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.dropIndexes('user').then( () => {
		console.log('all indexes deleted');
	}).catch( (err) => {
		console.error(err);
	}).then( () => {
		am2.disconnect();
	});
	
}).catch( (err) => {
	console.error(err);
});

```

##
#### am2.reindex(string collection)
reindex collection.

```
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
```


##
#### am2.group(string collection, array keys, object options)
group collection. see [here](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#group).

options:
* object init
* function reduce
* function finalize
* bool command

```
am2.connect('localhost', 'test')
.then( () => {
	
	am2.group('user', [], {
		init: { count: 0 },
		reduce: function (obj, prev) { prev.count++; }
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
```

##
#### am2.distinct(string collection, string key, object query)
distinct collection.

```
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
```

##
#### am2.aggregate(string collection, object pipeline, object options)
see [this](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#aggregate).

```
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
```

##
#### am2.mapReduce(string collection, function map, function reduce, object options)
see [this](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#mapReduce).

```
am2.connect('localhost', 'test')
.then( () => {
	
	function map() {
		emit(this.sex, 1);
	}
	
	function reduce(key, values) {
		return Array.sum(values);
	}
	
	am2.mapReduce('user', map, reduce , {
		out: 'user_mu'
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
```


##
AM2 is MIT licensed. any question: mail to me rico345100@gmail.com.