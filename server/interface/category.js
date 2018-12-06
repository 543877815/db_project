const Router = require('koa-router')
const axios = require('./utils/axios')
const sign = require('./utils/sign')
const Category = require('../dbs/models/category')

let router = new Router({prefix: '/category'})

router.get('/crumbs',async (ctx)=>{
  // let result = await Category.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }

  let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params:{
      city:ctx.query.city.replace('市','') || "北京",
      sign
    }
  })
  ctx.body={
    areas: status===200?areas:[],
    types: status===200?types:[]
  }
})

module.exports = router
