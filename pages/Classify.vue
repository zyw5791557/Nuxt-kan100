<script>
import { Toast } from 'vant';
import Axios from '~/plugins/getAPI.js';
import { detailViewCompareTable } from '~/util/router-table.js';
import BaseFooter from '~/components/BaseFooter';
export default {
    layout: 'independent',
	components: {
		BaseFooter
    },
    asyncData ({ route }, callback) {
        Axios('classify', {
            method: 'post',
            data: {
                classify: route.query.classifyNav || '电影',
                type: route.query.classifyType || '',
                region: route.query.classifyArea || '',
                age: route.query.classifyTime || '',
                actor: route.query.classifyActor || '',
                recent: route.query.classifySort || '',
                page: 1
            }
        }).then(result => {
            if(result.length === 0) {
                callback(null, {
                    resData: []
                })
            }
            callback(null, {
                classifyData: {
                    nav: ['电影','电视剧','综艺','动漫','搞笑'],
                    type: result.type || [],
                    area: result.region || [],
                    time: result.age || [],
                    actor: result.actor || [],
                    sort: result.recent || []
                },
                resData: result.video
            });
        }).catch(error => {
            callback();
        });
    },
    data () {
        return {
            selectStat: {
                nav: this.$route.query.classifyNav || '电影',
                type: this.$route.query.classifyType || '全部',
                area: this.$route.query.classifyArea || '全部',
                time: this.$route.query.classifyTime || '全部',
                actor: this.$route.query.classifyActor || '全部',
                sort: this.$route.query.classifySort || '最新播出'
            },
            resData: [],
            requestPage: 1,
            requestLock: true,
            loading: false,
            classifyFix: false
        }
    },
    filters: {
        scoreBeforeFilter (val) {
            return val.substr(0,2);
        },
        scoreAfterFilter (val) {
            return val.substr(-1);
        }
    },
    watch: {
        '$route' (to,from) {
            
        }
    },
    methods: {
        init() {
            let $slideType = this.classifyData.type.indexOf(this.selectStat.type) === -1 ? 0 :  this.classifyData.type.indexOf(this.selectStat.type);
            let $slideArea = this.classifyData.area.indexOf(this.selectStat.area) === -1 ? 0 :  this.classifyData.area.indexOf(this.selectStat.area);
            let $slideTime = this.classifyData.time.indexOf(this.selectStat.time) === -1 ? 0 :  this.classifyData.time.indexOf(this.selectStat.time);
            let $slideActor = this.classifyData.actor.indexOf(this.selectStat.actor) === -1 ? 0 :  this.classifyData.actor.indexOf(this.selectStat.actor);
            this.$refs.navSwiper && 
            new Swiper(this.$refs.navSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            });
            this.$refs.typeSwiper &&
            new Swiper(this.$refs.typeSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            }).slideTo($slideType, 1000, false);
            this.$refs.areaSwiper && 
            new Swiper(this.$refs.areaSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            }).slideTo($slideArea, 1000, false);
            this.$refs.timeSwiper &&
            new Swiper(this.$refs.timeSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            }).slideTo($slideTime, 1000, false);
            this.$refs.actorSwiper &&
            new Swiper(this.$refs.actorSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            }).slideTo($slideActor, 1000, false);
            this.$refs.sortSwiper &&
            new Swiper(this.$refs.sortSwiper, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            });
        },
        requestHandle () {
            return Axios('classify', {
                method: 'post',
                data: {
                    classify: this.selectStat.nav,
                    type: this.selectStat.type || '',
                    region: this.selectStat.area || '',
                    age: this.selectStat.time || '',
                    actor: this.selectStat.actor || '',
                    recent: this.selectStat.sort || '',
                    page: ++this.requestPage
                }
            });
        },
        loadMore() {
            this.loading = true;
            if(!this.requestLock) {
                Toast('没有更多数据啦!');
                this.loading = false;
                return;
            }
            this.requestHandle().then(result => {
                if(result.length === 0) {
                    this.requestLock = false;
                    this.loading = false;
                    return;
                }
                if(result.video.length < 12) this.requestLock = false; 
                this.resData = this.resData.concat(result.video);
                this.loading = false;
            });
        },
        select (type,val) {
            // 请求锁重置。
            this.requestLock = true;
            this.requestPage = 0;
            if(type === 'nav') {
                this.selectStat[type] = val;
                this.selectStat['type'] = '全部';
                this.selectStat['area'] = '全部';
                this.selectStat['time'] = '全部';
                this.selectStat['actor'] = '全部';
                this.selectStat['sort'] = '最新播出';
                this.requestHandle().then(result => {
                    this.classifyData.type = result.type || [];
                    this.classifyData.area = result.region || [];
                    this.classifyData.time = result.age || [];
                    this.classifyData.actor = result.actor || [];
                    this.classifyData.sort = result.recent || [];
                    if(result.video.length < 12) this.requestLock = false;
                    this.resData = result.video;
                });
            }else {
                this.selectStat[type] = val;
                this.requestHandle().then(result => {
                    if(result.length === 0) {
                        this.resData = [];
                        return;
                    }
                    if(result.video.length < 12) this.requestLock = false; 
                    this.resData = result.video;
                });
            }
            this.classifyListTotal();
        },
        classifyListTotal () {
            const nav = this.selectStat.nav + ' · ';
            const type = this.classifyData.type.length !== 0 ? this.selectStat.type + ' · ' : '';
            const area = this.classifyData.area.length !== 0 ? this.selectStat.area + ' · ' : '';
            const time = this.classifyData.time.length !== 0 ? this.selectStat.time + ' · ' : '';
            const actor = this.classifyData.actor.length !== 0 ? this.selectStat.actor + ' · ' : '';
            const sort = this.classifyData.sort.length !== 0 ? this.selectStat.sort : '';
            return nav + type + area + time + actor + sort;
        },
        scrollCeilling () {
            window.onscroll =  () => {
                var btop = document.body.scrollTop||document.documentElement.scrollTop;
                const titleTop = lib.flexible.rem * 9.03;
                if( btop > titleTop) {
                    this.classifyFix = true;
                }else {
                    this.classifyFix = false;
                }
            }
        },
        routeGuide(item) {
            if(item.url) return;
            let o = {
                name: detailViewCompareTable[this.selectStat.nav],
                params: { id: item.id },
                query: { backEnable: true }
            };
            this.$router.push(o);
        },
        minHeightComputed() {
            const dom = (document.documentElement.clientHeight) / (lib.flexible.rem);
            const header = 1.22222;
            const classify = 0.851852 + (0.851852 + 0.314815) * 5 + 0.555556;
            const footer = 2.092593 + 1.62963;
            return (dom - (header + classify + footer) + 'rem');
        }
    },
    mounted () {
        this.init();
        this.scrollCeilling();
    }
}
</script>

