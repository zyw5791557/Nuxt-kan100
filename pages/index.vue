<script>
import Axios from '~/plugins/getAPI.js';
import { ToastHandle } from '~/util/util.js';
import BaseBanner from '~/components/BaseBanner';
import BaseHotModule from '~/components/BaseHotModule';
import BaseHomeModule from '~/components/BaseHomeModule';
/**@data
 * bannerModuleData     轮播数据
 * hotModuleData        热播数据
 * movieModuleData      电影模块数据
 * teleplayModuleData   电视剧数据
 * showModuleData       综艺数据
 * animeModuleData      动漫数据
 */
export default {
    components: {
		BaseBanner,
		BaseHotModule,
		BaseHomeModule,  
    },
    asyncData ({ params }, callback) {
		Axios('index', {
            method: 'get'
        }).then(res => {
            const result = res.data.data;
            const code   = res.data.code;
            if(code === 1) {
                ToastHandle(1);
                callback();
            }else if (code === 0) {
                callback(null, {
                    bannerModuleData: {
                        backEnable: true,
                        piclistData: result.index_slideshow
                    },
                    hotModuleData: {
                        type: '重磅热播',
                        headLinkName: '换一换',
                        headLinkIcon: 'change',
                        backEnable: true,
                        piclistData: [
                            {   
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '电视剧',
                                collect: '更新至40集',
                                score: '',
                                title: '猎场',
                                des: '郑秋冬拆骗局攻陈修风'
                            },
                            {
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '更新至22集',
                                score: '',
                                title: '九州海上牧云记',
                                des: '三角恋？组合你站谁你站谁你沾水啊啊啊啊'
                            },
                            {
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '11-28期',
                                score: '',
                                title: '演员的诞生被被被被猩猩嫌弃',
                                des: '章子怡：只有她会这样对我'
                            },
                            {
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '新片',
                                collect: '',
                                score: '9.1',
                                title: '追捕',
                                des: '吴宇森展教科书式暴力美学'
                            },
                            {
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '',
                                collect: '更新至40集',
                                score: '',
                                title: '我的！体育老师',
                                des: '小米心忧马克患老年痴呆老年痴呆'
                            }, 
                            {
                                id: 123456,
                                routeName: '',
                                img: 'http://m.qiyipic.com/common/lego/20171204/5f2ffe54b5f841e08c91e32b8c3a7dfc.jpg',
                                catname: '专题',
                                collect: '',
                                score: '',
                                title: 'NBA十佳妖星绝杀勇士啊啊啊啊',
                                des: '看哭！40岁卡特扣出青春'
                            }
                        ]
                    },
                    movieModuleData: {
                        type: '电影',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电影'
                            }
                        },
                        piclistData: result.index_movieshow
                    },
                    teleplayModuleData: {
                        type: '电视剧',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        backEnable: true,
                        itemRouteName: 'TeleplayDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧'
                            }
                        },
                        piclistData: result.index_tvshow
                    },
                    showModuleData: {
                        type: '综艺',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        backEnable: true,
                        itemRouteName: 'ShowDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺'
                            }
                        },
                        piclistData: result.index_varietyshow
                    },
                    animeModuleData: {
                        type: '动漫',
                        headLinkName: '更多',
                        headLinkIcon: 'more',
                        backEnable: true,
                        itemRouteName: 'AnimeDetailView-id',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '动漫'
                            }
                        },
                        piclistData: result.index_cartoonshow
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
		<base-hot-module :data="hotModuleData"></base-hot-module>
		<base-home-module :data="movieModuleData"></base-home-module>
		<base-home-module :data="teleplayModuleData"></base-home-module>
		<base-home-module :data="showModuleData"></base-home-module>
		<base-home-module :data="animeModuleData"></base-home-module>
    </div>
</template>

<style lang="scss" scoped>

</style>
