const dbname = 'chat';
const collection_name = 'group';
const BaseModel = require('./BaseModel.js');

/*
 Group Model
 id:int
 name:string
*/

function get(where, callback) {
    BaseModel.get(dbname, collection_name, where, callback);
}

function remove(where, callback) {
    BaseModel.remove(dbname, collection_name, where, callback)
}

function add(data, callback) {
    BaseModel.add(dbname, collection_name, data, callback)
}

function test() {
    add({name: 'Friends'}, function (res) {
        let where = {_id: res};
        get(where, function (re) {
            console.log(re)
        })
    });

}

exports.get = get;
exports.remove = remove;
exports.add = add;

