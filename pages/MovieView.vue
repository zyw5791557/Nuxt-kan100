<script>
import Axios from '~/plugins/getAPI.js';
import { ToastHandle } from '~/util/util.js';
import BaseBanner from '~/components/BaseBanner';
import BaseNavTypeModule from '~/components/BaseNavTypeModule';
import BaseHotModule from '~/components/BaseHotModule';
import BaseHomeModule from '~/components/BaseHomeModule';
import BaseSwiperModule from '~/components/BaseSwiperModule';
/**@data
 * bannerModuleData         轮播数据
 * navTypeModule            电影细分类型导航
 * hotModuleData            热播推荐数据
 * featureMovieModuleData   特色电影模块数据
 * onlineModuleData         网络电影
 * chineseModuleData        华语电影
 * eaModuleData             欧美电影
 * jkModuleData             日韩电影
 */
export default {
    components: {
		BaseBanner,
        BaseNavTypeModule,
		BaseHotModule,
        BaseHomeModule,
        BaseSwiperModule
    },
    asyncData ({ params }, callback) {
        Axios('movie', {
            method: 'get'
        }).then(res => {
            const result = res.data.data;
            const code   = res.data.code;
            if(code === 1) {
                ToastHandle(1);
                callback();
            } else if (code === 0) {
                callback(null, {
                    bannerModuleData: {
                        backEnable: true,
                        piclistData: result.index_slideshow
                    },
                    navTypeModuleData: [
                        {
                            name: '科幻',
                            classifyGuide: {
                                name: 'Classify',
                                query: {
                                    classifyNav: '电影',
                                    classifyType: '科幻'
                                }
                            }
                        },
                        {
                            name: '犯罪',
                            classifyGuide: {
                                name: 'Classify',
                                query: {
                                    classifyNav: '电影',
                                    classifyType: '犯罪'
                                }
                            }
                        },
                        {
                            name: '动作',
                            classifyGuide: {
                                name: 'Classify',
                                query: {
                                    classifyNav: '电影',
                                    classifyType: '动作'
                                }
                            }
                        },
                        {
                            name: '悬疑',
                            classifyGuide: {
                                name: 'Classify',
                                query: {
                                    classifyNav: '电影',
                                    classifyType: '悬疑'
                                }
                            }
                        },
                        {
                            name: '全部',
                            classifyGuide: {
                                name: 'Classify',
                                query: {
                                    classifyNav: '电影',
                                    classifyType: '全部'
                                }
                            }
                        }
                    ],
                    hotModuleData: {
                        type: '热播推荐',
                        headLinkName: '',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        piclistData: result.hotMovieRecommend
                    },
                    featureMovieModuleData: {
                        type: '特色电影好片',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        routerName: 'Classify',
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: []
                    },
                    hotSwiperModuleData: {
                        id: '001',
                        type: '热播榜',
                        // headLinkName: '查看完整榜单',
                        rank: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        piclistData: result.hotMovieList
                    },
                    timelineSwiperModuleData: {
                        id: '002',
                        type: '即将上线',
                        headLinkName: '',
                        rank: false,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        piclistData: result.readyOnline
                    },
                    newModuleData: {
                        type: '每日电影资讯',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        piclistData: result.information.piclistData,
                        newsData: result.information.newsData
                    },
                    onlineModuleData: {
                        type: '网络电影',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        routerName: 'Classify',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: []
                    },
                    chineseModuleData: {
                        type: '华语电影',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        routerName: 'Classify',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: result.chineseMovie
                    },
                    eaModuleData: {
                        type: '欧美电影',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        routerName: 'Classify',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: result.europeAndAmericaMovie
                    },
                    jkModuleData: {
                        type: '日韩电影',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        routerName: 'Classify',
                        newsModule: true,
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: result.japanAndKoreaMovie
                    }
                });
            }
        });
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
        <base-nav-type-module v-if="navTypeModuleData.length > 0" :data="navTypeModuleData"></base-nav-type-module>
		<base-hot-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-hot-module>
		<base-home-module v-if="featureMovieModuleData.piclistData.length > 0" :data="featureMovieModuleData"></base-home-module>
        <base-swiper-module v-if="hotSwiperModuleData.piclistData.length > 0" :data="hotSwiperModuleData"></base-swiper-module>
        <base-swiper-module v-if="timelineSwiperModuleData.piclistData > 0" :data="timelineSwiperModuleData"></base-swiper-module>
        <base-hot-module v-if="newModuleData.piclistData.length > 0" :data="newModuleData"></base-hot-module>
		<base-hot-module v-if="onlineModuleData.piclistData.length > 0" :data="onlineModuleData"></base-hot-module>
		<base-hot-module v-if="chineseModuleData.piclistData.length > 0" :data="chineseModuleData"></base-hot-module>
		<base-hot-module v-if="eaModuleData.piclistData.length > 0" :data="eaModuleData"></base-hot-module>
		<base-hot-module v-if="jkModuleData.piclistData.length > 0" :data="jkModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
