<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '@/components/BaseBanner';
import BaseNavbarModule from '@/components/BaseNavbarModule';
/**@data
 * bannerModuleData     轮播数据
 * navbarModuleData     navbar
 */
export default {
    components: {
        BaseBanner,
        BaseNavbarModule
    },
    asyncData ({ route }, callback) {
        Axios('special', {
            method: 'post',
            data: {
                category: '电影专题',
                page: 1
            }
        }).then(result => {
            callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    itemRouteName: 'SpecialDetailView-id',
                    piclistData: result.index_slideshow
                },
                navbarModuleData: {
                    backEnable: true,
                    itemRouteName: 'SpecialDetailView-id',
                    navbarTitleArr: ['电影专题','电视剧专题','影人专题'],
                    movieData: result.movies,
                    teleplayData:result.tv,
                    actorData: result.actor
                }
            });
        }).catch(error => {
            callback()
        });
    },
    data () {
        return {
            loading: false,
            moviePage: 1,
            teleplayPage: 1,
            actorPage: 1
        }
    },
    methods: {
        loadMore (type) {
            this.loading = true;
            let page = null;
            switch (type) {
                case '电影专题':
                    page = ++this.moviePage
                    break;
                case '电视剧专题':
                    page = ++this.teleplayPage
                    break;
                case '影人专题':
                    page = ++this.actorPage
                    break;
            }
            Axios('special', {
                method: 'post',
                data: {
                    category: type,
                    page: page
                }
            }).then(result => {
                switch (type) {
                    case '电影专题':
                        this.navbarModuleData.movieData = this.navbarModuleData.movieData.concat(result.movies);
                        break;
                    case '电视剧专题':
                        this.navbarModuleData.teleplayData = this.navbarModuleData.teleplayData.concat(result.tv);
                        break;
                    case '影人专题':
                        this.navbarModuleData.actorData = this.navbarModuleData.actorData.concat(result.actor);
                        break;
                }
                this.loading = false;
            });
        }
    }
}
</script>

<template>
    <div class="container">
        <base-banner v-if="bannerModuleData.piclistData.length > 0" :data="bannerModuleData"></base-banner>
        <base-navbar-module 
            :data="navbarModuleData"
            @loadMore="loadMore">
        </base-navbar-module>
        <div v-if="loading" class="loading">
            <img v-show="loading" src="~assets/images/loading.gif" width="100%" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.296296rem;
    img {
        display: block;
        width: .518519rem;
        height: .518519rem;
        border-radius: 50%;
    }
}
</style>
