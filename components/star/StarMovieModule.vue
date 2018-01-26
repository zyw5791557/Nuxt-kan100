<script>
export default {
    props: {
        data: Object,
        required: true
    },
    data () {
        return {
            loadMoreLock: false
        }
    },
    computed: {
        loadData () {
            this.loadMoreLock = true;
            return this.data;
        },
        requestPermission () {
            return (this.loadData.data.length % 12 !== 0) || (this.loadData.data.length === 0) ?  false : true;
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
    methods: {
        routeGuide(item) {
            let o = {
                name: this.loadData.itemRouteName ? this.loadData.itemRouteName : item.routeName,
                params: { id: item.id },
                query: { backEnable: this.loadData.backEnable }
            };
            return o;
        },
        loadMore () {
            if(this.requestPermission && this.loadMoreLock) {
                this.$emit('loadMore','movie');
                this.loadMoreLock = false;
                return true;
            }
            return false;
        }
    }
}
</script>

<template>
    <section class="starDetail-movie-module">
        <ul 
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            class="m-pic-list">
            <li v-for="(item,index) in loadData.data" :key="index">
                <div class="piclist-img">
                    <nuxt-link class="piclist-link" :to="routeGuide(item)" :title="item.title" v-lazy:background-image="item.img">
                        <div class="c-lb">
                            <span class="c-date c-date-score">
                                <i class="score-item-before" v-if="item.score">{{ item.score | scoreBeforeFilter }}</i
                                ><i class="score-item-after" v-if="item.score">{{ item.score | scoreAfterFilter }}</i>
                            </span>
                        </div>
                    </nuxt-link>
                </div>
                <div class="piclist-title">
                    <div class="c-title">
                        <nuxt-link class="text-ellipsis" :to="routeGuide(item)">{{ item.title }}</nuxt-link>
                    </div>
                </div>
            </li>
        </ul>
        <slot v-if="loadData.data.length === 0" name="noData"></slot>
        <slot name="loading"></slot>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.starDetail-movie-module {
    padding: .287037rem $gap 0;
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
    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.starDetail-movie-module');
</style>

