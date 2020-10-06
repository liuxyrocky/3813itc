const dbname = 'chat';
const collection_name = 'user';
const BaseModel = require('./BaseModel.js');


function get(where, callback) {
    BaseModel.get(dbname, collection_name, where, callback);
}

function remove(where, callback) {
    BaseModel.remove(dbname, collection_name, where, callback)
}

function add(data, callback) {
    BaseModel.add(dbname, collection_name, data, callback)
}

function update(id, data, callback) {
    BaseModel.update(dbname, collection_name, id, data, callback)
}

exports.get = get;
exports.update = update;
exports.remove = remove;
exports.add = add;

