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
    }
}
</script>

<template>
    <section class="starDetail-news-module">
        <div class="m-pic-list">
            <ul>
                <li v-for="(item,index) in loadData.data" :key="index">
                    <div class="piclist-img">
                        <a :href="item.url" class="piclist-link" :title="item.title" v-lazy:background-image="item.img">
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
                        <div class="c-title" :class="{ 'text-ellipsis-2': loadData.ellipsisLines }">
                            <a :href="item.url" :class="{ 'text-ellipsis': !(loadData.ellipsisLines) }">{{ item.title }}</a>
                        </div>
                        <div class="c-info" v-if="item.des">
                            <a :href="item.url" class="text-ellipsis">{{ item.des }}</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.m-pic-list {
    padding: .287037rem $gap 0;
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
    .c-title {
        line-height: .481481rem!important;
        overflow: hidden;
    }
    @include picTitle($baseColor);
}
    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.starDetail-news-module');
</style>

