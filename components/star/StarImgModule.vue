<script>
import { ImagePreview } from 'vant';
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            loadData: this.data
        }
    },
    computed: {
        requestPermission () {
            return this.loadData.length < 12 ?  false : true;
        },
        previewArr () {
            return Array.from(this.loadData, (item) => {
                return item.img;
            });    
        }
    },
    methods: {
        loadMore () {
            if(this.requestPermission) {
                this.$emit('loadMore','img');
                return true;
            }
            return true;
        },
        
        previewExec (index) {
            ImagePreview(this.previewArr,index);
        }
    }
}
</script>

<template>
    <section class="starDetail-img-module">
        <ul 
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            class="m-pic-list">
            <li v-for="(item,index) in loadData" :key="index">
                <a :style="`background-image:url(${item.img})`" @click="previewExec(index)" class="img-item" href="javascript:void(0);"></a>
            </li>
        </ul>
        <slot v-if="loadData.length === 0" name="noData"></slot>
        <slot name="loading"></slot>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.starDetail-img-module {
    padding: .287037rem $gap 0;
    .m-pic-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
            position: relative;
            width: 32.254901960784316%;
            @include propor(100%);
            margin-bottom: .148148rem;
            border-radius: $itemRadius;
        }
    }
    .img-item {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: $itemRadius;
    }
}
</style>

