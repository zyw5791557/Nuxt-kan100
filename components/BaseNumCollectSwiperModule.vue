<script>
export default {
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
        init () {
            new Swiper('#base-collect-swiper'+this.loadData.id, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                roundLengths : true,
                observer:true,
                observeParents: true,
                scrollbar: {
                    el: this.$refs['base-collect-swiper-scrollbar'+this.loadData.id],
                    hide: true,
                },
            });
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.init();
        });
    }
}
</script>

<template>
    <section :class="{ pd: loadData.pd }" class="base-collect-swiper">
        <div class="mainer">
            <div class="header-module" v-if="loadData.type">
                <h2>{{ loadData.type }}</h2>
                <a v-if="loadData.headLinkName || loadData.headLinkIcon" @click="$emit('popup')" href="javascript:void(0);">
                    <span>{{ loadData.headLinkName }}</span>
                    <i v-if="$store.state.play_source.play_list.length > 0" :class="loadData.headLinkIcon"></i>
                </a>
            </div>
            <div :id="`base-collect-swiper${loadData.id}`" class="swiper-container">
                <ul class="swiper-wrapper">
                    <li v-if="($store.state.play_source.play_list.length > 0) && index < 100" v-for="(item,index) in $store.state.play_source.play_list" :key="index" class="swiper-slide">
                        <a :href="item.playurl" class="collect-item">{{ item.collect }}</a>
                    </li>
                    <li v-if="$store.state.play_source.play_list.length >= 100" class="swiper-slide">
                        <a @click="$emit('popup')" class="collect-item more-collect" href="javascript:void(0);">更多</a>
                    </li>
                </ul>
                <div :ref="`base-collect-swiper-scrollbar${loadData.id}`" class="swiper-scrollbar"></div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.base-collect-swiper {
    padding-top: $moduleTopPadding;
    &.pd {
        padding-top: 0;
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
                padding: .266667rem 0 .266667rem .266667rem;
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
                i.arrow {
                    width: .138889rem;
                    height: .138889rem;
                    border-right: .027778rem solid #999;
                    border-bottom: .027778rem solid #999;
                    transform: rotate(-45deg);
                }
            }
        }
    }
}
.swiper-container {
    padding: .324074rem 0 .518519rem 0;
    overflow: inherit;
}
.swiper-slide {
    width: 12.380952380952381%!important;
    margin-right: .351852rem;
    a {
        display: block;
        width: 1.203704rem;
        height: 1.203704rem;
        line-height: 1.203704rem;
        background-color: $collectBallColor;
        border-radius: 50%;
        color: $baseColor;
        text-align: center;
    }
}
// 更多
.more-collect {
    background-color: $orange!important;
    color: #fff!important;
}

    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.base-collect-swiper');
</style>
