<script>
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
    methods: {
        sideIconAction (item) {
            if(item.classifyGuide) {
                return item.classifyGuide;
            }else {
                return { name: 'index' };
            }
        }
    }
}
</script>

<template>
    <section class="base-nav--type">
        <div class="nav-list">
            <nuxt-link v-for="(item,index) in loadData" :key="index" :to="sideIconAction(item)" class="nav-btn">{{ item.name }}</nuxt-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.base-nav--type {
    padding: 0 $gap;
    // margin-bottom: .416667rem;
    .nav-list {
        display: flex;
        justify-content: space-between;
        padding: .138889rem 0 .555556rem 0;
        border-bottom: $moduleBorder;
    }
    a {
        width: 1.638889rem;
        height: .777778rem;
        line-height: .777778rem;
        text-align: center;
        background-color: #f5f5f5;
        border-radius: .342593rem;
        color: $baseColor;
        &:last-child {
            color: $orange;
            &.noActive{
                color: $baseColor;
            }
        }
    }
}

.nav-btn {
    font-size: 13px;
}

[data-dpr="2"] .nav-btn {
    font-size: 26px;
}

[data-dpr="3"] .nav-btn {
    font-size: 39px;
}


</style>