<template>
    <div class="classify-container">
        <div class="classify">
            <header class="return-header">
                <div @click="$router.back()" class="return-icon-box">
                    <a href="javascript:void(0);" class="return-icon"></a>
                </div>
                <span class="return-title">{{ selectStat.nav }}</span>
                <i class="search-icon"></i>
            </header>
            <div v-if="classifyData.nav.length > 0" class="swiper-container" ref="navSwiper" id="stat0-swiper">
                <ul class="swiper-wrapper">
                    <li v-for="(item,index) in classifyData.nav" class="swiper-slide">
                        <a :class="{ active: selectStat.nav === item }" @click="select('nav',item)" href="javascript:void(0);">{{ item }}</a>
                    </li>
                </ul>
            </div>
            <section class="classify-list">
                <div v-if="classifyData.type.length > 0" class="swiper-container" ref="typeSwiper" id="stat1-swiper">
                    <ul class="swiper-wrapper">
                        <li v-for="(item,index) in classifyData.type" class="swiper-slide">
                            <a :class="{ active: selectStat.type === item }" @click="select('type',item)" href="javascript:void(0);">{{ item }}</a>
                        </li>
                    </ul>
                </div>
                <div v-if="classifyData.area.length > 0" class="swiper-container" ref="areaSwiper" id="stat2-swiper">
                    <ul class="swiper-wrapper">
                        <li v-for="(item,index) in classifyData.area" class="swiper-slide">
                            <a :class="{ active: selectStat.area === item }" @click="select('area',item)" href="javascript:void(0);">{{ item }}</a>
                        </li>
                    </ul>
                </div>
                <div v-if="classifyData.time.length > 0" class="swiper-container" ref="timeSwiper" id="stat3-swiper">
                    <ul class="swiper-wrapper">
                        <li v-for="(item,index) in classifyData.time" class="swiper-slide">
                            <a :class="{ active: selectStat.time === item }" @click="select('time',item)" href="javascript:void(0);">{{ item }}</a>
                        </li>
                    </ul>
                </div>
                <div v-if="classifyData.actor.length > 0" class="swiper-container" ref="actorSwiper" id="stat4-swiper">
                    <ul class="swiper-wrapper">
                        <li v-for="(item,index) in classifyData.actor" class="swiper-slide">
                            <a :class="{ active: selectStat.actor === item }" @click="select('actor',item)" href="javascript:void(0);">{{ item }}</a>
                        </li>
                    </ul>
                </div>
                <div v-if="classifyData.sort.length > 0" class="swiper-container" ref="sortSwiper" id="stat5-swiper">
                    <ul class="swiper-wrapper">
                        <li v-for="(item,index) in classifyData.sort" class="swiper-slide">
                            <a :class="{ active: selectStat.sort === item }" @click="select('sort',item)" href="javascript:void(0);">{{ item }}</a>
                        </li>
                    </ul>
                </div>
            </section>
            <div :class="{ exec: classifyFix }" class="classify-list-total">
                {{ classifyListTotal() }}
            </div>
            <section v-if="resData.length > 0" class="classify-result">
                <ul 
                    v-infinite-scroll="loadMore" 
                    infinite-scroll-distance="10"
                    class="m-pic-list">
                    <li v-for="(item,index) in resData" :key="index">
                        <div class="piclist-img">
                            <a 
                                :href="item.url" 
                                :title="item.title" 
                                @click="routeGuide(item)"
                                v-lazy:background-image="item.img"
                                class="piclist-link" >
                                <div class="c-lb">
                                    <span class="c-date c-date-score">
                                        <i class="score-item-before" v-if="item.score">{{ item.score | scoreBeforeFilter }}</i
                                        ><i class="score-item-after" v-if="item.score">{{ item.score | scoreAfterFilter }}</i>
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div class="piclist-title">
                            <div class="c-title">
                                <a 
                                    :href="item.url"
                                    @click="routeGuide(item)"
                                    class="text-ellipsis">
                                    {{ item.title }}
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <section v-if="resData.length === 0" class="no-result" :style="`min-height: ${minHeightComputed()}`">
                暂无对应的筛选结果，请尝试其他类型
            </section>
            <div v-if="resData.length > 0" class="loading">
                <img v-show="loading" src="~assets/images/loading.gif" width="100%" alt="">
            </div>
        </div>
        <base-footer></base-footer>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
    .classify {
        padding: 0 $gap;
        overflow: hidden;
        #stat0-swiper {
            border-bottom: $moduleBorder;
        }
        .classify-list {
            padding-bottom: .555556rem;
        }
    }
    .return-header {
        height: $headerHeight;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .return-title {
            margin-left: -1rem;
            font-weight: 600;
        }
        .return-icon-box {
            margin-left: .12963rem;
            padding: .266667rem 1rem .266667rem .266667rem;
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
        .search-icon {
            width: .37963rem;
            height: .37963rem;
            background-image: url('~assets/images/search-icon-black.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    #stat0-swiper {
        position: relative;
        overflow: inherit;
        &:after {
            content: ' ';
            position: absolute;
            left: -$gap;
            bottom: 0;
            width: 120%;
            height: 1px;
            background-color: #d9d9d9;
        } 
        .swiper-wrapper {
            justify-content: space-around;
        }
        .swiper-slide {
            width: auto;
            a {
                display: block;
                height: .851852rem;
                line-height: .851852rem;
                box-sizing: border-box;
                color: $baseColor;
                &.active {
                    color: $orange;
                    border-bottom: .055556rem solid $orange;
                }
            }
        }
    }
    
    #stat1-swiper,
    #stat2-swiper,
    #stat3-swiper,
    #stat4-swiper,
    #stat5-swiper
     {
         padding-top: .314815rem;
        .swiper-slide {
            width: auto;
            a {
                display: block;
                padding: .231481rem .5rem;
                height: .851852rem;
                box-sizing: border-box;
                color: $baseColor;
                &.active {
                    color: $orange;
                    background-color: #f5f5f5;
                    border-radius: .342593rem;
                }
            }
        }
    }

    .classify-result {
        margin-top: .555556rem;
        ul {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
                width: 32.35294117647059%;
                box-sizing: border-box;
                margin-right: .138889rem;
                &:nth-of-type(3n) {
                    margin-right: 0;
                }
            }
        }
        .piclist-img {
            position: relative;
            overflow: hidden;
            border-radius: $itemRadius;
            @include propor(150.3030303030303%);
            .piclist-link {
                @include piclink($boxShadow);
                @include c-lb($orange);
            }
        }
        .piclist-title {
            padding: .259259rem 0 .425926rem 0;
            .c-title {
                height: .425926rem;
                line-height: .425926rem;
                overflow: hidden;
                text-align: center;
                width: 100%;
                a {
                    display: block;
                    color: $baseColor;
                }
            }
        }   
    }
    /* 分类集合 */
    .classify-list-total {
        position: fixed;
        // top: 2.07rem;
        top: -0.962963rem;
        left: 0;
        z-index: 999;
        width: 100%;
        height: .962963rem;
        line-height: .962963rem;
        text-align: center;
        color: $orange;
        background-color: rgba(255,255,255, .8);
        transition: all .3s;
        &.exec {
            top: 0;
        }
    }
    .no-result {
        color: #999;
        line-height: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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

    .classify {
        .classify-list-total { font-size: 12px; }
        .return-header {
            font-size: 18px;
        }
        #stat0-swiper,
        #stat1-swiper,
        #stat2-swiper,
        #stat3-swiper,
        #stat4-swiper,
        #stat5-swiper
         {
            a {
                font-size: 14px;
            }
        }
        .no-result { font-size: 14px; }
    }

    
    [data-dpr="2"] .classify {
        .classify-list-total { font-size: 24px; }
        .return-header {
            font-size: 36px;
        }
        #stat0-swiper,
        #stat1-swiper,
        #stat2-swiper,
        #stat3-swiper,
        #stat4-swiper,
        #stat5-swiper {
            a {
                font-size: 28px;
            }
        }
        .no-result { font-size: 28px; }
    }
    [data-dpr="3"] .classify {
        .classify-list-total { font-size: 36px; }
        .return-header {
            font-size: 54px;
        }
        #stat0-swiper,
        #stat1-swiper,
        #stat2-swiper,
        #stat3-swiper,
        #stat4-swiper,
        #stat5-swiper
         {
            a {
                font-size: 42px;
            }
        }
        .no-result { font-size: 42px; }
    }
    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.classify');
</style>
