<script>
export default {
    data () {
        return {
            navLinks: [
                {
                    name: '首页',
                    routerName: 'index'
                },
                {
                    name: '电影',
                    routerName: 'MovieView'
                },
                {
                    name: '电视剧',
                    routerName: 'TeleplayView'
                },
                {
                    name: '综艺',
                    routerName: 'ShowView'
                },
                {
                    name: '动漫',
                    routerName: 'AnimeView'
                },
                {
                    name: '明星',
                    routerName: 'StarView'
                },
                {
                    name: '搞笑',
                    routerName: 'FunnyView'
                },
                {
                    name: '资讯',
                    routerName: 'NewsView'
                },
                {
                    name: '专题',
                    routerName: 'SpecialView'
                }
            ],
            backEnable: false
        }
    },
    watch: {
        '$route' (to,from) {
            // 对路由变化做出响应
            if(this.$route.query.backEnable) {
                this.backEnable = true;
            }else {
                this.backEnable = false;
            }
        }
    },
    methods: {
        init() {
            new Swiper('#nav-swiper--head', {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
                observer:true,
                observeParents: true
            });
            if(this.$route.query.backEnable === 'true' || this.$route.query.backEnable === true) {
                this.backEnable = true;
            }else {
                this.backEnable = false;
            }
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
    <nav :class="{ backEnable: backEnable }" class="nav">
        <a class="back" @click="$router.back()">
            <i class="menu-back-icon"></i>
        </a>
        <div class="content">
            <div class="swiper-container" id="nav-swiper--head">
                <div class="swiper-wrapper">
                    <nuxt-link v-for="(item, index) in navLinks" :key="index" class="swiper-slide" :to="{ name: item.routerName }">{{ item.name }}</nuxt-link>
                </div>
            </div>
        </div>
        <nuxt-link class="moreLinks" to="">
            <i class="menu-more-icon"></i>
        </nuxt-link>
    </nav>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
    .backEnable {
        .swiper-slide:first-child {
            padding-left: .925926rem;
        }
        .back {
            position: absolute;
            z-index: 999;
            left: .277778rem;
            width: .925926rem;
            height: .851852rem;
            background: -webkit-linear-gradient(right, rgba(255,255,255,.7),rgba(255,255,255,1));
            .menu-back-icon {
                display: block;
                width: .925926rem;
                height: .851852rem;
                background: url('~assets/images/back.png') no-repeat left center;
                background-size: .222222rem .407407rem;
            }
        }
    }
    .swiper-slide {
        color: $baseColor;
        line-height: .851852rem;
        width: auto;
        margin-right: .518519rem;
        &:last-child {
            padding-right: .925926rem;
            margin-right: 0;
        }
        
        &.nuxt-link-exact-active {
            color: $orange;
            &:after {
                content: '';
                width: 100%;
                height: .055556rem;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 20px;
                background-color: $orange;
            }
        }
    }
    .nav {
        padding: 0 $gap;
        height: .851852rem;
        display: flex;
        justify-content: space-between;
        .content {
            width: 100%;
        }
        .moreLinks {
            position: absolute;
            z-index: 999;
            right: .277778rem;
            width: .925926rem;
            height: .851852rem;
            background: -webkit-linear-gradient(left, rgba(255,255,255,.7),rgba(255,255,255,1));
            .menu-more-icon {
                display: block;
                width: .925926rem;
                height: .851852rem;
                background: url('~assets/images/moreLinks.png') no-repeat right center;
                background-size: .333333rem .305556rem;
            }
        }
    }
    .swiper-slide {
        font-size: 16px;
    }

    [data-dpr="2"] .nav .swiper-slide {
        font-size: 32px;
    }

    [data-dpr="3"] .nav .swiper-slide {
        font-size: 48px;
    }
</style>
