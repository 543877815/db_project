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
        <b style="cursor: pointer;">查看是否可订</b>
        <span
          v-if="meta.create_date"
          style="padding-left: 10px">最近交易日期 {{ parseInt((new Date().getTime() - Date.parse(meta.create_date))/(24*3600*1000)) }} 天前</span>
      </p>
      <!--<ul>-->
      <!--<li>-->
      <!--<span class="detail-type">门票</span>{{ meta.ticket }}-->
      <!--</li>-->
      <!--<li>-->
      <!--<span class="detail-type">跟团</span>{{ meta.group }}-->
      <!--</li>-->
      <!--<li v-if="meta.scene&&meta.scene.length">-->
      <!--<span class="detail-type">景酒</span>{{ meta.scene }}-->
      <!--</li>-->
      <!--<li v-else>-->
      <!--<span class="detail-type">景酒</span>暂无描述-->
      <!--</li>-->
      <!--</ul>-->
    </dd>
  </dl>
</template>

<script>
  export default {
    props: {
      meta: {
        type: Object,
        default() {
          return {}
        }
      }
    },

  }
</script>
