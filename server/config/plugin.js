'use strict';
const path = require('path')
/** @type Egg.EggPlugin */
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.ejs = {
  enable:true,
  package:'egg-view-ejs'
}
// 本地插件没有package属性
exports.auth = {
  enable:true,
  path:path.join(__dirname,'../lib/plugin/egg-auth')
}
exports.notFound = {
  enable:true,
  path:path.join(__dirname,'../lib/plugin/egg-notFound')
}

exports.mysql = {
  enable:true,
  package:'egg-mysql'
}
exports.sequelize = {
  enable:true,
  package:'egg-sequelize'
}

exports.jwt = {
  enable:true,
  package:'egg-jwt'
}

exports.redis = {
  enable:true,
  package:'egg-redis'
}