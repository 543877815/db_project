const mysql = require('mysql2')
const dbConfig = require('../config')

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.username,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database
})

const promisePool = pool.promise()

let service = {
  query: async function (sql) {
    const [rows, fields] = await promisePool.query(sql)
    return {rows, fields}
  },
  showTable: function (value) {
    let _sql = `select * from ${value}`
    return service.query(_sql)
  }
}

module.exports = service
