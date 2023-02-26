// @ts-ignore
const mysql = require("mysql2/promise");
require('dotenv').config({
  path: 'C:\\Users\\valtin\\Desktop\\project\\ssossotest\\ssossotest\\.env'
})

module.exports = () => {
  return {
    init: async () => {
      return mysql.createPool({
        host: process.env.DB_ENDPOINT,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
    },
  };
};
