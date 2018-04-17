<template>
  <el-menu :default-active="activeRoute" class="sidebar-wrapper" :collapse="opened" text-color="#fff" active-text-color="#409EFF" background-color="#202532" router>
    <el-menu-item index="/movieManage">
      <i class="el-icon-menu"></i>
      <span slot="title">电影列表</span>
    </el-menu-item>
    <el-menu-item index="/categoryManage">
      <i class="el-icon-document"></i>
      <span slot="title">电影分类</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex';


  export default {
    computed: {
      activeRoute() {
        return this.$route.path;
      },
      ...mapGetters([
        'opened'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar-wrapper
    position: absolute
    width: 220px
    left: 0
    top: 0
    bottom 0
    background-color: #202532
    transition: width  0.28s out-in
</style>
