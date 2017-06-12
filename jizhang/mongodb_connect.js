var mongo = require('mongodb'),
  MongoClient = mongo.MongoClient,
  assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/jizhang';

// Use connect method to connect to the server
exports.connect = function(callback = (db, cb) => cb()) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    callback.apply(null, [
      db, () => db.close()
    ]);
  });
}
