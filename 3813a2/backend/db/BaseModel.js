const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const ObjectID = require('mongodb').ObjectID;


function base_get(dbname, collection_name, where, callback) {
    if (where._id)
        where._id = new ObjectID(where._id);
    callback = callback || function () {
    };
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(collection_name).find(where).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            db.close().then(r => {
                callback(result);
            });
        });
    });
}

function base_remove(dbname, collection_name, where, callback) {
    if(where._id)
        where._id = new ObjectID(where._id);
    callback = callback || function () {
    };
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);

        dbo.collection(collection_name).deleteOne(where, function (err, obj) {
            if (err) throw err;
            db.close().then(r => {
                callback();
            });
        });
    });
}

function base_add(dbname, collection_name, data, callback) {
    callback = callback || function () {
    };
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(collection_name).insertOne(data, function (err, res) {
            if (err) throw err;
            callback(res['insertedId']);
            db.close().then(r => {
            });
        });
    });
}

function base_update(dbname, collection_name, id, data, callback) {
    callback = callback || function () {
    };
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        var dbo = db.db(dbname);
        dbo.collection(collection_name).update({_id: new ObjectID(id)}, data).then(function (result) {
            callback(result);
        }, function (err) {
            console.log(err.message);
        })
    });
}



exports.update = base_update;
exports.get = base_get;
exports.add = base_add;
exports.remove = base_remove;
