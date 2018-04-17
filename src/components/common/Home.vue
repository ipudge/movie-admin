<template>
  <div class="app-wrapper" :class="{'hideSidebar': opened}">
    <v-sidebar></v-sidebar>
    <div class="content-router-wrapper" >
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <v-head></v-head>
  </div>
</template>

<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      vHead,
      vSidebar
    },
    computed: {
      ...mapGetters([
        'opened'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-wrapper
    .index-content
      box-shadow 0 0 4px rgba(0, 0, 0, 0.1)
      background #fff
      padding-bottom 20px
      .box-header
        display flex
        justify-content space-between
        align-items center
        height 60px
        box-sizing border-box
        padding 0 20px
        margin-bottom 10px
        border-bottom 1px solid #ddd
        .title
          font-size 16px
          font-family sans-serif
          color #262626
          font-weight 500
        .el-input__inner
          font-size 14px
          border-radius 20px
    .seach-wrap .el-form-item
      margin-bottom: 0
    &.hideSidebar
      .sidebar-wrapper
        width 64px
      .content-router-wrapper
        left 65px
      .header-wrapper
        left 65px
    .divide-line
      position relative
      padding-left 15px
      &:before
        position absolute
        height 30px
        width 1px
        background #e5e5e5
        left 0
        top 5px
    .content-router-wrapper
      background: none repeat scroll 0 0 #fff
      position: absolute
      left: 220px
      right: 0
      top: 50px
      bottom:0
      width: auto
      box-sizing: border-box
      overflow-y: scroll
      transition: left 0.28s out-in
    .back-wrapper
      color #409EFF
      display inline-block
      margin-right 10px
      padding 10px 15px 10px 0
    .dialog-title-wrapper
      height 70px
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      padding 0 25px
      border-bottom 1px solid #e5e5e5
      .title
        color #262626
        font-size 16px
        font-weight 500
      .el-icon-close
        color #7d8c9b
    .btn
      color #474a4d
      &.btn-danger:hover, &.btn-danger:active
        color #e32d09
      &.btn-primary:hover, &.btn-primary:active
        color #409EFF
    .el-button.is-round
      box-shadow  0px 2.5px 7.5px 0 rgba(0, 0, 0, 0.1)
      font-size 14px
      &+.el-button
        margin-left 20px
    .radio-hidden
      padding 0
      width 80px
      line-height 40px
      text-align center
      &.radio-hidden-lg
        width 90px
      .el-radio__label
        padding-left 0
      &.el-radio.is-bordered+.el-radio.is-bordered
        margin-left 17px
      .el-radio__inner
        display none
    .el-table
      color #606f7e
      font-weight 300
      tr
        th:first-child
          padding-left 10px
      .el-table__body-wrapper
        tr td:first-child div
          padding-left 20px
    .el-table::before
      height 0
    .el-table thead
      color #3f4143
      font-size 14px
    .el-table thead th
      padding 8px 0
    .el-table thead tr
      background #fff
    .el-pagination
      text-align right
      .number
        font-weight normal
        font-size 13px
        color #333
        &.active
          min-width 25px
          line-height 25px
          height: 25px
          border-radius: 2.5px
          background-image: linear-gradient(to right, #11a3f7, #2380e8)
          box-shadow: 0px 2.5px 5px 0 rgba(0, 0, 0, 0.15)
          color #fff
          padding 0 6px
    .el-dialog
      width: 550px
      .el-dialog__header
        padding 0
      .el-dialog__body
        padding: 10px 20px
        .title
          font-size: 25px
          color: #333
          padding: 10px 0 30px
          text-align: center
      .el-dialog__footer
        padding: 0 25px
        .dialog-footer
          text-align right
          padding-right 20px
          height 90px
          display flex
          align-items center
          justify-content flex-end
          border-top 1px solid #e5e5e5
          .btn-dialog
            width 110px
</style>
