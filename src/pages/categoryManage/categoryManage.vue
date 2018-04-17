<template>
  <div class="categoryManage-wrapper">
    <div class="index-content"
         v-loading="movieTypesLoading"
         element-loading-text="拼命加载中..."
    >
      <div class="box-header">
        <div class="title">电影分类</div>
      </div>
      <div class="table-wrapper">
        <div class="sort-tips">
          <el-alert
            title="支持拖拽排序"
            type="warning">
          </el-alert>
        </div>
        <draggable v-model="movieTypes" @end="onEnd">
          <transition-group class="category-list">
            <div v-for="item in movieTypes" :key="item._id" class="category-item">
              {{item.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GET_MOVIETYPES,
    UPDATE_CATEGORYSORT,
    SUCCESS_CODE
  } from 'src/constsAlias';
  import draggable from 'vuedraggable'
  import _ from 'lodash'

  export default {
    created() {
      this._getMovieTypes();
    },
    data() {
      return {
        movieTypes: [],
        movieTypesLoading: true
      }
    },
    methods: {
      onEnd: _.debounce(function () {
        this.handleSort()
      }, 1500),
      _getMovieTypes() {
        this.$http.get(GET_MOVIETYPES).then((res) => {
          let result = res.body;
          this.movieTypesLoading = false
          if (result.code === SUCCESS_CODE) {
            this.movieTypes = result.data;
          }
        })
      },
      handleSort() {
        let updateList = []
        this.movieTypes.forEach((e, i) => {
          if (i !== e.sort) {
            e.sort = i;
            updateList.push(e);
          }
        })
        this.$http.put(UPDATE_CATEGORYSORT, {
          updateList
        }).then((res) => {
          let result = res.body;
          if (result.code === SUCCESS_CODE) {
            this.$message.success('修改排序成功')
          }
        })
      }
    },
    components: {
      draggable
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .categoryManage-wrapper
    background #e9eef4
    min-width 1170px
    box-sizing border-box
    padding 10px
    min-height 100%
    .table-wrapper
      padding 20px 0 60px 20px
      .sort-tips
        padding-right 25px
      .category-list
        display flex
        flex-wrap wrap
        margin-top 20px
        .category-item
          display flex
          justify-content center
          align-items center
          box-sizing border-box
          width 100px
          height 100px
          background #f5f7fa
          box-shadow 0 3px 10px rgba(0, 0, 0, 0.3)
          margin-right 25px
          margin-bottom 25px
          border-radius 10px
          cursor row-resize
</style>
