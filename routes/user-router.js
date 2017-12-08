"use strict";

var express = require('express');
var userDao = require('../dao/user_dao');

var UserRouter = module.exports = express.Router();

/**
 * GET User Listening
 */
UserRouter.get('/', function (req, res) {
    res.send('user API response for GET');
});

/**
 * 添加用户
 */
UserRouter.post('/addUser', function (req, res) {
    userDao.insertUser(req.query).then(res.responseResult).catch(res.responseError);
});

/**
 * 删除用户
 */
//TODO

/**
 * 更新用户
 */
UserRouter.post('/updateUserById', function (req, res) {
   userDao.updateByID(req.query).then(res.responseResult).catch(res.responseError);
});

/**
 * 查找用户
 */
UserRouter.post('/getUserById', function (req, res) {
    userDao.queryById(req.query["id"]).then(res.responseResult).catch(res.responseError);
    // userDao.queryById(req.query["id"]).then(function (value) {
    //     res.responseResult(value);
    // }).catch(res.responseError);
});

/**
 * 查找所有用户
 */
UserRouter.post('/getAllUsers', function (req, res) {
   userDao.queryAll(req.query).then(res.responseResult).catch(res.responseError);
});