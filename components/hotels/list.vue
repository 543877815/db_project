<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="(item, index) in nav"
        :key="item.name"
        :class="[item.name, item.active?'s-nav-active':'']"
        @click="navSelect(index)"
      >{{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"
        @getStatus="getStatus"/>
    </ul>
  </div>
</template>

<script>
  import Item from './hotel.vue'

  export default {
    components: {
      Item
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        desc: '',
        nav: [
          {
            name: 's-default',
            txt: '智能排序',
            active: true
          }, {
            name: 's-price',
            txt: '价格最低',
            active: false
          }, {
            name: 's-visit',
            txt: '人气最高',
            active: false
          }, {
            name: 's-comment',
            txt: '评价最高',
            active: false
          }
        ]
      }
    },
    async asyncData({app}) {
      let {data} = await app.$axios.get('/searchList')
      return {items: data.list}
    },
    methods: {
      navSelect: function (idx) {
        this.nav.forEach((item, index) => {
          idx === index ? item.active = true : item.active = false
        })
        idx === 1 ? this.desc = 'desc' : this.desc = ''
        this.$emit('priceSort', this.desc)
      },
      getStatus: function (value) {
        this.$emit('getStatus', value)
      }
    }
  }
</script>
