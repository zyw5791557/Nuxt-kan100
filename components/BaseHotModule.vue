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
        routeGuide(item, type) {
            if(item.url) return;
            let o1 = {
                name: this.loadData.itemRouteName ? this.loadData.itemRouteName : item.routeName,
                params: { id: item.id },
                query: { backEnable: this.loadData.backEnable }
            };
            let o2 = {
                name: 'NewsDetailView-id',
                params: { id: item.id },
                query: { backEnable: true }
            };
            if(type === 1) {
                this.$router.push(o1);
            } else if (type === 2) {
                this.$router.push(o2);
            }
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
    <section class="base-hot-module" :class="{ news: loadData.newsModule }" v-once>
        <div class="mainer">
            <div class="header-module">
                <h2>{{ loadData.type }}</h2>
                <nuxt-link :to="sideIconAction()" v-if="loadData.headLinkName || loadData.headLinkIcon">
                    <span>{{ loadData.headLinkName }}</span>
                    <i :class="loadData.headLinkIcon"></i>
                </nuxt-link>
            </div>
            <div class="m-pic-list">
                <ul>
                    <li v-for="(item,index) in loadData.piclistData" :key="index">
                        <div class="piclist-img">
                            <a 
                                :href="item.url" 
                                :title="item.title" 
                                @click="routeGuide(item,1)"
                                v-lazy:background-image="item.img"
                                class="piclist-link" >
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
                            </a>
                        </div>
                        <div class="piclist-title">
                            <div class="c-title" :class="{ 'text-ellipsis-2': loadData.ellipsis2 }">
                                <a 
                                    :href="item.url"
                                    :class="{ 'text-ellipsis': !loadData.ellipsis2 }"
                                    @click="routeGuide(item,1)">
                                    {{ item.title }}
                                </a>
                            </div>
                            <div class="c-info" v-if="item.des">
                                <a 
                                    :href="item.url"
                                    @click="routeGuide(item,1)"
                                    class="text-ellipsis" >
                                    {{ item.des }}
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="m-new-list" v-if="loadData.newsData">
                <ul>
                    <li v-for="(item,index) in loadData.newsData" :key="index">
                        <a 
                            :href="item.url" 
                            @click="routeGuide(item,2)"
                            class="text-ellipsis">
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
    .base-hot-module {
        &.news {
            padding-top: $moduleTopPadding;
            .mainer {
                border-bottom: none;
                 padding-bottom: 0;
                .m-pic-list {
                    border-bottom: $moduleBorder;
                    padding-bottom: $moduleBottomPadding;
                }
            }
        }
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
                    @include picItem(2n);
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

        
        .m-new-list {
            border-bottom: $moduleBorder;
            li {
                position: relative;
                text-indent: .259259rem;
                height: 1rem;
                line-height: 1rem;
                a {
                    display: block;
                    color: $baseColor;
                }
                &:before {
                    content: ' ';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    background-color: $baseColor;
                    width: .055556rem;
                    height: .055556rem;
                    border-radius: 50%;
                }
            }
        }

    }

    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.base-hot-module');
    
</style>
