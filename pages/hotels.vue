<template>
  <el-row class="page-hotel">
    <el-col :span="19">
      <category
        :hotels="hotels"
        :stars="stars"
        :room_type="room_type"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>
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
        list: [],
        stars: [],
        room_type: [],
        hotels: [],
        keyword: '',
        point: ['103.936794', '30.752525']
      }
    },
    mounted() {
      this.$axios.post('/hotels/list', {
        hotel_name: ['惠民旅馆'],
        stars: ['5'],
        room_name: ['大床房', '双人房']
      })
    },
    methods: {
      getHotelList() {

      }
    },
    async asyncData(ctx) {
      let {status, data: {room_type}} = await ctx.$axios.get('/hotels/room_type')
      let {status: status1, data: {hotels}} = await ctx.$axios.get('/hotels/hotel_name')
      if (status === 200 && status1 === 200) {
        return {
          room_type,
          hotels,
          stars: [{
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
