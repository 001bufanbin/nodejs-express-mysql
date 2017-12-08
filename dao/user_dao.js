'use strict';

const DB = require("../db/db");
const jsonResponse = require("../response/response");

var UserDao = exports = module.exports = {};


/**
 * 表名
 */
const SQL_TableName = "User";

/**
 * 表内字典信息（过滤掉敏感字段）
 */
const SQL_QueryFields = "id, name, age, tel, city";

/**
 * 插入用户信息
 */
const SQL_Insert = "INSERT INTO " + SQL_TableName + " SET ?";

/**
 * 删除用户
 */
//TODO

/**
 * 更新用户
 */
const SQL_UpdateByID = "UPDATE " + SQL_TableName + " SET ?" + " WHERE id = ?";

/**
 * 查找用户
 */
const SQL_QueryByID = "SELECT " + SQL_QueryFields + " FROM " + SQL_TableName + " WHERE id = ? LIMIT 1";

/**
 * 查找所有用户
 */
const SQL_QueryAll = "SELECT " + SQL_QueryFields + " FROM " + SQL_TableName;


/**
 * 插入用户信息
 */
UserDao.insertUser = function (userInfo) {
    //TODO:createTime && updateTime
    return DB.query(SQL_Insert, userInfo).then(function () {
        return userInfo;
    });
};

/**
 * 删除用户
 */
//TODO

/**
 * 更新用户
 */
UserDao.updateByID = function (userInfo) {
    //TODO:createTime && updateTime

    var uid = userInfo.id;
    delete userInfo.id;

    //remove key if value null
    for (var key in userInfo) {
        if (!userInfo[key]) {
            delete userInfo[key];
        }
    }

    return new Promise(function (resolve, reject) {

        DB.query(SQL_UpdateByID, [userInfo, uid]).then(function (value) {
            resolve();
        }).catch(function (reason) {
            reject(jsonResponse.jsonError(jsonResponse.ResponseCode.sysErrorCode, "服务器异常"));
        });

    });

};

/**
 * 查找用户
 */
UserDao.queryById = function (uid) {

    return new Promise(function (resolve, reject) {

        DB.query(SQL_QueryByID, uid).then(function (results) {

            if (results.length) {
                resolve(results[0]);
            } else {
                reject(jsonResponse.jsonError(jsonResponse.ResponseCode.paramErrorCode, "用户id不存在"));
            }

        }).catch(reject);

    });
};

/**
 * 查找所有用户
 * TODO：分页
 */
UserDao.queryAll = function () {
    return DB.query(SQL_QueryAll);
};