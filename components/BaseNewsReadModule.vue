<script>
export default {
    name: 'BaseNewsReadModule',
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String
        },
        inputtime: {
            type: String
        },
        content: {
            type: String,
            required: true
        },
        tags: {
            type: Array
        }
    }
}
</script>

<template>
    <div class="news-read">
        <div class="head-box">
            <h1>{{ title }}</h1>
            <p>
                <span class="time">{{ inputtime }}</span>
                <span class="author">{{ author }}</span>
            </p>
        </div>
        <div class="read-main" v-html="content">

        </div>
        <div v-if="tags.length > 0" class="read-tags">
            <span class="title">相关标签</span>
            <a v-for="(item,index) in tags" :key="index" href="javascript:void(0);">{{ item }}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.news-read  {
    margin: .185185rem $gap 0;
    line-height: .703704rem;
    .head-box {
        padding-bottom: $moduleGap;
        border-bottom: $moduleBorder;
        h1 {
            color: $baseColor;
            margin-bottom: .444444rem;

        }
        p {
            color: $colorGray;
            .author { margin-left: .240741rem; }
        }
    }
    .read-tags {
        border-top: $moduleBorder;
        border-bottom: $moduleBorder;
        padding: $moduleGap 0;
        .title {
            color: $colorGray;
            display: flex;
            margin-bottom: .231481rem;
        }
        a {
            padding: .148148rem .296296rem;
            border: solid 1px #e6e6e6;
            border-radius: .592593rem;
            color: $tagColor;
            background-color: $tagBackground;
            margin-right: .092593rem;
        }
    }
}

// 字体大小设置
.news-read  {
    .head-box {
        h1 { font-size: 19px; }
        p { font-size: 12px; }
    }
    .read-tags {
        .title,a { font-size: 12px; }
    }
}
[data-dpr="2"] .news-read  {
    .head-box {
        h1 { font-size: 38px; }
        p { font-size: 24px; }
    }
    .read-tags {
        .title,a { font-size: 24px; }
    }
}
[data-dpr="3"] .news-read  {
    .head-box {
        h1 { font-size: 57px; }
        p { font-size: 36px; }
    }
    .read-tags {
        .title,a { font-size: 36px; }
    }
}
</style>

<style lang="scss">
@import '~assets/css/vars.scss';
.news-read {
    .read-main {
        padding-top: $moduleGap;
        padding-bottom: $moduleGap;
        line-height: .8rem;
        div,
        p { color: $baseColor; }
        img { width: 100%; }
        a { color: $orange; }
        iframe {
            width: 100%!important;
            height: 5.333333rem!important;
        }
    }
}

// 字体大小设置
.news-read  {
    .read-main {
        div,
        p { font-size: 16px; }
    }
}
[data-dpr="2"] .news-read  {
    .read-main {
        div,
        p { font-size: 32px; }
    }
}
[data-dpr="3"] .news-read  {
    .read-main {
        div,
        p { font-size: 48px; }
    }
}
</style>

