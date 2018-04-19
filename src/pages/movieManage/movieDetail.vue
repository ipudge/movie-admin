<template>
  <div class="movieDetail-wrapper">
    <div class="index-content"
         v-loading="movieDetailLoading"
         element-loading-text="拼命加载中..."
    >
      <div class="box-header">
        <div class="title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/movie' }">电影列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{movieDetail.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="table-wrapper">
        <div class="movie-detail">
          <div class="title">电影详情</div>
          <div class="movie-content">
            <div class="cover-wrapper">
              <img v-lazy="movieDetail.cover" alt="电影封面">
            </div>
            <div class="detail">
              <el-form>
                <el-form-item label="导演:" :label-width="formLabelWidth">
                  {{movieDetail.directors.join(' / ')}}
                </el-form-item>
                <el-form-item label="主演:" :label-width="formLabelWidth">
                  {{movieDetail.casts.join(' / ')}}
                </el-form-item>
                <el-form-item label="类型:" :label-width="formLabelWidth">
                  {{movieDetail.movieTypes.join(' / ')}}
                </el-form-item>
                <el-form-item label="首播:" :label-width="formLabelWidth" v-if="movieDetail.pubdates.length">
                  {{movieDetail.pubdates[0].country}}（{{movieDetail.pubdates[0].date | fmtDate('YYYY-MM-DD')}}）
                </el-form-item>
                <el-form-item label="又名:" :label-width="formLabelWidth">
                  {{movieDetail.rawTitle}}
                </el-form-item>
                <el-form-item>
                  <el-tag type="primary" size="small" v-if="movieDetail.watchInfo.doing" style="margin-right: 10px">{{movieDetail.watchInfo.doing}}人在看</el-tag>
                  <el-tag type="warning" size="small" v-if="movieDetail.watchInfo.done" style="margin-right: 10px">{{movieDetail.watchInfo.done}}人看过</el-tag>
                  <el-tag type="success" size="small" v-if="movieDetail.watchInfo.want" >{{movieDetail.watchInfo.want}}人想看</el-tag>
                </el-form-item>
              </el-form>
            </div>
            <div class="score-wrapper">
              <div class="score-title">豆瓣评分</div>
              <div class="score-box">
                <div class="score">{{movieDetail.rate.rate}}</div>
                <div class="start">
                  <el-rate
                    v-model="movieDetail.rate.rate/2"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                  <div class="num">{{movieDetail.rate.rateNum}}人评论</div>
                </div>
              </div>
              <template v-if="movieDetail.rate.star.star5">
                <star-bar title="5星" :percent="movieDetail.rate.star.star5" class="star-bar"></star-bar>
                <star-bar title="4星" :percent="movieDetail.rate.star.star4" class="star-bar"></star-bar>
                <star-bar title="3星" :percent="movieDetail.rate.star.star3" class="star-bar"></star-bar>
                <star-bar title="2星" :percent="movieDetail.rate.star.star2" class="star-bar"></star-bar>
                <star-bar title="1星" :percent="movieDetail.rate.star.star1" class="star-bar"></star-bar>
              </template>
            </div>
          </div>
        </div>
        <div class="video-wrapper">
          <div class="title">预告片</div>
          <div class="video-list">
            <div v-for="item in movieDetail.preVideoList" class="video-item" @click="playVideo(item)">
              <img v-lazy="item.img"/>
              <div class="desc">{{item.desc}}</div>
              <div class="time">{{item.date | fmtDate('YYYY-MM-DD')}}</div>
            </div>
          </div>
        </div>
        <div class="poster-wrapper">
          <div class="title">海报</div>
          <div class="posterSwipe">
            <div v-for="(item, index) in movieDetail.posterList" class="poster-item">
              <img v-lazy="baseUrl + encodeURIComponent(item)" alt="海报" @click="showPoster(index)"/>
            </div>
          </div>
        </div>
        <div class="stagePhoto-wrapper">
          <div class="title">剧照</div>
          <div class="stagePhotoSwipe">
            <div v-for="(item, index) in movieDetail.stagePhotoList" class="stagePhoto-item">
              <img v-lazy="baseUrl + encodeURIComponent(item)" alt="剧照" @click="showStagePhoto(index)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <photo-swipe :items="photoList" :index="index" ref="photoswipe"></photo-swipe>
    <el-dialog :visible.sync="videoBoxShow" :close-on-click-modal="true" :show-close="false" @close="handleClose">
      <video  id="myPlayer" class="video-js vjs-default-skin" width="100%" controls preload="auto" data-setup='{ "aspectRatio":"16:9" }' :poster="poster"></video>
    </el-dialog>
  </div>
</template>
<script>
  import {
    GET_MOVIEDETAIL,
    SUCCESS_CODE,
    BASE_URL
  } from 'src/constsAlias';
  import PhotoSwipe from 'src/components/plugin/PhotoSwipe.vue'
  import StarBar from 'src/components/plugin/StarBar.vue'
  import 'video.js/dist/video-js.min.css'
  import videoJs from 'video.js'

  export default {
    created() {
      this._getMovieDetailById(this.$route.params.id);
    },
    computed: {
      baseUrl () {
        return `${BASE_URL}agent?url=`
      },
      stagePhotoList () {
        let stagePhotoList = []
        this.movieDetail.stagePhotoList.forEach((e) => {
          stagePhotoList.push({
            src: this.baseUrl + encodeURIComponent(e),
            w: 600,
            h: 400
          })
        })
        return stagePhotoList
      },
      posterList () {
        let posterList = []
        this.movieDetail.posterList.forEach((e) => {
          posterList.push({
            src: this.baseUrl + encodeURIComponent(e),
            w: 600,
            h: 400
          })
        })
        return posterList
      }
    },
    data() {
      return {
        myPlayer: '',
        poster:'',
        videoSrc: '',
        movieDetailLoading: true,
        movieDetail: {
          stagePhotoList: [],
          directors: [],
          casts: [],
          movieTypes: [],
          pubdates: [],
          posterList: [],
          rate: {
            star: {}
          },
          watchInfo: {}
        },
        formLabelWidth: '50px',
        photoList: [],
        index: 0,
        videoBoxShow: false
      }
    },
    methods: {
      playVideo (item) {
        this.videoBoxShow = true;
        this.$nextTick(() => {
          if (!this.myPlayer) {
            this.myPlayer = videoJs('myPlayer');
          }
          this.poster = item.img;
          this.myPlayer.src(this.baseUrl + encodeURIComponent(item.videoUrl));
          this.myPlayer.play();
        })
      },
      showPoster (index) {
        this.$refs.photoswipe.openPhotoSwipe(index, [...this.posterList])
      },
      showStagePhoto (index) {
        this.$refs.photoswipe.openPhotoSwipe(index, [...this.stagePhotoList])
      },
      _getMovieDetailById (id) {
        this.$http.get(GET_MOVIEDETAIL + id).then((res) => {
          let result = res.body;
          this.movieDetailLoading = false;
          if (result.code === SUCCESS_CODE) {
            this.movieDetail = result.data;
          }
        })
      },
      handleClose () {
        this.myPlayer.pause();
      }
    },
    components: {
      PhotoSwipe,
      StarBar
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .movieDetail-wrapper
    background #e9eef4
    min-width 1170px
    box-sizing border-box
    padding 10px
    min-height 100%
    .vjs-button>.vjs-icon-placeholder:before
      line-height 2
    .movie-detail
      padding 20px 25px
      .title
        font-size 18px
        font-weight 500
        margin-bottom 25px
      .movie-content
        display flex
        justify-content space-between
        .cover-wrapper
          width 200px
          img
            width 135px
            height 200px
        .detail
          flex 1
          .el-form-item
            margin-bottom 0
        .score-wrapper
          width 250px
          .star-bar
            margin-top 5px
          .score-title
            font-size 14px
            display block
            line-height 40px
            color #474a4d
          .score-box
            display flex
            .score
              font-size 40px
              margin-right 10px
            .num
              font-size 14px
              color #606f7e
              margin-top 5px
    .video-wrapper
      padding 20px 0 30px 10px
      .title
        font-size 18px
        font-weight 500
        margin-bottom 15px
        margin-left 15px
      .video-list
        display flex
        flex-wrap wrap
        .video-item
          width  200px
          padding 10px 15px
          cursor pointer
          img
            width 200px
            height 113px
          desc
            font-size 13px
          .time
            font-size 12px
            margin-top 5px
    .poster-wrapper
      padding 20px 0 30px 10px
      .title
        font-size 18px
        font-weight 500
        margin-bottom 15px
        margin-left 15px
      .posterSwipe
        display flex
        flex-wrap wrap
        .poster-item
          height  200px
          width  200px
          padding 10px 15px
          img
            max-width 100%
            height 200px
    .stagePhoto-wrapper
      padding 20px 0 30px 10px
      .title
        font-size 18px
        font-weight 500
        margin-bottom 15px
        margin-left 15px
      .stagePhotoSwipe
        display flex
        flex-wrap wrap
        .stagePhoto-item
          width 200px
          padding 10px 12.5px 25px
          img
            max-width 100%
            max-height 200px
</style>
