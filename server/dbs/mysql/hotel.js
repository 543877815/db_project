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
    let _sql = `select * from hotel natural join room_type natural join 
                    (select max(date), remain, a.room_id, start_date, leave_date, amount, payment, create_date, price 
                    from 
                    (room_info a 
                    left join 
                    \`order\` b 
                    on a.room_id = b.room_id) 
               group by a.room_id) R1
               where`
    for (let prop in filter) {
      if (typeof(filter[prop]) === 'object') {
        if (filter[prop].length !== 0) {
          _sql += '('
          filter[prop].forEach(item => {
            if (typeof(item) === 'string') {
              _sql += ` ${prop} = '${item}'`
            } else {
              _sql += ` ${prop} = ${item}`
            }
            _sql += ' or'
          })
          _sql = _sql.substring(0, _sql.length - 2)
          _sql += ') and '
        }
      }
    }
    _sql += ` price between ${filter.lowPrice} and ${filter.highPrice} group by room_id`
    // console.log(_sql)
    return service.query(_sql)
  }
}

module.exports = service
