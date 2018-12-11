# db_project

> 一个使用Vue全家桶+SSR+Koa2的全栈练习
>
> 看的是慕课上面的Vue全家桶+SSR+Koa2全栈开发美团网
>
> 后面结合数据库课程来拓展一点功能

​	课程实现的功能：

- 登录注册
- 切换城市
- 产品类型
- 产品列表
- 产品详情
- 购物车
- 订单产生

​	mark一下知识点：

- create-nuxt-app搭建的脚手架

- 交互用的axios

- 样式框架element-ui

- 规范代码eslint

- 登录注册用的redis做缓存，koa-passport做权限认证

- 验证码用的腾讯邮箱的STMP服务发送，结合nodemailer

- 购物车、订单的数据用的mongodb，操作用mongoose，GUI用的Robo 3T

- 地图用的高德邮箱的服务

- 产品数据用的爬取的线上数据，当然线下也有比较少，在dbs的readme有说区别

- 定位也是用的线上的接口

- 讲了中间件的思想，对比了SSR和普通请求

- 用了很多ES6的写法，比如解构赋值，async、await的结合

- 自己遇到的坑有import之于export default，require之于module exports，lang="css"要安装node-sass和，sass-loader

- 还有一些小插件包括，crypto-js用于算MD5，lodash的debounce，拼音搜索js-pinyin

  有待增强的地方：

- 没有用RestFul规范定义接口

- 地图坐标的变动

- 没有完全使用mongodb实现增删改查

  结合课程实现的部分：

- 结合使用mysql实现酒店列表、酒店房型列表的复杂查询、订单列表的增删改查

- 我反悔了，课程给的数据库设计的太瓜皮了，只写了相关查询，其他不写了

- mysql查询使用的是mysql2，因为要用纯sql来写，逻辑比较复杂，如果用ORM可以用sequelize，可以降低开发复杂度。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# mongodb
$ mongod --dbpath D:/mongoDB/data

# redis,if sth go wrong
$ redis-cli
$ shutdown
$ exit

# redis,else
$ redis-server

```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
