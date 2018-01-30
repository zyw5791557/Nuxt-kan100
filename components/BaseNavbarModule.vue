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
            selected: 1,
            movieLock: true,
            teleplayLock: true,
            actorLock: true,
        }
    },
    watch: {
        movieIndex (val) {
            this.movieLock = true;
        },
        teleplayIndex (val) {
            this.teleplayLock = true;
        },
        actorIndex (val) {
            this.actorLock = true;
        }
    },
    computed: {
        loadData () {
            return this.data;
        },
        movieIndex () {
            return this.loadData.movieData.length;
        },
        teleplayIndex () {
            return this.loadData.teleplayData.length;
        },
        actorIndex () {
            return this.loadData.actorData.length;
        },
        currentData () {
            switch (~~this.selected) {
                case 1:
                    return this.loadData.movieData;
                    break;
                case 2:
                    return this.loadData.teleplayData;
                    break;
                case 3:
                    return this.loadData.actorData;
                    break;
            }
        },
        requestPermission () {
            return (this.currentData.length % 3 !== 0) || (this.currentData.length === 0) ?  false : true;
        }
    },
    filters: {
        scoreBeforeFilter (val) {
            return val.substr(0,2);
        },
        scoreAfterFilter (val) {
            return val.substr(-1);
        }
    },
    methods: {
        routeGuide(item) {
            let o = {
                name: this.loadData.itemRouteName ? this.loadData.itemRouteName : item.routeName,
                params: { id: item.id },
                query: { backEnable: this.loadData.backEnable }
            };
            return o;
        },
        loadMore () {
            const current = this.loadData.navbarTitleArr[this.selected - 1];
            if(current === '电影专题') {
                if(this.requestPermission && this.movieLock) {
                    this.$emit('loadMore', current);
                    this.movieLock = false;
                    return true;
                }
            } else if (current === '电视剧专题') {
                 if(this.requestPermission && this.teleplayLock) {
                    this.$emit('loadMore', current);
                    this.teleplayLock = false;
                    return true;
                }
            }else {
                 if(this.requestPermission && this.actorLock) {
                    this.$emit('loadMore', current);
                    this.actorLock = false;
                    return true;
                }
            }
            return false;
        }
    }
}
</script>

<template>
    <section class="navbar-module">
        <div class="nav-title-box">
            <a 
                v-for="(item,index) in loadData.navbarTitleArr"
                :key="index" 
                :id="(index+1).toString()"
                @click="selected = index + 1"
                :class="{ active: selected === index + 1 }"
                class="nav-title"
                href="javascript:void(0);">
                {{ item }}
            </a>
        </div>
        <div class="m-pic-list">
            <ul
                v-waterfall-lower="loadMore"
                waterfall-disabled="disabled"
                waterfall-offset="400">
                <li v-for="(item,index) in currentData" :key="index" class="branch">
                    <div class="piclist-img">
                        <nuxt-link class="piclist-link" :to="routeGuide(item)" :title="item.title" v-lazy:background-image="item.img">
                            <div class="c-rt">
                                <i class="c-collect" v-if="item.catname">{{ item.catname }}</i>
                            </div>
                            <div class="c-lb">
                                <span class="c-date" v-if="item.collect">{{ item.collect }}</span>
                                <span class="c-date c-date-score">
                                    <i class="score-item-before" v-if="item.score">{{ item.score | scoreBeforeFilter }}</i
                                    ><i class="score-item-after" v-if="item.score">{{ item.score | scoreAfterFilter }}</i>
                                </span>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="piclist-title">
                        <div class="c-title" :class="{ 'text-ellipsis-2': loadData.ellipsis2 }">
                            <nuxt-link :class="{ 'text-ellipsis': !loadData.ellipsis2 }" :to="routeGuide(item)">{{ item.title }}</nuxt-link>
                        </div>
                        <div class="c-info"  v-if="item.des">
                            <nuxt-link class="text-ellipsis" :to="routeGuide(item)">{{ item.des }}</nuxt-link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
@import '~assets/css/mixins.scss';
.navbar-module {
    .nav-title-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: $moduleBorder;
    }
    .nav-title {
        color: $baseColor;
        width: 33.3%;
        text-align: center;
        padding: 0 0 .407407rem 0;
        box-sizing: border-box;
        border-color: #fff;
        border-width: .055556rem;
        border-bottom-style: solid;
        &.active {
            color: $orange;
            border-color: $orange;
            border-bottom-style: solid;
        }
    }
    
    .m-pic-list {
        margin-top: $piclistMarginTop;
        padding: 0 $gap;
        ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                @include picItem('2n+1');
                &.branch {
                    width: 100%;
                    padding: 0;
                }
            }
        }
        .piclist-img {
            position: relative;
            overflow: hidden;
            border-radius: $itemRadius;
            @include propor(56.46123260437376%);
            .piclist-link {
                @include piclink($boxShadow);
                @include c-rt($itemRadius);
                @include c-lb($orange);
            }
        }
        @include picTitle($baseColor);
    }
}

@include moduleFontSize('.navbar-module');
</style>

<style lang="scss">
/* 字体大小调整 */
.navbar-module {
    .nav-title {
        font-size: 18px;
    }
}
[data-dpr="2"] .navbar-module {
    .nav-title {
        font-size: 36px;
    }
}
[data-dpr="3"] .navbar-module {
    .nav-title {
        font-size: 54px;
    }
}
</style>
