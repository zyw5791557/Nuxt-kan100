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
    methods: {
        init () {
            new Swiper('#base-person-swiper'+this.loadData.id, {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                roundLengths : true,
                observer:true,
                observeParents: true,
            });
        },
        routeGuide(item) {
            let o = {
                name: this.loadData.itemRouteName ? this.loadData.itemRouteName : item.routeName,
                params: { id: item.id },
                query: { backEnable: this.loadData.backEnable }
            };
            return o;
        },
    },
    mounted () {
        this.$nextTick(() => {
            this.init();
        });
    }
}
</script>

<template>
    <section :class="{ pd: loadData.pd }" class="base-person-swiper">
        <div class="mainer">
            <div class="header-module" v-if="loadData.type">
                <h2>{{ loadData.type }}</h2>
            </div>
            <div :id="`base-person-swiper${loadData.id}`" class="swiper-container">
                <ul class="swiper-wrapper">
                    <li v-for="(item,index) in loadData.personlistData" class="swiper-slide">
                        <nuxt-link :to="routeGuide(item)" :class="{ fire: index < 3 && loadData.fire }">
                            <img :src="item.img" alt="" width="100%">
                            <div class="c-title text-ellipsis">{{ item.realname ? item.realname : item.title }}</div>
                            <div v-if="item.actorname" class="c-sup text-ellipsis">饰 {{ item.actorname }}</div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.base-person-swiper {
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
        }
    }
}
.swiper-container {
    padding: .324074rem 0 .518519rem 0;
    overflow: inherit;
}
.swiper-slide {
    width: 16.952380952380952%!important;
    margin-right: .62963rem;
    a {
        display: block;
        color: $baseColor;
        text-align: center;
        img {
            width: 1.333333rem;
            height: 1.333333rem;
            min-width: 1.333333rem;
            min-height: 1.333333rem;
            background-image: url('~assets/images/default-avatar.gif');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            border-radius: 50%;
        }
        .c-title {
            margin-top: .277778rem;
        }
        .c-sup {
            @extend .c-title;
            color:#999;
        }
        &.fire:after {
            content: ' ';
            display: block;
            width: .333333rem;
            height: .425926rem;
            position: absolute;
            right: .092593rem;
            top: 0;
            background-image: url('~assets/images/fire.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
    }
}

    // 根据 data-dpr 设置字体大小
    @include moduleFontSize('.base-person-swiper');
</style>
