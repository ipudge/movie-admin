<template>
  <div class="star-bar">
    <span class="desc">{{title}}</span>
    <div class="bar" :style="{width: percentWidth}"></div>
    <span class="percent">{{percent}}</span>
  </div>
</template>
<script>
   export default {
     props: {
       title: {
         type: String
       },
       percent: {
         type: String,
         detault: '0%'
       }
     },
     computed: {
       percentWidth () {
         return parseInt(this.percent.split('%')[0]) + 'px'
       }
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .star-bar
    display flex
    .desc
      font-size 12px
      margin-right 5px
      color #606266
    .bar
      height 13px
      background-color #ffd596
      margin-right 8px
    .percent
      font-size 12px
      color #606266
</style>
