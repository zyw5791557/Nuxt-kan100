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
            type: ''
        }
    },
    computed: {
        loadData () {
            if(this.data.play_list) {
                this.type = '选集';
                return this.data.play_list;
            } else if(this.data.piclistData) {
                this.type = '片花资讯';
                return this.data.piclistData;
            }
        }
    },
    methods: {
        init() {
            new Swiper('#clips-swiper-module' + this.loadData.id,{
                direction: 'vertical',
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',    
                roundLengths : true,
                observer:true,
                observeParents: true,
                scrollbar: {
                    el: this.$refs['clips-swiper-module-scrollbar' + this.loadData.id],
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
    <div class="popup-container">
        <div class="header-module">
            <h2>{{ type }}</h2>
            <a @click="$emit('close')" href="javascript:void(0);"></a>
        </div>
        <div :id="`clips-swiper-module${loadData.id}`" class="m-pic-list swiper-container">
            <ul class="swiper-wrapper">
                <li v-for="(item,index) in loadData" :key="index" class="swiper-slide">
                    <div class="piclist-img">
                        <a class="piclist-link" :href="item.playurl || item.url" :title="item.title" v-lazy:background-image="item.img">
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
                        </a>
                    </div>
                    <div class="piclist-title">
                        <div class="c-title text-ellipsis-2">
                            <a :href="item.playurl">{{ item.title }}</a>
                        </div>
                        <div class="c-info" v-if="item.des">
                            <a class="text-ellipsis" :href="item.playurl">{{ item.des }}</a>
                        </div>
                    </div>
                </li>
            </ul>
            <div :ref="`clips-swiper-module-scrollbar${loadData.id}`" class="swiper-scrollbar"></div>
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
        h2 {
            padding-left: $gap;
            color: $baseColor;
            font-size: 18px;
            font-weight: 600;
        }
        a {
            height: 1.185185rem;
            width: .351852rem;
            padding: 0 $gap*2;
            background-image: url('~assets/images/close.png');
            background-position: center;
            background-size: .351852rem .351852rem;
            background-repeat: no-repeat;
        }
    }
    .swiper-container {
        padding: .287037rem $gap 0;
        max-height: 10.87037rem;
        .swiper-wrapper { 
            flex-direction: column;
            overflow-y: auto;
        }
        .swiper-slide {
            display: flex;
            justify-content: flex-start;
            margin-bottom: .277778rem;
        }
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
}

@include moduleFontSize('.popup-container');


</style>

