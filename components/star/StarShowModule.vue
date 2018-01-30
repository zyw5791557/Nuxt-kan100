<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
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
                this.$emit('loadMore','show');
                this.loadMoreLock = false;
                return true;
            }
            return true;
        }
    }
}
</script>

<template>
    <section class="starDetail-show-module">   
        <div id="starDetail-show-swiper-module" class="m-pic-list swiper-container">
            <ul 
                v-infinite-scroll="loadMore" 
                infinite-scroll-distance="10"
                class="swiper-wrapper">
                <li v-for="(item,index) in loadData.data" :key="index" class="swiper-slide">
                    <div class="piclist-img">
                        <nuxt-link class="piclist-link" :to="routeGuide(item)" :title="item.title" v-lazy:background-image="item.img">
                            <div class="c-rt">
                                <i class="c-collect" v-if="item.catname">{{ item.catname }}</i>
                            </div>
                            <div class="c-lb">
                                <span class="c-date" v-if="item.collect">{{ item.collect }}</span>
                                <span class="c-date c-date-score">
                                    <i class="score-item-before" v-if="item.score">{{ item.score | scoreBeforeFilter }}</i
                                    ><i class="score-item-after" v-if="item.score">{{ item.score | scoreAfterFilter }}</i>
                                </span>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="piclist-title">
                        <div class="c-title text-ellipsis-2">
                            <nuxt-link :to="routeGuide(item)">{{ item.title }}</nuxt-link>
                        </div>
                        <div class="c-info" v-if="item.des">
                            <nuxt-link class="text-ellipsis" :to="routeGuide(item)">{{ item.des }}</nuxt-link>
                        </div>
                    </div>
                </li>
            </ul>
            <slot v-if="loadData.data.length === 0" name="noData"></slot>
            <slot name="loading"></slot>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.starDetail-show-module {
    padding: .287037rem $gap 0;
}
#starDetail-show-swiper-module {
    .swiper-slide {
        display: flex;
        justify-content: flex-start;
        margin-bottom: .277778rem;
    }
}
.swiper-wrapper {
    display: flex;
    flex-direction: column;
}
.m-pic-list {
    .piclist-img {
        flex-shrink: 0;
        width: 32%;
        position: relative;
        overflow: hidden;
        border-radius: $itemRadius;
        @include propor(55.95238095238095%);
        .piclist-link {
            width: 100%;
            height: 100%;
            @include piclink($boxShadow);
            @include c-rt($itemRadius);
            @include c-lb($orange);
        }
    }
    .piclist-title {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        margin-left: .314815rem;
        .c-title {
            line-height: .481481rem;
            overflow: hidden;
            a {
                display: block;
                color: $baseColor;
            }
        }
        .c-info {
            padding-top: .092593rem;
            height: .37037rem;
            line-height: .37037rem;
            overflow: hidden;
            a {
                display: block;
                color: #999;
            }
        }
    }
}

@include moduleFontSize('.starDetail-show-module');
</style>

