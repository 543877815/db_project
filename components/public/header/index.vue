<template>
  <el-row
    :gutter="15"
    class="m-header">
    <el-col :span="6">
      <geo/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"/>x
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"/>
    </el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  export default {
    components: {
      Geo
    }
  }
</script>

<style lang="scss" scoped>

</style>
