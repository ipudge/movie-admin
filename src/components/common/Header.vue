<template>
  <div class="header-wrapper">
    <hamburger class="hamburger-wrapper" :toggleClick="toggleSideBar" :isActive="opened"></hamburger>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand" placement="bottom">
        <span class="el-dropdown-link">
           <img class="user-logo" :src="avaterSrc">
            <p>{{$store.state.username}}</p>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout" class="user-drop-item">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class='screenfull'></screenfull>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
  import {
    LOGOUT_API,
    SUCCESS_CODE
  } from '@/constsAlias';
  import _ from 'lodash';
  import {mapMutations, mapGetters} from 'vuex';
  import Screenfull from '@/components/plugin/Screenfull';
  import Hamburger from '@/components/plugin/Hamburger'

  export default {
    data() {
      return {
        avaterSrc: 'http://p54m0dt4k.bkt.clouddn.com/ipudge.jpeg'
      };
    },
    components: {
      Screenfull,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'opened'
      ])
    },
    methods: {
      handleCommand(command) {
        if (command === 'logout') {
          this.logout()
        }
      },
      toggleSideBar() {
        this.$store.commit('toggleSideBar')
      },
      ...mapMutations([
        'setTokenAndUsername'
      ]),
      logout() {
        this.setTokenAndUsername({
          tokenAndUsername: {
            username: '',
            token: ''
          }
        });
        this.$router.push('/login');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header-wrapper
    position absolute
    box-sizing border-box
    left 220px
    right 0
    top 0
    height 50px
    font-size 22px
    line-height 50px
    transition left 0.28s out-in
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 1px 3px rgba(0, 0, 0, 0.2)
    overflow hidden
    .hamburger-wrapper
      margin-left 18px

  .user-info
    display flex
    align-items center
    padding-right 20px
    font-size 16px
    .el-dropdown-link
      display flex
      align-items center
      cursor pointer
    .el-dropdown-link p
      font-size 14px
      font-weight 300
      color #484848
      margin-right 8px
    .user-logo
      margin-right 10px
      width 32px
      height 32px
      border-radius 50%
      box-shadow 0 3px 5px 0 rgba(0, 0, 0, 0.4)
    .el-icon-caret-bottom
      color #a5a5a5
      margin-right 10px

  .user-drop-item
    width 165px

  .user-info .el-input
    vertical-align middle
</style>
