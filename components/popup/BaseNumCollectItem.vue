<script>
import { chunk } from '~/util/util.js';
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            sortFlag: true,
            tabActiveNum: 0
        }
    },
    computed: {
        loadData () {
            return [...this.data.play_list];
        },
        collectChunk () {
            return chunk(this.loadData, 100);
        }
    },
    methods: {
        init(f) {
            if(f) {
                this.$refs["collect-num-tab"] && 
                new Swiper(this.$refs["collect-num-tab"],{
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    roundLengths : true,
                    observer:true,
                    observeParents: true
                });
                this.$refs["clips-swiper-module-noChunk"] && 
                new Swiper(this.$refs["clips-swiper-module-noChunk"],{
                    direction: 'vertical',
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    roundLengths : true,
                    observer:true,
                    observeParents: true
                });
            }
            this.$refs["clips-swiper-module-chunk"] && 
            new Swiper(this.$refs["clips-swiper-module-chunk"],{
                direction: 'vertical',
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                roundLengths : true,
                observer:true,
                observeParents: true
            }).slideTo(0, 1000, false);
        },
        sortCollect() {
            this.loadData.reverse();
            this.sortFlag = !this.sortFlag;
        },
        collectNumFilter (val) {
            const preVal  = val === 0 ? val : val + '01';
            const backVal = val === this.collectChunk.length - 1 ? val + '' + this.collectChunk.slice(-1)[0].length : (val + 1) + '00'; 
            const tip = '-';
            return preVal + tip + backVal;
        },
        selectCollectNum (index) {
            this.tabActiveNum = index;
            this.$nextTick(() => {
                this.init(false);
            });
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.init(true);
        });
    }
}
</script>

<template>
    <div class="popup-container">
        <div class="header-module">
            <div class="flex-left">
                <h2>选集</h2>
                <div @click="sortCollect" class="sort-box">
                    <a v-if="loadData.length <= 100" href="javascript:void(0);">{{ sortFlag ? '倒序' : '正序' }}</a>
                    <!-- <span>
                        <i :class="{ active: sortFlag }" class="fa fa-sort-asc" aria-hidden="true"></i>
                        <i :class="{ active: !sortFlag }" class="fa fa-sort-desc" aria-hidden="true"></i>
                    </span> -->
                </div>
            </div>
            <a @click="$emit('close')" class="close" href="javascript:void(0);"></a>
        </div>
        <div 
            v-if="loadData.length > 100" 
            ref="collect-num-tab" 
            class="collect-num-tab swiper-container">
            <div class="swiper-wrapper">
                <a 
                    v-for="(item, index) in collectChunk" 
                    :key="index" 
                    @click="selectCollectNum(index)" 
                    :class="{ active: tabActiveNum === index }" 
                    class="swiper-slide num-item" 
                    href="javascript:void(0);">
                    {{ collectNumFilter(index) }}集
                </a>
            </div>
        </div>
        <div v-if="loadData.length < 100" ref="clips-swiper-module-noChunk" id="clips-swiper-module" class="m-pic-list swiper-container">
            <div class="swiper-wrapper">
                <transition-group name="flip-list" tag="div" class="swiper-slide">
                    <a 
                        v-if="loadData.length > 0" 
                        v-for="(item,index) in loadData" 
                        :key="item.collect" 
                        :href="item.playurl" 
                        class="collect-item">
                        {{ item.collect }}
                    </a>
                </transition-group>
            </div>
        </div>
        <div v-else-if="loadData.length > 100" ref="clips-swiper-module-chunk" id="clips-swiper-module" class="m-pic-list swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <a 
                        v-for="(item,index) in collectChunk[tabActiveNum]" 
                        :key="item.collect" 
                        :href="item.playurl" 
                        class="collect-item">
                        {{ item.collect }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.popup-container {
    .header-module {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.185185rem;
        border-bottom: $moduleBorder;
        .flex-left {
            padding-left: $gap;
            display: flex;
            h2 {
                color: $baseColor;
                font-size: 18px;
                font-weight: 600;
            }
            .sort-box {
                display: flex;
                margin-left: .675926rem;
                a { color: $orange };
                span {
                    margin-left: .12037rem;
                    width: .12037rem;
                    position: relative;
                    i {
                        color: #b3b3b3;
                        &.active {
                            color: $orange;
                        }
                    }
                    .fa-sort-asc {
                        position: absolute;
                        left: 0;
                        top: .462963rem;
                    }
                    .fa-sort-desc {
                        position: absolute;
                        left: 0;
                        top: .537037rem;
                    }
                }
            }
        }
        .close {
            height: 1.185185rem;
            width: .351852rem;
            padding: 0 $gap*2;
            background-image: url('~assets/images/close.png');
            background-position: center;
            background-size: .351852rem .351852rem;
            background-repeat: no-repeat;
        }
    }
    .collect-num-tab {
        padding: .287037rem $gap 0;
        .num-item {
            width: 2.37037rem;
            height: .777778rem;
            line-height: .777778rem;
            text-align: center;
            color: $baseColor;
            background-color: #f5f5f5;
            border-radius: .777778rem;
            margin-right: .314815rem;
            border: solid 3px #f5f5f5;
            box-sizing: border-box;
            &:last-child { margin-right: 0; }
            &.active {
                color: $orange;
                border: solid 3px $orange;
                background-color: #fff;
            }
        }
    }
    #clips-swiper-module {
        padding: 0 .555556rem 0;
        margin-top: .287037rem;
        max-height: 10.87037rem;
        .swiper-slide {
            display: flex;
            flex-wrap: wrap;
        }
        a {
            margin-right: .712963rem;
            margin-bottom: .555556rem;
            width: 1.203704rem;
            height: 1.203704rem;
            line-height: 1.203704rem;
            background-color: $collectBallColor;
            border-radius: 50%;
            color: $baseColor;
            text-align: center;
            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    }
}

// 字体适配设置
.num-item {
    font-size: 14px;
}

[data-dpr="2"] .num-item {
    font-size: 28px;
}

[data-dpr="3"] .num-item {
    font-size: 42px;
}

@include moduleFontSize('.popup-container');
</style>

