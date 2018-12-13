<template>
  <div>
    <el-row class="page-hotel">
      <el-col :span="19">
        <category
          :hotels="hotels"
          :stars="hotel_type"
          :room_type="room_type"
          @categoryChange="categoryChange"/>
        <list
          :list="list"
          @getStatus="getStatus"
          @priceSort="priceSort"/>
      </el-col>
      <el-col :span="5">
        <amap
          v-if="point.length"
          :width="230"
          :height="290"
          :point="point"/>
      </el-col>
    </el-row>
    <!--<el-button -->
    <!--type="text" -->
    <!--@click="dialogTableVisible = true">open a Table nested Dialog</el-button>-->

    <el-dialog
      :visible.sync="dialogTableVisible"
      title="房间信息">
      <el-table :data="gridData">
        <el-table-column
          property="hotel_name"
          label="酒店名"
          width="200"/>
        <el-table-column
          property="room_name"
          label="房型"
          width="200"/>
        <el-table-column
          property="date"
          label="日期"
          width="200"/>
        <el-table-column
          property="price"
          label="价格（￥）"
          width="200"/>
        <el-table-column
          property="remain"
          label="剩余"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import Category from '@/components/hotels/category'
  import List from '@/components/hotels/list'
  import Amap from '@/components/public/map'

  export default {
    components: {
      Category,
      List,
      Amap
    },
    data() {
      return {
        dialogTableVisible: false,
        gridData: [],
        list: [],
        stars: [],
        room_name: [],
        hotel_name: [],
        hotel_type: [],
        lowPrice: 0,
        highPrice: 99999999,
        keyword: '',
        desc: '',
        point: ['103.936794', '30.752525']
      }
    },
    async mounted() {
      await this.categoryChange({
        stars: this.stars,
        hotel_name: this.hotel_name,
        room_name: this.room_name,
        lowPrice: this.lowPrice,
        highPrice: this.highPrice,
        desc: this.desc
      })
    },
    methods: {
      getDate(Date) {
        let date = Date.getDate().toString()
        date.length === 1 ? date = '0' + date : ''
        let month = Date.getMonth() + 1 === 13 ? '12' : (Date.getMonth() + 1).toString()
        month.length === 1 ? month = '0' + month : ''
        let year = Date.getFullYear().toString()
        return `${year}-${month}-${date}`
      },
      async getStatus(value) {
        let {status, data} = await this.$axios.post('/hotels/getRoomStatus', {
          room_id: value.room_id,
          start_date: this.getDate(value.start_date),
          leave_date: this.getDate(value.leave_date)
        })
        if (status === 200) {
          console.log(data)
          data.data.forEach(item => {
            item.date = item.date.substring(0, 10)
          })
          this.gridData = data.data
            this.dialogTableVisible = true
        }
      },
      async priceSort(desc) {
        this.desc = desc
        await this.categoryChange({
          stars: this.stars,
          hotel_name: this.hotel_name,
          room_name: this.room_name,
          lowPrice: this.lowPrice,
          highPrice: this.highPrice,
          desc: desc
        })
      },
      async categoryChange(data) {
        this.stars = data.stars
        this.hotel_name = data.hotel_name
        this.room_name = data.room_name
        this.lowPrice = data.lowPrice
        this.highPrice = data.highPrice
        let {status, data: {list}} = await this.$axios.post('/hotels/list', {
          hotel_name: data.hotel_name,
          stars: data.stars,
          room_name: data.room_name,
          lowPrice: data.lowPrice,
          highPrice: data.highPrice,
          desc: this.desc
        })
        if (status === 200) {
          this.list = list
        }
      }
    },
    async asyncData(ctx) {
      let {status, data: {room_type}} = await ctx.$axios.get('/hotels/room_type')
      let {status: status1, data: {hotels}} = await ctx.$axios.get('/hotels/hotel_name')
      if (status === 200 && status1 === 200) {
        return {
          room_type,
          hotels,
          hotel_type: [{
            star: 2,
            type: '经济型'
          }, {
            star: 3,
            type: '舒适/三星'
          }, {
            star: 4,
            type: '高档/四星'
          }, {
            star: 5,
            type: '豪华/五星'
          }]
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";

</style>
