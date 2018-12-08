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
        <el-checkbox-group v-model="Hotel">
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
        <el-checkbox-group v-model="Stars">
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
          @click="resetRoomType">不限</dt>
      </div>
      <div class="tags">
        <el-checkbox-group
          v-model="roomType">
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
          @click="resetPrice">不限</dt>
      </div>
      <div class="tags">
        <el-radio-group v-model="radio">
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
        roomType: [],
        radio: 0
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
        return this.roomType.length === 0 ? false : true
      },
      radioPrice() {
        return this.radio === 0 ? false : true
      }
    },
    methods: {
      resetHotel: function () {
        this.Hotel = []
      },
      resetStars() {
        this.Stars = []
      },
      resetRoomType() {
        this.roomType = []
      },
      resetPrice() {
        this.radio = 0
      }
    }
  }
</script>

<style lang="scss">
  .page-hotel .classic .label dt.disable {
    color: #000 !important;
    background-color: #fff !important;
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
