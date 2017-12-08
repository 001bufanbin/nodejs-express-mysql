/**
 * 返回数据统一封装
 */
'use strict';

var ResponseCode = exports = module.exports = {

    /**
     * 成功
     */
    successCode: 200,

    /**
     * 失败
     * */
    failedCode: -200,

    /**
     * 参数错误
     */
    paramErrorCode: -100,

    /**
     * 服务器错误
     */
    sysErrorCode: 500
};


var JSONResponse = function () {

    return function (req, res, next) {

        /**
         * 响应成功
         */
        res.responseResult = function (result) {

            return new Promise(function (resolve) {

                if (result && result.code && result.msg) {
                    res.json(result);
                } else {
                    res.json(JSONResponse.jsonResult(result));
                }

                resolve();

            });
        };

        /**
         * 响应错误信息
         */
        res.responseError = function (result) {

            return new Promise(function (resolve) {

                if (result && result.code && result.msg) {
                    res.json(result);
                } else {
                    res.json(JSONResponse.jsonError(ResponseCode.sysErrorCode, result));
                }

                resolve();

            });
        };

        /**
         * 数据校验失败
         */
        res.responseValidatorErrorIfNeed = function () {
            var mappedErrors = req.validationErrors();
            if (mappedErrors) {
                res.json({code:ResponseCode.paramErrorCode, msg:"参数错误", error:mappedErrors});
                return true;
            }
            return false;
        };

        next();

    };
};

/**
 * 相应数据统一格式
 */
JSONResponse.json = function (code, msg, data) {
    return {
        code: code,
        msg: msg,
        data: data
    };
};

/**
 * 返回失败json
 */
JSONResponse.jsonError = function (code, msg) {
    return JSONResponse.json(code, msg);
};

/**
 * 返回成功json
 */
JSONResponse.jsonResult = function (data) {
    return JSONResponse.json(ResponseCode.successCode, "操作成功", data);
};

/**
 * 响应状态码
 * */
JSONResponse.ResponseCode = ResponseCode;

module.exports = JSONResponse;