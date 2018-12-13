<template>
  <dl class="s-item">
    <dt>
      <img
        :src="meta.img?meta.img:'//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png'"
        alt="商品图片">
    </dt>
    <dd>
      <h3>
        {{ meta.hotel_name }}
        <!--<nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link>-->
      </h3>
      <el-rate
        v-model="meta.stars"
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled/>
      <span
        v-if="meta.stars==5"
        class="s-item-comment">豪华/五星</span>
      <span
        v-else-if="meta.stars==4"
        class="s-item-comment">高档/四星</span>
      <span
        v-else-if="meta.stars==3"
        class="s-item-comment">舒适/三星</span>
      <span
        v-else
        class="s-item-comment">舒适性</span>
      <span class="s-item-value">{{ meta.stars }}分</span>
      <!--<span class="s-item-comment-total">{{ // meta.comment }}人评论</span>-->
      <p>
        <span class="s-item-type">{{ meta.room_name }};</span>
        <span class="s-item-addr">剩余{{ meta.remain }}间;
        </span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <!--<b>{{ meta.status }}</b>-->
        <b 
          :data-id="meta.room_id"
          style="cursor: pointer;"
          @click="checkStatus(meta.room_id)">查看是否可订</b>
        <span
          v-if="meta.create_date"
          style="padding-left: 10px">最近交易日期 {{ parseInt((new Date().getTime() - Date.parse(meta.create_date))/(24*3600*1000)) }} 天前</span>
      </p>
      <el-date-picker
        v-model="value"
        :picker-options="pickerOptions"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"/>
    </dd>

  </dl>
</template>

<script>
  export default {
    components:{
    },
    props: {
      meta: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data(){
      return{
        value: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
      }
    },
    methods:{
      checkStatus(value){
        if (this.value.length === 0){
          this.$message('提示：请选择日期');
        }else{
          this.$emit('getStatus', {
            room_id: value,
            start_date: this.value[0],
            leave_date: this.value[1]
          });
        }
      }
    }
  }
</script>
