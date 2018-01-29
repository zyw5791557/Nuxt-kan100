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
                    piclistData: result.index_slideshow
                },
                navbarModuleData: {
                    backEnable: true,
                    itemRouteName: '',
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
    methods: {
        loadMore (type) {
            console.log(type)
        }
    }
}
</script>

<template>
    <div class="container">
        <base-banner v-if="bannerModuleData.piclistData.length > 0" :data="bannerModuleData"></base-banner>
        <base-navbar-module :data="navbarModuleData" @loadMore="loadMore"></base-navbar-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
