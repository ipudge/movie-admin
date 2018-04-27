<template>
  <div class="index-wrapper">
    <div class="index-content">
      <div class="box-header">
        <div class="title">电影列表</div>
        <div>
          <el-form :inline="true"  ref="formSearch" class="seach-wrap" >
            <el-form-item>
              <el-input v-model="doubanId" placeholder="请输入查询的doubanId" size="medium" clearable style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="types"
                multiple
                collapse-tags
                size="medium"
                placeholder="请选择电影类型"
              style="width: 200px">
                <el-option
                  v-for="item in movieTypes"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" icon="el-icon-search" v-waves
                         round size="medium" >搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table
          :data="movieList"
          v-loading="movieListLoading"
          element-loading-text="拼命加载中"
          highlight-current-row
       >
          <el-table-column
            label="电影名称"
            min-width="200"
            prop="title"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="doubanID"
                           prop="doubanId"
                           min-width="100"
          >
          </el-table-column>
          <el-table-column label="豆瓣评分"
                           min-width="80"
          >
            <template slot-scope="scope">
              <el-tag size="small"  type="primary">{{ scope.row.rate.rate }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="主演"
                           prop="rateplanName"
                           min-width="180"
                           show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.casts.join()}}
            </template>
          </el-table-column>
          <el-table-column label="电影类型"
                           min-width="140"
          >
            <template slot-scope="scope">
              {{scope.row.movieTypes.join()}}
            </template>
          </el-table-column>
          <el-table-column label="简介"
                           min-width="220"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left" width="400">
                {{scope.row.summary}}
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.summary && (scope.row.summary.slice(0,15) + '...' )}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                icon="el-icon-view"
                class="btn btn-danger"
                @click="viewMovieDetail(scope.row)">详情
              </el-button>
              <el-button
                size="small"
                type="text"
                icon="el-icon-delete"
                class="btn btn-danger"
                @click="deleteMovie(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="formSearch.page"
          :page-size="formSearch.size"
          layout="prev, pager, next, jumper"
          :total="totalRecord"
          style="margin-top: 15px;padding-right: 20px">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GET_MOVIELIST,
    DELETE_MOVIE,
    GET_MOVIETYPES,
    SUCCESS_CODE
  } from '@/constsAlias';

  export default {
    created() {
      this._getMovieList();
      this._getMovieTypes();
    },
    data() {
      return {
        movieList: [],
        movieListLoading: false,
        formSearch: {
          page: 1,
          size: 20
        },
        movieTypes: [],
        totalRecord: 0,
        types: [],
        doubanId: '',
        labelPosition: 'right',
        formLabelWidth: '90px'
      }
    },
    methods: {
      viewMovieDetail (row) {
        this.$router.push(`/movies/${row._id}`)
      },
      _getMovieTypes () {
        this.$http.get(GET_MOVIETYPES).then((res) => {
          let result = res.body;
          if (result.code === SUCCESS_CODE) {
            this.movieTypes = result.data;
          }
        })
      },
      deleteMovie(row) {
        this.$confirm('是否确认删除该电影数据么?', '确认删除', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          roundButton: true
        }).then(() => {
          this.$http.delete(DELETE_MOVIE + row._id).then((res) => {
            let result = res.body;
            if (result.code === SUCCESS_CODE) {
              this.movieList.splice(this.movieList.indexOf(row), 1);
              this.$message.success('删除电影成功成功');
            }
          })
        }).catch(() => {
        });
      },
      _getMovieList() {
        this.movieListLoading = true;
        let search = {
          ...this.formSearch,
          types: this.types.join(),
          doubanId: this.doubanId
        }
        this.$http.get(GET_MOVIELIST, {params: search}).then((res) => {
          let result = res.body;
          this.movieListLoading = false;
          if (result.code === SUCCESS_CODE) {
            this.movieList = result.data.list;
            this.totalRecord = result.data.totalRecord;
          }
        })
      },
      onSearch() {
        this.formSearch.page = 1;
        this._getMovieList();
      },
      handleCurrentChange(currentPage) {
        this.formSearch.page = currentPage;
        this._getMovieList();
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .index-wrapper
    background #e9eef4
    min-width 1170px
    box-sizing border-box
    padding 10px
    min-height 100%
    .slider-wrapper
      padding 0 10px
</style>
