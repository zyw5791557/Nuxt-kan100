<script>
export default {
    name: 'BaseSpecialWiki',
    props: {
        editorials: {
            type: String
        },
        description: {
            type: String
        }
    }
}
</script>

<template>
    <div class="poster-wiki">
        <div v-if="editorials" class="author-wiki">
            <h1>编者按</h1>
            <p>{{ editorials }}</p>
        </div>
        <div v-if="description" class="intro">
            <h1>简介</h1>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.poster-wiki {
    padding: 0 $gap;
    .author-wiki,
    .intro {
        border-bottom: $moduleBorder;
        padding-bottom: $moduleGap;
        h1 {
            margin: .462963rem 0;
            font-weight: bold;
        }
        p { line-height: .666667rem; }
        > * {
            color: $baseColor;
        }
    }
}

// 字号
.poster-wiki {
    h1 { font-size: 16px; }
    p { font-size: 14; }
}
[data-dpr="2"] .poster-wiki {
    h1 { font-size: 32px; }
    p { font-size: 28; }
}
[data-dpr="3"] .poster-wiki {
    h1 { font-size: 48px; }
    p { font-size: 42px; }
}
</style>
