'use strict';
//说明：所有前台需要调用的函数需要在这里注册

var  login = require("../users/login");

exports.login = login.login;
exports.loginm = login.loginm;



