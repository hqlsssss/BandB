/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617350061296_7040';

  // add your middleware config here
  config.middleware = ['httpLog'];
  config.httpLog = {
    type: 'all'
  }

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.view = {
    mapping: {
      ".html": "ejs"
    },
    root: [path.join(appInfo.baseDir, "app/html"), path.join(appInfo.baseDir, "app/view")].join(",")
  }

  config.ejs = {
    delimiter: "$"
  }

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets")
  }
  config.session = {
    key: "moke-sess",
    httpOnly: true,
    maxAge: 1000 * 5,
    // 自动刷新session
    renew: true
  }

  config.auth = {
    exclude: ['/api/user/login', '/api/user/register']
  }

  config.mysql = {
    // 确认挂载在APP下面
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123',
      database: 'egg'
    }
  }


  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }


  config.jwt = {
    secret: 'hql',

  }
  // add your user config here
  const userConfig = {
    salt: 'hql',
    redisExpire:60*60*24
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password:'12345',
      db: 0
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
