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
                        piclistData: [
                            {   
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '9.7',
                                title: '长城·免费首播',
                                des: '中外巨星汇聚长城打怪兽',
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '8.2',
                                title: '星际特工：千里之城之',
                                des: '蕾哈娜上演变装热舞秀'
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '8.9',
                                title: '空天猎',
                                des: '李晨范冰冰激战恐怖分子恐怖扥自啊as的    '
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '7.9',
                                title: '悟空传',
                                des: '彭于晏变身大圣勇斗天庭'
                            }, 
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '9.3',
                                title: '夜宴',
                                des: '章子怡上演宫廷版权力的游戏'
                            }
                        ]
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
                        piclistData: [
                            {
                                timeline: '12月02日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月03日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月04日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月05日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月06日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月07日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月08日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            },
                            {
                                timeline: '12月09日',
                                id: 123456,
                                img: 'http://pic3.qiyipic.com/common/lego/20171208/5672d497f03048d8a9fd346bb91c062b.jpg',
                                catname: '预告',
                                collect: '',
                                score: '9.2',
                                title: '青春逗',
                                des: '期待指数：100%',
                            }
                        ]
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
                        piclistData: [
                            {   
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '9.7',
                                title: '长城·免费首播',
                                des: '中外巨星汇聚长城打怪兽',
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '8.2',
                                title: '星际特工：千里之城之',
                                des: '蕾哈娜上演变装热舞秀'
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '8.9',
                                title: '空天猎',
                                des: '李晨范冰冰激战恐怖分子恐怖扥自啊as的    '
                            },
                            {
                                id: 123456,
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '',
                                score: '7.9',
                                title: '悟空传',
                                des: '彭于晏变身大圣勇斗天庭'
                            }
                        ]
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
        <base-banner :data="bannerModuleData"></base-banner>
        <base-nav-type-module :data="navTypeModuleData"></base-nav-type-module>
		<base-hot-module :data="hotModuleData"></base-hot-module>
		<base-home-module :data="featureMovieModuleData"></base-home-module>
        <base-swiper-module :data="hotSwiperModuleData"></base-swiper-module>
        <base-swiper-module :data="timelineSwiperModuleData"></base-swiper-module>
        <base-hot-module :data="newModuleData"></base-hot-module>
		<base-hot-module :data="onlineModuleData"></base-hot-module>
		<base-hot-module :data="chineseModuleData"></base-hot-module>
		<base-hot-module :data="eaModuleData"></base-hot-module>
		<base-hot-module :data="jkModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
