var express = require('express');
var router = express.Router();
var user = require('../db/UserModel');


//register a new
router.post('/user/', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let avatar = req.body.avatar;
    let role = req.body.role;
    let email = req.body.email;
    user.get({username: username}, function (db_res) {
        if (db_res.length === 0)
            user.add({
                username,
                password,
                role,
                email,
                avatar
            }, function (id) {
                res.send({_id: id})
            });
        else
            res.json({'message': 'account has already exist!'})
    })

});


//login user
router.post('/auth/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    user.get({username, password}, function (db_res) {
        if (db_res.length === 0)
            res.json({'message': 'Error in account or password'});
        else
            res.json(db_res);
    })
});
router.post('/get_user/', function (req, res, next) {
    let username = req.body.username;
    user.get({username}, function (db_res) {
        if (db_res.length === 0)
            res.json({'message': "Username doesn't exidt"});
        else
            res.json(db_res);
    })
})

//change a user's role
router.post('/change_role/', function (req, res, next) {
    let email = req.body.email;
    let role = req.body.role;
    if (email && role)
        user.get({email: email}, function (db_res) {
            if (db_res.length > 0) {
                db_res = db_res[0]
                db_res.role = role;
                console.log(db_res);
                user.update(db_res._id, db_res, function (result) {
                    res.json({"msg": "role change success!"});
                })
            } else
                res.json({"error": "email doesn't exist"})
        })
    else
        res.json({"error": "Incomplete parameters"})

});
module.exports = router;
