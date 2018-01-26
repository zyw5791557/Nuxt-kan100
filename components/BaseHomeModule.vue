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
            loadData: this.data
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
        sideIconAction () {
            if(this.loadData.classifyGuide) {
                return this.loadData.classifyGuide;
            }else {
                return { name: 'index' };
            }
        }
    }
}
</script>

<template>
    <section class="base-home-module" v-once>
        <div class="mainer">
            <div class="header-module">
                <h2>{{ loadData.type }}</h2>
                <nuxt-link :to="sideIconAction()" v-if="loadData.headLinkName">
                    <span>{{ loadData.headLinkName }}</span>
                    <i :class="loadData.headLinkIcon"></i>
                </nuxt-link>
            </div>
            <div class="m-pic-list">
                <ul>
                    <li v-for="(item,index) in loadData.piclistData" :key="index" :class="{ branch: index === 0 }">
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
                            <div class="c-title" :class="{ 'text-ellipsis-2': loadData.ellipsis2 }">
                                <nuxt-link :class="{ 'text-ellipsis': !loadData.ellipsis2 }" :to="routeGuide(item)">{{ item.title }}</nuxt-link>
                            </div>
                            <div class="c-info"  v-if="item.des">
                                <nuxt-link class="text-ellipsis" :to="routeGuide(item)">{{ item.des }}</nuxt-link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
    .base-home-module {
        padding-top: $moduleTopPadding;
        .mainer {
            letter-spacing: 1px;
            margin: 0 $gap;
            padding-bottom: $moduleBottomPadding;
            border-bottom: $moduleBorder;
            .header-module {
                display: flex;
                justify-content: space-between;
                align-items: center;
                @include moduleHeader;
                h2 {
                    color: $baseColor;
                    font-size: 18px;
                    font-weight: 600;
                }
                a {
                    display: flex;
                    align-items: center;
                    color: $orange;
                    font-size: 14px;
                    i.change {
                        @include smallIcon('~assets/images/change.png');
                    }
                    i.more {
                        @include smallIcon('~assets/images/more.png');
                    }
                }
            }
        }
        .m-pic-list {
            margin-top: $piclistMarginTop;
            ul {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li {
                    @include picItem('2n+1');
                    &.branch {
                        width: 100%;
                        padding: 0;
                    }
                }
            }
            .piclist-img {
                position: relative;
                overflow: hidden;
                border-radius: $itemRadius;
                @include propor(56.46123260437376%);
                .piclist-link {
                    @include piclink($boxShadow);
                    @include c-rt($itemRadius);
                    @include c-lb($orange);
                }
            }
            @include picTitle($baseColor);
        }
    }

    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.base-home-module');
    
</style>
