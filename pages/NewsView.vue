<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BaseNavTypeModule from '~/components/BaseNavTypeModule';
import BaseHotModule from '~/components/BaseHotModule';
import BaseHomeModule from '~/components/BaseHomeModule';
/**@data
 * bannerModuleData         轮播数据
 * navTypeModule            资讯细分类型导航
 * hotModuleData            资讯爆头条
 * newModuleData            最新资讯
 * featureModuleData        精选专题
 * starModuleData           明星八卦
 * movieModuleData          电影资讯
 * teleplayModuleData       电视剧资讯
 * showModuleData           综艺资讯
 * filmreviewModuleData     影评
 * 
 */
export default {
    components: {
		BaseBanner,
        BaseNavTypeModule,
		BaseHotModule,
        BaseHomeModule,
    },
    asyncData ({ route }, callback) {
        Axios('news', {
            method: 'get'
        }).then(result => {
            callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.index_slideshow
                },
                navTypeModuleData: [],
                hotModuleData: {
                    type: '资讯爆头条',
                    headLinkName: '',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.hot_news
                },
                newModuleData: {
                    type: '最新资讯',
                    headLinkName: '换一换',
                    headLinkIcon: 'change',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.recent_news
                },
                featureModuleData: {
                    type: '精选专题',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    routerName: 'Classify',
                    piclistData: []
                },
                starModuleData: {
                    type: '明星八卦',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.actor_news
                },
                movieModuleData: {
                    type: '电影资讯',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    backEnable: true,
                    ellipsis2: true,
                    newsModule: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.movie_news
                },
                teleplayModuleData: {
                    type: '电视剧资讯',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.tv_news
                },
                showModuleData: {
                    type: '综艺资讯',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.variety_news
                },
                filmreviewModuleData: {
                    type: '影评',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    ellipsis2: true,
                    backEnable: true,
                    itemRouteName: 'NewsDetailView-id',
                    piclistData: result.movieReview_news
                }
            });
        }).catch(error => {
            callback();
        })
    }
}
</script>

<template>
    <div class="container">
        <base-banner v-if="bannerModuleData.piclistData.length > 0" :data="bannerModuleData"></base-banner>
        <base-nav-type-module v-if="navTypeModuleData.length > 0" :data="navTypeModuleData"></base-nav-type-module>
		<base-hot-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-hot-module>
		<base-hot-module v-if="newModuleData.piclistData.length > 0" :data="newModuleData"></base-hot-module>
        <base-home-module v-if="featureModuleData.piclistData.length > 0" :data="featureModuleData"></base-home-module>
		<base-hot-module v-if="starModuleData.piclistData.length > 0" :data="starModuleData"></base-hot-module>
		<base-hot-module v-if="movieModuleData.piclistData.length > 0" :data="movieModuleData"></base-hot-module>
		<base-hot-module v-if="teleplayModuleData.piclistData.length > 0" :data="teleplayModuleData"></base-hot-module>
		<base-hot-module v-if="showModuleData.piclistData.length > 0" :data="showModuleData"></base-hot-module>
		<base-hot-module v-if="filmreviewModuleData.piclistData.length > 0" :data="filmreviewModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
