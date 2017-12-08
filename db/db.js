'use strict';

var mysql = require('mysql');

var config = require('../db/db-config');

var pool = mysql.createPool(config.mysql);

var jsonResponse = require('../response/response');

var DEBUG = true;

/**
 * DB
 * */
var DB = exports = module.exports = {};

/**
 * 是否开启事务，默认关闭
 * */
var openTransaction = false;

DB.query = function (sql, params) {
    if (openTransaction) {
        //TODO:事务执行
    } else {
        return DB.excueteQuery(sql, params);
    }
};

DB.excueteQuery = function (sql, params) {

    return new Promise (function (resolve, reject) {

        DB.connection().then(function (connection) {

            var query = connection.query({sql:sql, timeout:10000}, params, function (error, results) {

                connection.release();

                if (error) {
                    console.log("mysql connection error = " + JSON.stringify(error));
                    reject(jsonResponse.jsonError(jsonResponse.ResponseCode.sysErrorCode, JSON.stringify(error)));
                } else  {
                    resolve(results);
                }
            });

        }).catch(reject);

    });
};

DB.connection = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (connection) {
                resolve(connection);
            } else {
                console.log("getconnection error = "+JSON.stringify(err));
                reject(err);
            }
        });
    });
};


/**
 * 获取resluts内的第一个元素
 */
DB.resultFirst = function (results) {
    return new Promise(function (resolve, reject) {

        if (result.length) {
            resolve(results[0]);
        } else {
            reject(jsonResponse.jsonError(jsonResponse.ResponseCode.paramErrorCode, "查询信息不存在"));
        }

    });
};