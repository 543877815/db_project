const Router = require('koa-router')
const hotel = require('../dbs/mysql/hotel')

let router = new Router({prefix: '/hotels'})

router.get('/room_type', async ctx => {
  let {rows, fields} = await hotel.getRoomType()
  let room_type = []
  rows.forEach(item => {
    room_type.push(item.room_name)
  })
  ctx.body = {
    room_type
  }
})

router.get('/hotel_name', async ctx => {
  let {rows, fields} = await hotel.getHotel()
  let hotels = []
  rows.forEach(item => {
    hotels.push(item.hotel_name)
  })
  ctx.body = {
    hotels
  }
})

router.post('/list', async ctx => {
  let {hotel_name, stars, room_name, lowPrice, highPrice, desc} = ctx.request.body;
  let {rows, fields} = await hotel.getList({
    hotel_name,
    stars: stars.map(item => {
      return parseInt(item)
    }),
    room_name,
    lowPrice,
    highPrice,
    desc
  })
  ctx.body = {
    list: rows
  }
})

module.exports = router;
