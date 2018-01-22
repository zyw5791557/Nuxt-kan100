<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BaseHotModule from '~/components/BaseHotModule';
import BasePersonSwiperModule from '~/components/BasePersonSwiperModule';
import BaseHomeModule from '~/components/BaseHomeModule';
import BaseSwiperModule from '~/components/BaseSwiperModule';
/**@data
 * bannerModuleData         轮播数据 
 * personData               动漫人物导航
 * hotModuleData            强档推荐
 * latestModuleData         最新更新
 * timelineSwiperModuleData 今日放送(To.追番表)
 * animeMovieModuleData     动画电影
 * JanimeModuleData         日漫番剧
 * CanimeModuleData         国产动漫
 * childAnimeModuleData     少儿动漫
 * OAAnimeModuleData        欧美动漫
 */
export default {
    components: {
        BaseBanner,
        BaseHotModule,
        BasePersonSwiperModule,
        BaseHomeModule,
        BaseSwiperModule
    },
    asyncData ({ route }, callback) {
        Axios('anime', {
            method: 'get'
        }).then(result => {
            callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    piclistData: result.index_slideshow
                },
                personData: {
                    type: '',
                    pd: true,
                    personlistData: []
                },
                hotModuleData: {
                    type: '强档推荐',
                    itemRouteName: 'AnimeDetailView-id',
                    backEnable: true,
                    piclistData: result.hot_recommend
                },
                latestModuleData: {
                    type: '最新更新',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.recent_update
                },
                timelineSwiperModuleData: {
                    id: '001',
                    type: '每日放送',
                    headLinkName: '查看追番表',
                    headLinkIcon: 'more',
                    routerName: 'AnimeTimeline',
                    rank: false,
                    selectBtn: true,
                    piclistData: []
                },
                animeMovieModuleData: {
                    type: '动画电影',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.cartoon_movie
                },
                JanimeModuleData: {
                    type: '日漫番剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.japan
                },
                CanimeModuleData: {
                    type: '国产动漫',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.mainland
                },
                childAnimeModuleData: {
                    type: '少儿动漫',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.children
                },
                OAAnimeModuleData: {
                    type: '欧美动漫',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '动漫'
                        }
                    },
                    piclistData: result.europeAndAmerica
                }
            });
        }).catch(error => {
            callback();
        })
    },
    data () {
        return {
            
        }
    }
}
</script>

<template>
    <div class="container">
        <base-banner v-if="bannerModuleData.piclistData.length > 0" :data="bannerModuleData"></base-banner>
        <base-person-swiper-module v-if="personData.personlistData.length > 0" :data="personData"></base-person-swiper-module>
		<base-home-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-home-module>
		<base-hot-module v-if="latestModuleData.piclistData.length > 0" :data="latestModuleData"></base-hot-module>
        <base-swiper-module v-if="timelineSwiperModuleData.piclistData.length > 0" :data="timelineSwiperModuleData"></base-swiper-module>
        <base-home-module v-if="animeMovieModuleData.piclistData.length > 0" :data="animeMovieModuleData"></base-home-module>
        <base-hot-module v-if="JanimeModuleData.piclistData.length > 0" :data="JanimeModuleData"></base-hot-module>
        <base-hot-module v-if="CanimeModuleData.piclistData.length > 0" :data="CanimeModuleData"></base-hot-module>
        <base-hot-module v-if="childAnimeModuleData.piclistData.length > 0" :data="childAnimeModuleData"></base-hot-module>
        <base-hot-module v-if="OAAnimeModuleData.piclistData.length > 0" :data="OAAnimeModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
