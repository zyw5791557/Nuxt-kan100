<script>
export default {
    name: 'BaseSpecialPoster',
    props: {
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        img: {
            type: String
        },
        author: {
            type: String
        },
        views: {
            type: Number
        },
        likes: {
            type: Number
        },
        collections: {
            type: Number
        }
    }
}
</script>

<template>
    <div class="poster-container" :style="`background-image: url(${ img })`">
        <div class="poster-box">
            <h1 v-if="title">{{ title }}</h1>
            <p v-if="subtitle">{{ subtitle }}</p>
            <div class="icon-list">
                <span v-if="views">{{ views }}</span>
                <span v-if="likes">{{ likes }}</span>
                <span v-if="collections">{{ collections }}</span>
            </div>
            <span v-if="author" class="author">制作人： {{ author }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.poster-container {
    padding-top: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .poster-box {
        position: absolute;
        left: .277778rem;
        bottom: .462963rem;
        h1 {
            color: #fff;
            border-left: .111111rem solid #fff;
        }
        > * {
            padding-left: .351852rem;
            margin-bottom: .342593rem;
        }
        p {
            color: $color-text-l;
        }
        .icon-list {
            color: $color-text-d;
            span {
                padding-left: .388889rem;
                background-repeat: no-repeat;
                background-position: left center;
                margin-right: .509259rem;
            }
            span:nth-child(1) {
                padding-left: .425926rem;
                background-image: url('~assets/images/read.png');
            }
            span:nth-child(2) {
                background-image: url('~assets/images/love.png');
            }
            span:nth-child(3) {
                background-image: url('~assets/images/star.png');
            }
        }
        .author {
            color: $color-text-d;
            margin-bottom: 0;
        }
    }
}

// 字体大小设置
.poster-box {
    h1 { font-size: 20px; }
    p { font-size: 14px; }
    .icon-list span, .author { font-size: 10px }
}
[data-dpr="2"] .poster-box {
    h1 { font-size: 40px; }
    p { font-size: 28px; }
    .icon-list span, .author { font-size: 20px }
}
[data-dpr="3"] .poster-box {
    h1 { font-size: 60px; }
    p { font-size: 42px; }
    .icon-list span, .author { font-size: 30px }
}

</style>
