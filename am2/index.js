"use strict";

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const am2 = {
	connection: null,
	// connect(String url, String db, Object options): Connect to MongoDB with specified URL
	// options.reconnect
	// options.connectTimeout
	connect(url, db, options) {
		options = options || {};
		let reconnect = !!options.reconnect || false;
		let connectTimeout = +options.connectTimeout | 1000;
		
		let connectUrl = 'mongodb://' + url + '/' + db;
		
		return new Promise( (resolve, reject) => {
			MongoClient.connect(connectUrl, {
				server: {
					auto_reconnect: reconnect,
					socketOptions: {
						connectTimeoutMS: connectTimeout,
					},
				}
			}, (err, db) => {
				if(err) {
					reject(err);
				}
				
				this.connection = db;
				resolve(db);
			});
		});
	},
	// disconnect(Boolean force): Disconnect from MongoDB
	disconnect(force) {
		force = !!force;
		
		return new Promise( (resolve, reject) => {
			if(!this.connection) {
				reject(new Error('db not connected'));
			}
			
			this.connection.close(force, () => {
				resolve();
			});
		});
	},
	// insert(String collection, Object doc): Insert doc into collection
	// insert(String collection, Array docs): Insert docs into collection
	insert(col, doc) {
		let method = Array.isArray(doc) ? 'insertMany' : 'insertOne';
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col)[method](doc, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// update(String collection, Object filter, Object updateQuery, Object options): Update doc
	// options.many
	// options.upsert
	update(col, filter, updateQuery, options) {
		options = options || {};
		let many = !!options.many || false;
		let upsert = !!options.upsert || false;  

		let method = many ? 'updateMany' : 'updateOne';
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col)[method](filter, updateQuery, {
				upsert
			}, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// replace(String collection, Object filter, Object document, Object options): Replace doc
	// options.upsert
	replace(col, filter, doc, options) {
		options = options || {};
		let upsert = !!options.upsert || false;
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).replaceOne(filter, doc, {
				upsert
			}, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// delete(String collection, Object filter, Object options): Delete doc
	// options.many
	delete(col, filter, options) {
		options = options || {};
		let many = !!options.many || false;
		
		let method = many ? 'deleteMany' : 'deleteOne'; 
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col)[method](filter, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// drop(String collection): Drop collection from DB
	drop(col) {
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).drop( (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// find(String collection, Object query, Object options): Find documents from DB
	// options.skip
	// options.limit
	// options.paginate
	// options.excludes
	find(col, query, options) {
		query = query || {};
		options = options || {};
		
		let skip = +options.skip || null;
		let limit = +options.limit || null;
		let paginate = options.paginate || null;
		
		let excludes = options.excludes || [];
		
		// convert excludes to object
		const excludesObj = {};
		for(let i = 0, len = excludes.length; i < len; i++) {
			excludesObj[excludes[i]] = false;
		}
		
		if(paginate) {
			if(paginate.length < 2) {
				return new Promise( (resolve, reject) => { reject('paginate requires two number, skip and limit.') });
			}
			
			skip = paginate[0];
			limit = paginate[1];
		}
		
		return new Promise( (resolve, reject) => {
			let cursor = this.connection.collection(col).find(query, excludesObj);
			
			if(skip) {
				cursor.skip(skip);
			}
			if(limit) {
				cursor.limit(limit);
			}
			
			cursor.toArray( (err, docs) => {
				if(err) {
					reject(err);
				}
				
				resolve(docs);
			});
		});
	},
	// count(String collection, Object query, Object options)
	// options.skip
	// options.limit
	count(col, query, options) {
		options = options || {};
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).count(query, options, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// createIndex(String collection, Object index, Object options)
	createIndex(col, index, options) {
		options = options || {};
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).createIndex(index, options, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// dropIndex(String collection, Object index): Drop index
	dropIndex(col, index) {
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).dropIndex(index, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// dropIndexes(String collection): Drop all indexes
	dropIndexes(col) {
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).dropIndexes( (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// reIndex(String collection): Rebuild index
	reIndex(col) {
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).reIndex( (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// group(String collection, Object keys, Object options)
	// options.init
	// options.reduce
	// options.finalize
	// options.command
	group(col, keys, options) {
		options = options || {};
		let condition = options.condition || {};
		let init = options.init || {};
		let reduce = options.reduce || function() {};
		let finalize = options.final || null;
		let command = !!options.command || true;
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).group(keys, condition, init, reduce, finalize, command, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// distinct(String collection, String key, Object query): Dinstinct a collection
	distinct(col, key, query) {
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).distinct(key, query, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// aggregate(String collection, Object pipeline, Object options): Aggregate collection
	aggregate(col, pipeline, options) {
		options = options || {};
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).aggregate(pipeline, options, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	},
	// mapReduce(String collection, Function map, Function reduce, Object options)
	mapReduce(col, map, reduce, options) {
		options = options || {};
		
		return new Promise( (resolve, reject) => {
			this.connection.collection(col).mapReduce(map, reduce, options, (err, result) => {
				if(err) {
					reject(err);
				}
				
				resolve(result);
			});
		});
	}
};

module.exports = am2;