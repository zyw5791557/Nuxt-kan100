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
            wikiFold: true,
        }
    },
    computed: {
        loadData () {
            return this.data;
        },
        current_source () {
            return this.loadData.sourceArr[0]
        },
        foldText() {
            if(this.wikiFold) {
                return '展开';
            }else {
                return '收起';
            }
        }
    }
}
</script>

<template>
    <section class="wiki-module">
        <div class="wiki-card">
            <div class="wiki-mask">
                <div class="img-mask"></div>
                <div class="color-mask"></div>
            </div>
            <div class="wiki-main">
                <img :src="loadData.img" :alt="loadData.title">
                <div class="card-info">
                    <div v-if="loadData.title" class="c-title-box">
                        <h1 class="c-title text-ellipsis">
                            {{ loadData.title }}
                        </h1>
                        <!-- <span v-if="loadData.meta" class="c-meta">{{ loadData.meta }}</span> -->
                    </div>
                    <p v-if="loadData.score" class="c-score">
                        <i>豆</i><span>{{ loadData.score }}</span>分
                    </p>
                    <p v-if="loadData.type" class="c-type">{{ loadData.type }}</p>
                    <p v-if="loadData.release" class="c-release">{{ loadData.release }}</p>
                    <p v-if="loadData.time" class="c-time">{{ loadData.time }}</p>
                    <a v-if="$store.state.play_source.play_list !== undefined" class="playBtn" :href="$store.state.play_source.play_list[0].playurl">立即播放</a>
                    <a v-if="$store.state.play_source.play_list === undefined" class="noplayBtn">暂无资源</a>
                    <!-- <a class="shareBtn" href="javascript:void(0);">分享</a> -->
                    <a @click="$emit('popup')" v-if="$store.state.play_source.channel !== undefined" :class="$store.state.play_source.channel" class="sourceBtn" href="javascript:void(0);">
                        {{ $store.state.play_source.channel_name }}
                    </a>
                </div>
            </div>
        </div>
        <div class="wiki-des">
            <p :class="{ 'text-ellipsis-n': wikiFold }" v-html="loadData.des" class="wiki-text"></p>
            <a @click="wikiFold=!wikiFold" class="fold" href="javascript:void(0);">{{ foldText }}</a>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.wiki-module {
    border-bottom: $moduleBorder;
}
.wiki-des,
.wiki-card {
    padding: 0 $gap;
}
.wiki-card {
    position: relative;
    width: 100%;
    height: 4.592593rem;
    box-sizing: border-box;
    padding-top: .462963rem;
    margin-bottom: 1.916667rem;
}
.wiki-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .img-mask {
        position: absolute;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-image:url('~assets/images/common_bg.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .color-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .2;
    }
}
.wiki-main {
    position: relative;
    z-index: 100;
    display: flex;
    img {
        flex-shrink: 0;
        width: 3.685185rem;
        height: 5.518519rem;
        border-radius: .111111rem;
        box-shadow: .066667rem .066667rem .266667rem rgba(0, 0, 0, 0.3);
    }
}
.card-info {
    flex: 1;
    position: relative;
    letter-spacing: 1px;
    margin-left: .398148rem;
    padding-top: .25rem;
    color: #fff;
    p {
        line-height: .533333rem;
    }
    .c-title-box {
        display: flex;
        align-items: center;
        .c-title {
            max-width: 4.37037rem;
            line-height: .666667rem;
            height: .666667rem;
        }
        // .c-meta {
        //     margin-left: .203704rem;
        //     width: 1.018519rem;
        //     height: .425926rem;
        //     text-align: center;
        //     line-height: .425926rem;
        //     background-color: $orange;
        //     border-radius: .092593rem;
        // }
    }
    .c-score {
        line-height: .666667rem;
        display: flex;
        align-items: baseline;
        i {
            width: .333333rem;
            height: .333333rem;
            line-height: .333333rem;
            text-align: center;
            border-radius: 50%;
            background-color: #2aae33;
            vertical-align: baseline;
        }
        span {
            align-self: flex-end; 
            margin: 0 .148148rem;
        }
    }
    .playBtn {
        position: absolute;
        left: 0;
        bottom: .981481rem;
        width: 3.5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: .092593rem;
        text-align: center;
        background-color: $orange;
        color: #fff;
    }
    .noplayBtn {
        position: absolute;
        left: 0;
        bottom: .981481rem;
        width: 3.5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: .092593rem;
        text-align: center;
        background-color: #aaa;
        color: #fff;
    }
    .shareBtn {
        text-indent: -1333.32rem;
        position: absolute;
        right: 0;
        bottom: 1.657407rem;
        width: .87037rem;
        height: .87037rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        background-image: url('~assets/images/share.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: .472222rem .407407rem, 
    }
    .sourceBtn {
        position: absolute;
        left: 0;
        bottom: .148148rem;
        color: $baseColor;
        padding: 0 .38037rem 0 .7rem;
        height: .518519rem;
        line-height: .518519rem;
        background-image: url('~assets/images/source-icon.png');
        background-repeat: no-repeat;
        background-size: .533333rem 32.533333rem;
        &:after {
            content: ' ';
            position: absolute;
            right: 0;
            top: .10rem;
            width: .196419rem;
            height: .196419rem;
            transform: rotate(-135deg);
            border-left: .027778rem solid #999;
            border-top: .027778rem solid #999;
        }
        @include sourceIcon;
    }
}
.wiki-des {
    padding-bottom: .185185rem;
    .wiki-text {
        line-height: .611111rem;
        &.text-ellipsis-n {
            @include text-ellipsis-n(3);
        }
    }
    .fold {
        display: block;
        text-align: center;
        color: $orange;
        height: .611111rem;
        line-height: .611111rem;
    }
}

.wiki-module {
    .c-title {
        font-size: 18px;
    }
    .c-meta {
        font-size: 11px;
    }
    .c-score {
        font-size: 12px;
        i {
            font-size: 8px;
        }
        span {
            font-size: 21px;
        }
    }
    .c-type,
    .c-release,
    .c-time,
    .sourceBtn {
        font-size: 12px;
    }
    .playBtn,
    .noplayBtn {
        font-size: 17px;
    }
    .wiki-text {
        font-size: 14px;
    }
}
[data-dpr="2"] .wiki-module {
    .c-title {
        font-size: 36px;
    }
    .c-meta {
        font-size: 22px;
    }
    .c-score {
        font-size: 24px;
        i {
            font-size: 16px;
        }
        span {
            font-size: 42px;
        }
    }
    .c-type,
    .c-release,
    .c-time,
    .sourceBtn,
    .noplayBtn {
        font-size: 24px;
    }
    .playBtn {
        font-size: 34px;
    }
    .wiki-text {
        font-size: 28px;
    }
}
[data-dpr="3"] .wiki-module {
    .c-title {
        font-size: 54px;
    }
    .c-meta {
        font-size: 33px;
    }
    .c-score {
        font-size: 36px;
        i {
            font-size: 24px;
        }
        span {
            font-size: 63px;
        }
    }
    .c-type,
    .c-release,
    .c-time,
    .sourceBtn,
    .noplayBtn {
        font-size: 36px;
    }
    .playBtn {
        font-size: 51px;
    }
    .wiki-text {
        font-size: 42px;
    }
}
</style>
