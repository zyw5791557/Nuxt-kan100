<script>
import Axios from '~/plugins/getAPI.js';
import BaseFooter from '@/components/BaseFooter';
import StarNavModule from '@/components/star/StarNavModule';
import StarMovieModule from '@/components/star/StarMovieModule';
import StarTeleplayModule from '@/components/star/StarTeleplayModule';
import StarShowModule from '@/components/star/StarShowModule';
import StarNewsModule from '@/components/star/StarNewsModule';
import StarProgramModule from '@/components/star/StarProgramModule';
import StarMusicModule from '@/components/star/StarMusicModule';
import StarImgModule from '@/components/star/StarImgModule';
import StarInfoModule from '@/components/star/StarInfoModule';
export default {
    layout: 'independent',
    components: {
        BaseFooter,
        StarNavModule,
        StarMovieModule,
        StarTeleplayModule,
        StarShowModule,
        StarNewsModule,
        StarProgramModule,
        StarMusicModule,
        StarImgModule,
        StarInfoModule
    },
    asyncData ({ route }, callback) {
        Axios('starDetail', {
            method: 'post',
            data: {
                id: ~~route.params.id,
                classify: '全部',
                page: 1
            }
        }).then(result => {
            callback(null, {
                starData: {
                    name: result.base['中文名'],
                    poster: result.main_img,
                    popular: {
                        rank: 147,
                        index: 18.3
                    },
                    navLinks: [
                        {
                            name: '电影',
                            isComponent: 'StarMovieModule'
                        },
                        {
                            name: '电视剧',
                            isComponent: 'StarTeleplayModule'
                        },
                        {
                            name: '综艺',
                            isComponent: 'StarShowModule'
                        },
                        {
                            name: '美图',
                            isComponent: 'StarImgModule'
                        },
                        {
                            name: '简介',
                            isComponent: 'StarInfoModule'
                        }
                    ],
                    movie: {
                        itemRouteName: 'MovieDetailView-id',
                        backEnable: true,
                        data: result.movie
                    },
                    teleplay: {
                        itemRouteName: 'TeleplayDetailView-id',
                        backEnable: true,
                        data: result.tv
                    },
                    show: {
                        itemRouteName: 'ShowDetailView-id',
                        backEnable: true,
                        ellipsisLines: 2,
                        data: result.variety
                    },
                    photos: result.photos,
                    base: result.base
                },
            });
        }).catch(error => {
            callback();
        });
    },
    data () {
        return {
            headerFlag: false,
            currentView: 'StarMovieModule',
            minHeight: '',
            moviePage: 1,
            teleplayPage: 1,
            showPage: 1,
            photosPage: 1,
            loading: false
        }
    },
    computed: {
      initData() {
          switch (this.currentView) {
              case 'StarMovieModule':
                  return this.starData.movie
                  break;
              case 'StarTeleplayModule':
                  return this.starData.teleplay
                  break;
              case 'StarShowModule':
                  return this.starData.show
                  break;
              case 'StarNewsModule':
                  return this.starData.news
                  break;
              case 'StarProgramModule':
                  return this.starData.program
                  break;
              case 'StarMusicModule':
                  return this.starData.music
                  break;
              case 'StarImgModule':
                  return this.starData.photos
                  break;
              case 'StarInfoModule':
                  return this.starData.base
                  break;
          }
      }  
    },
    methods: {
        requestHandle (type, page) {
            return Axios('starDetail', {
                method: 'post',
                data: {
                    id: ~~this.$route.params.id,
                    classify: type,
                    page: ++page
                }
            });
        },
        navController(ic) {
            this.currentView = ic;
            const posterArr = ['StarMovieModule','StarImgModule','StarInfoModule','StarProgramModule'];
            if(posterArr.indexOf(ic) !== -1) {
                this.headerFlag = false;
            } else {
                this.headerFlag = true;
            }
            this.minHeightComputed();
        },
        loadMore (f) {
            switch (f) {
                case 'movie':
                    this.loadMoreMovie();
                    break;
                case 'teleplay':
                    this.loadMoreTeleplay();
                    break;
                case 'show':
                    this.loadMoreShow();
                    break;
                case 'img':
                    this.loadMoreImg();
                    break;
            }
        },
        loadMoreMovie () {
            this.loading = true;
            this.requestHandle('电影',this.moviePage)
                .then(result => {
                    this.starData.movie.data = this.starData.movie.data.concat(result.movie);
                    this.moviePage++;
                    this.loading = false;
                });
        },
        loadMoreTeleplay () {
            this.loading = true;
            this.requestHandle('电视剧',this.teleplayPage)
                .then(result => {
                    this.starData.teleplay.data = this.starData.teleplay.data.concat(result.tv);
                    this.teleplayPage++;
                    this.loading = false;
                });
        },
        loadMoreShow() {
            this.loading = true;
            this.requestHandle('综艺',this.showPage)
                .then(result => {
                    this.starData.show.data = this.starData.show.data.concat(result.variety);
                    this.showPage++;
                    this.loading = false;
                });
        },
        loadMoreImg() {
            this.loading = true;
            this.requestHandle('美图',this.photosPage)
                .then(result => {
                    this.starData.photos = this.starData.photos.concat(result.photos);
                    this.photosPage++;
                    this.loading = false;
                });
        },
        minHeightComputed() {
            const dom = (document.documentElement.clientHeight) / (lib.flexible.rem);
            const header = !this.headerFlag ? 4.648148 : 1.22222;
            const nav = 1.055556;
            const content_pd = 0.28704;
            const footer = 2.092593 + 1.62963;
            this.minHeight = dom - (header + nav + content_pd + footer) + 'rem';
        }
    },
    mounted () {
        this.minHeightComputed();
    }
}
</script>

