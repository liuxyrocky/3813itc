var express = require('express');
var router = express.Router();
var channel = require('../db/ChannelModel');
var group = require('../db/GroupModel');
var record = require('../db/RecordModel');
var user = require('../db/UserModel');


router.get('/channel', function (req, res, next) {
    channel.get({}, function (r) {
        res.json(r)
    })
});

router.post('/channel', function (req, res, next) {
    let name = req.body.name;
    let group_id = req.body.group_id;
    channel.add({name, group_id}, function (r) {
        res.json(r)
    })
});
router.post('/channel/delete', function (req, res, next) {
    let _id = {_id: req.body.id};
    channel.remove(_id, function (r) {
        res.json(r)
    })
});


//get all users of a channel
router.get('/channel/user/:cid', function (req, res, next) {
    let where = {channel_id: req.params.cid};
    channel.channel_user_filter(where, function (r) {
        res.json(r);
    })
});

//remove user from a channel
router.post('/channel/user/delete', function (req, res, next) {
    let username = req.body.name;
    let channel_id = req.body.cid;
    channel.remove_user_from_channel(channel_id,username, function (r) {
        res.json(r);
    })
});

//invite user to channel
router.post('/channel/user', function (req, res, next) {
    let username = req.body.name;
    let channel_id = req.body.cid;
    console.log(username);
    user.get({username}, function (r) {
        if (r.length > 0) {
            channel.channel_user_filter({channel_id, username}, function (r2) {
                if (r2.length > 0)
                    res.json({'error': "The current user and has been invited"})
                else {
                    channel.add_user_to_channel(channel_id,username, function (r) {
                        res.json(r)
                    })
                }
            })

        } else {
            res.json({'error': "user doesn't exist"})
        }
    })

});

//get channel talk records.
router.get('/channel/:channel_id', function (req, res, next) {
    let where = {channelID: req.params.channel_id};
    record.get(where, function (r) {
        res.json(r)
    })
});

router.post('/group', function (req, res, next) {
    let name = req.body.name;
    group.add({name}, function (r) {
        res.json(r)
    })
});

router.post('/group/delete', function (req, res, next) {
    let _id = {_id: req.body.id};
    group.remove(_id, function (r) {
        res.json(r)
    })
});

router.get('/group', function (req, res, next) {
    group.get({}, function (r) {
        res.json(r)
    })
});

router.get('/group/:group_id', function (req, res, next) {
    let where = {group_id: req.params.group_id};
    channel.get(where, function (r) {
        res.json(r)
    })
});


module.exports = router;
