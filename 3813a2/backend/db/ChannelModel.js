const dbname = 'chat';
const collection_name = 'channel';
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

function add_user_to_channel(channel_id, username, callback) {
    BaseModel.add(dbname, "channel_user", {channel_id, username}, callback)
}

function remove_user_from_channel(channel_id, username, callback) {
    BaseModel.remove(dbname, "channel_user", {channel_id, username}, callback)
}

function channel_user_filter(condtion, callback) {
    BaseModel.get(dbname, "channel_user", condtion, callback)
}

function test() {
    add({
        name: 'sport',
        group_id: '5d89710f6dbeb41ec8569eda'
    }, function (res) {
        let where = {_id: res};
        get(where, function (re) {
            console.log(re)
        })
    });
    add({
        name: 'cloth',
        group_id: '5d89710f6dbeb41ec8569eda'
    }, function (res) {
        let where = {_id: res};
        get(where, function (re) {
            console.log(re)
        })
    });
    add({
        name: 'digital',
        group_id: '5d89710f6dbeb41ec8569edb'
    }, function (res) {
        let where = {_id: res};
        get(where, function (re) {
            console.log(re)
        })
    });

}
exports.channel_user_filter = channel_user_filter;
exports.add_user_to_channel = add_user_to_channel;
exports.remove_user_from_channel = remove_user_from_channel;
exports.get = get;
exports.remove = remove;
exports.add = add;