<template>
    <div class="starDetail-module">
        <header class="return-header">
            <div v-if="headerFlag" class="header-simple" style="background-color: #fff">
                <div @click="$router.back()" class="return-icon-box">
                    <a class="return-icon"></a>
                </div>
                <span class="return-title">{{ starData.name }}</span>
                <i></i>
            </div>
            <div v-else :style="`background-image: url(${ starData.poster })`" class="header-poster">
                <div class="poster-info">
                    <div @click="$router.back()" class="return-icon-box">
                        <a class="return-icon"></a>
                    </div>
                    <h2 class="poster-name">{{ starData.name }}</h2>
                    <div class="popular">
                        <div class="p-rank">
                            <span class="p-num">{{ starData.popular.rank }}</span>
                            <span class="p-title">人气排名</span>
                        </div>
                        <div class="p-index">
                            <span class="p-num">{{ starData.popular.index }}万</span>
                            <span class="p-title">人气指数</span>
                        </div>
                    </div>
                </div>
            </div>

        </header>
        <star-nav-module :data="starData.navLinks" :active="currentView" @jump="navController"></star-nav-module>
        <transition name="component-fade" mode="out-in">
            <component :is="currentView" :data="initData" @loadMore="loadMore" :style="`min-height: ${ minHeight }`">
                <!-- 组件在 vm.currentview 变化时改变！ -->
                <!-- 具名插槽 -->
                <div v-if="loading" class="loading" slot="loading">
                    <img v-show="loading" src="~assets/images/loading.gif" width="100%" alt="">
                </div>
                <div :style="`line-height: ${ minHeight }`" class="noData" slot="noData">
                    暂无数据
                </div>
            </component>
        </transition>
        <base-footer></base-footer>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.starDetail-module {
    .header-simple { 
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 $gap;
        height: $headerHeight;
    }
    .header-poster { 
        display: flex;
        width: 100%;
        height: 4.648148rem;
        // background-image: url('~assets/images/star_777.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: peru;
        .poster-info {
            width: 50%;
            padding-left: $gap;
        }
        .return-icon-box {
            width: 20%;
            display: flex;
            justify-content: left;
            align-items: center;
            height: $headerHeight;
            box-sizing: border-box;
        }
        .poster-name {
            font-weight: 600;
            color: #fff;
            margin-top: .185185rem;
        }
        .popular {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 65%;
            margin-top: .740741rem;
            color: #fff;
            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                span {
                    text-align: center;
                    &:last-child {
                        margin-top: .148148rem;
                    }
                }
            }
        }
    }
    .return-header {
        .return-title {
            font-weight: 600;
            margin-left: -1rem;
        }
        .return-icon-box {
            margin-left: .12963rem;
            padding: .266667rem 0 .266667rem .266667rem;
            padding-left: 0;
        }
        .return-icon {
            display: block;
            width: .31427rem;
            height: .31427rem;
            border-left: .037037rem solid #999;
            border-bottom: .037037rem solid #999;
            transform: rotate(45deg);
        }
    }
}

// 具名插槽 - loading
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.296296rem;
    img {
        display: block;
        width: .518519rem;
        height: .518519rem;
        border-radius: 50%;
    }
}

// 具名插槽 - noData
.noData {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -0.28704rem;
    color: #999;
}

.starDetail-module {
    .return-title { font-size: 18px; }
    .poster-name { font-size: 22px; }
    .p-num { font-size: 21px; }
    .p-title { font-size: 10px; }
    .noData { font-size: 14px; }
}
[data-dpr="2"] .starDetail-module {
    .return-title { font-size: 36px; }
    .poster-name { font-size: 44px; }
    .p-num { font-size: 42px; }
    .p-title { font-size: 20px; }
    .noData { font-size: 28px; }
}
[data-dpr="3"] .starDetail-module {
    .return-title { font-size: 54px; }
    .poster-name { font-size: 66px; }
    .p-num { font-size: 63px; }
    .p-title { font-size: 30px; }
    .noData { font-size: 42px; }
}

// 动态组件动画

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}


</style>
