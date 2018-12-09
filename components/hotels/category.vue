<template>
  <div class="m-hotel-categroy">
    <dl class="classic">
      <div class="label">
        <dt>酒店</dt>
        <dt
          :class="hotelSelected?'disable':''"
          @click="resetHotel">不限
        </dt>
      </div>
      <div class="tags">
        <el-checkbox-group
          v-model="Hotel"
          @change="categoryChange">
          <el-checkbox
            v-for="(item,idx) in hotels"
            :key="idx"
            :label="item"/>
        </el-checkbox-group>
      </div>
    </dl>
    <dl class="classic">
      <div class="label">
        <dt>星级</dt>
        <dt
          :class="starSelected?'disable':''"
          @click="resetStars">不限
        </dt>
      </div>
      <div class="tags">
        <el-checkbox-group
          v-model="Stars"
          @change="categoryChange">
          <el-checkbox
            v-for="(item,idx) in stars"
            :key="idx"
            :label="item.type"/>
        </el-checkbox-group>
      </div>
    </dl>
    <dl class="classic">
      <div class="label">
        <dt>房型</dt>
        <dt
          :class="roomTypeSelected?'disable':''"
          @click="resetRoomType">不限
        </dt>
      </div>
      <div class="tags">
        <el-checkbox-group
          v-model="room_name"
          @change="categoryChange">
          <el-checkbox
            v-for="(item,idx) in room_type"
            :key="idx"
            :label="item"/>
        </el-checkbox-group>
      </div>
    </dl>
    <dl class="classic">
      <div class="label">
        <dt>价格</dt>
        <dt
          :class="radioPrice?'disable':''"
          @click="resetPrice">不限
        </dt>
      </div>
      <div class="tags">
        <el-radio-group
          v-model="radio"
          @change="categoryChange">
          <el-radio :label="1">100以下</el-radio>
          <el-radio :label="2">100-200元</el-radio>
          <el-radio :label="3">200-300元</el-radio>
          <el-radio :label="4">300-400元</el-radio>
          <el-radio :label="5">400-500元</el-radio>
          <el-radio :label="6">500元以上</el-radio>
        </el-radio-group>
      </div>
    </dl>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      hotels: {
        type: Array,
        default() {
          return []
        }
      },
      stars: {
        type: Array,
        default() {
          return []
        }
      },
      room_type: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        Stars: [],
        Hotel: [],
        room_name: [],
        radio: 0,
      }
    },
    computed: {
      hotelSelected() {
        return this.Hotel.length === 0 ? false : true
      },
      starSelected() {
        return this.Stars.length === 0 ? false : true
      },
      roomTypeSelected() {
        return this.room_name.length === 0 ? false : true
      },
      radioPrice() {
        return this.radio === 0 ? false : true
      }
    },
    methods: {
      resetHotel: function () {
        this.Hotel = []
        this.categoryChange()
      },
      resetStars() {
        this.Stars = []
        this.categoryChange()
      },
      resetRoomType() {
        this.room_name = []
        this.categoryChange()
      },
      resetPrice() {
        this.radio = 0
        this.categoryChange()
      },
      categoryChange() {
        let lowPrice, highPrice
        switch (this.radio) {
          case 1:
            lowPrice = 0
            highPrice = 100
            break;
          case 2:
            lowPrice = 100
            highPrice = 200
            break;
          case 3:
            lowPrice = 200
            highPrice = 300
            break;
          case 4:
            lowPrice = 300
            highPrice = 400
            break;
          case 5:
            lowPrice = 400
            highPrice = 500
            break;
          case 6:
            lowPrice = 500
            highPrice = 9999999
            break;
          default:
            lowPrice = 0
            highPrice = 9999999
            break;
        }
        let hotel_type = []
        this.Stars.forEach(item => {
          switch (item) {
            case '经济型':
              hotel_type.push(2)
              break
            case  '舒适/三星':
              hotel_type.push(3)
              break
            case '高档/四星':
              hotel_type.push(4)
              break
            case  '豪华/五星':
              hotel_type.push(5)
              break
          }
        })
        this.$emit('categoryChange', {
          stars: hotel_type,
          hotel_name: this.Hotel,
          room_name: this.room_name,
          lowPrice: lowPrice,
          highPrice: highPrice
        })
      }
    }
  }
</script>

<style lang="scss">
  .page-hotel .classic .label dt.disable {
    color: #000 !important;
    background-color: #fff !important;
    cursor: pointer !important;
  }

  .el-checkbox, .el-radio-group {
    margin-left: 30px;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label, .el-radio__input.is-checked + .el-radio__label {
    color: #06c1ae;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner, .el-radio__input.is-checked .el-radio__inner {
    background-color: #06c1ae;
    border-color: #06c1ae;
  }

  .m-hotel-categroy {
    padding: 15px 20px 0;
    background: #FFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .classic {
    display: flex;
    padding-bottom: 10px;
    > dt {
      width: 80px;
      &:nth-child(2) {
        border-radius: 100px;
        background: #13D1BE;
        color: #FFF;
        height: 22px;
        line-height: 22px;
        width: 40px;
        box-sizing: border-box;
        margin-right: 40px;
        text-align: center;
      }
    }
    &:nth-child(1) {
      dd {
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
