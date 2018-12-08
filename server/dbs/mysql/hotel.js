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
  getRoomType: function () {
    let _sql = `select room_name from room_type`
    return service.query(_sql)
  },
  getHotel: function () {
    let _sql = `select hotel_name from hotel`
    return service.query(_sql)
  },
  getList: function (filter) {
    let _sql = `select hotel_name, stars, room_name, remain, price from hotel natural join room_type natural join room_info`
    _sql += ' where'
    for (let prop in filter) {
      filter[prop].forEach(item => {
        console.log(typeof(item))
        if (typeof(item) ==='string'){
          _sql += ` ${prop} = '${item}' or`
        }else{
          _sql += ` ${prop} = ${item} or`
        }
      })
    }
    console.log(_sql)
    return service.query(_sql.substring(0, _sql.length - 2))
  }
}

module.exports = service
