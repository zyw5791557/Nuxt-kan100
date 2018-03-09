<script>
export default {
    name: 'BaseReadSwitches',
    props: {
        previousData: {
            type: Object,
            required: true
        },
        previousText: {
            type: String,
            default: '上一篇'
        },
        nextData: {
            type: Object,
            required: true
        },
        nextText: {
            type: String,
            default: '下一篇'
        }
    },
    computed: {
        previous_page () {
            return this.previousData;
        },
        next_page () {
            return this.nextData;
        }
    },
    methods: {
        routeGuide(item) {
            let o = {
                name: 'NewsDetailView-id',
                params: { id: item.id },
                query: { backEnable: true }
            };
            return o;
        }
    }
}
</script>

<template>
    <div class="switches-container">
        <div class="switches-box">
            <nuxt-link v-if="previous_page.id" :to="routeGuide(previous_page)" replace>
                <i class="more previous"></i>
                <div>
                    <span>{{ previousText }}</span>
                    <p class="title">{{ previous_page.title }}</p>
                </div>
            </nuxt-link>
            <nuxt-link v-if="next_page.id" :to="routeGuide(next_page)" replace>
                <div>
                    <span>{{ nextText }}</span>
                    <p class="title">{{ next_page.title }}</p>
                </div>
                <i class="more"></i>
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.switches-container {
    margin: 0 $gap;
    padding: $moduleGap 0;
    border-bottom: $moduleBorder;
    .switches-box {
        display: flex;
        justify-content: flex-start;
    }
    a {
        flex: 1;
        color: $baseColor;
        display: flex;
        justify-content: flex-start;
        &:nth-child(1) {
            text-align: left;
            padding-right: .787037rem;
            border-right: $moduleBorder;
            div { margin-left: .166667rem; }
        }
        &:nth-child(2) {
            text-align: right;
            padding-left: .787037rem;
            div { margin-right: .166667rem; }
        }
        .more {
            @include smallIcon('~assets/images/more.png');
            flex-shrink: 0;
            &.previous {
                transform: rotate(180deg);
                -o-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
            }
        }
        span { color: $colorGray; }
        .title {
            @include text-ellipsis-n(2);
            margin-top: .259259rem;
            line-height: .388889rem;
        }
    }
}

// 字体大小设置

.switches-container {
    span,p { font-size: 12px; }
}

[data-dpr="2"] .switches-container {
    span,p { font-size: 24px; }
}

[data-dpr="3"] .switches-container {
    span,p { font-size: 36px; }
}

</style>
