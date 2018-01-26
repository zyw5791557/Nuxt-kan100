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
        baseInfoFilter (val) {
            if(typeof val === 'string') {
                return val
            }else {
                return val.join('<br />');
            }
        }
    }
}
</script>

<template>
    <section class="starDetail-info-module">
        <div class="info-base">
            <div class="info-base-wrap">
                <div
                    v-if="index !== 'introduce'" 
                    v-for="(item,index) in loadData"
                    :class="{ master: ['代表作品','绯闻男友','主要成就'].indexOf(index) !== -1 }">
                    <div class="info-base-item info-base-item-dt">
                        {{ index }}：
                    </div>
                    <div class="info-base-item info-base-item-dd" v-html="baseInfoFilter(item)">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="info-introduce" v-html="loadData.introduce">

        </div>
        <slot v-if="loadData['中文名'] === undefined" name="noData"></slot>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.starDetail-info-module {
    padding: .37037rem $gap;
    .info-base {
        margin-bottom: .6rem;
        .info-base-wrap {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            & > div {
                width: 50%;
                display: flex;
                justify-content: flex-start;
                line-height: .611111rem;
                &.master {
                    width: 100%;
                    .info-base-item-dt {
                        width: 22%;
                    }
                    .info-base-item-dd {
                        width: 78%;
                    }
                }
            }
        }
        .info-base-item {
            flex-shrink: 0;
            &.info-base-item-dt {
                width: 44%;
                text-align: left;
            }
            &.info-base-item-dd {
                width: 56%;
                text-align: left;
            }
        }
    }
    .info-introduce {
        line-height: .611111rem;
    }
}

/* 字体大小设置 */
.starDetail-info-module {
    .info-introduce,
    .info-base-item {
        font-size: 14px;
    }
    .info-introduce { text-indent: 25px; }
}
[data-dpr="2"] .starDetail-info-module {
    .info-introduce,
    .info-base-item {
        font-size: 28px;
    }
    .info-introduce { text-indent: 50px; }
}
[data-dpr="3"] .starDetail-info-module {
    .info-introduce,
    .info-base-item {
        font-size: 42px;
    }
    .info-introduce { text-indent: 75px; }
}
</style>
<style lang="scss">
.starDetail-info-module {
    .info-introduce {
        p {
            margin-bottom: .648148rem;
        }
    }
}
</style>


