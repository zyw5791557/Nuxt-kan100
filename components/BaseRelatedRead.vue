<script>
export default {
    name: 'BaseRelatedRead',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        loadData () {
            return this.data;
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
        }
    }
}
</script>

<template>
    <div class="related-read">
        <div class="header-module">
            <h2>{{ loadData.type }}</h2>
        </div>
        <div class="m-pic-list">
            <ul>
                <li v-for="(item,index) in loadData.piclistData" :key="index">
                    <div class="piclist-img">
                        <nuxt-link class="piclist-link" :to="routeGuide(item)" :title="item.title" v-lazy:background-image="item.img">
                            <div class="c-rt">
                                <i class="c-collect" v-if="item.catname">{{ item.catname }}</i>
                            </div>
                            <div class="c-lb">
                                <span class="c-date" v-if="item.collect || item.long">{{ item.collect || item.long }}</span>
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
                        <span class="time">{{ item.inputtime }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';

.related-read {
    border-bottom: $moduleBorder;
    .header-module {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.185185rem;
        h2 {
            padding-left: $gap;
            color: $baseColor;
            font-size: 18px;
            font-weight: 600;
        }
    }
    .m-pic-list {
        padding: .287037rem $gap 0;
        max-height: 10.87037rem;
        ul {
            flex-direction: column;
            overflow-y: auto;
        }
        li {
            display: flex;
            justify-content: flex-start;
            margin-bottom: .277778rem;
        }
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
            overflow: hidden;
            margin-left: .314815rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
            .time {
                align-self: flex-end;
                text-align: right;
                color: $colorGray;
            }
        }
    }
}

// 字体大小设置
.time { font-size: 12px; }
[data-dpr="2"] .time { font-size: 24px; }
[data-dpr="3"] .time { font-size: 36px; }
@include moduleFontSize('.related-read');

</style>
