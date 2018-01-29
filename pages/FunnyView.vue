<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BasePersonSwiperModule from '~/components/BasePersonSwiperModule';
import BaseHotModule from '~/components/BaseHotModule';
import BaseHomeModule from '~/components/BaseHomeModule';
import BaseSwiperModule from '~/components/BaseSwiperModule';
/**@data
 * bannerModuleData         轮播数据
 * personData               搞笑协会导航
 * dailyModuleData          今日推荐
 * funnyModuleData          欢乐精选
 * timelineSwiperModuleData 24小时排行榜
 * originalModuleData       搞笑原创
 * chiildPetModuleData      萌娃逗宠
 * crazyModuleData          暴走大事件
 * spoofModuleData          恶搞整蛊
 * showModuleData           综艺搞笑
 * menOrwomenModuleData     宅男腐女
 */
export default {
    components: {
        BaseBanner,
        BasePersonSwiperModule,
		BaseHotModule,
        BaseHomeModule,
        BaseSwiperModule
    },
    asyncData ({ route }, callback) {
        Axios('funny', {
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
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    personlistData: result.fun_man
                },
                dailyModuleData: {
                    type: '今日推荐',
                    headLinkName: '',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    piclistData: result.today_recommend
                },
                funnyModuleData: {
                    type: '欢乐精选',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '欢乐精选'
                        }
                    },
                    piclistData: result.fun_collection
                },
                timelineSwiperModuleData: {
                    id: '001',
                    type: '24小时排行榜',
                    headLinkName: '',
                    rank: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    piclistData: result.order_list
                },
                originalModuleData: {
                    type: '搞笑原创',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '原创'
                        }
                    },
                    piclistData: result.self_design
                },
                chiildPetModuleData: {
                    type: '萌娃逗宠',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '萌宠'
                        }
                    },
                    piclistData: result.animal
                },
                crazyModuleData: {
                    type: '暴走大事件',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '暴走'
                        }
                    },
                    piclistData: result.baozou_event
                },
                spoofModuleData: {
                    type: '恶搞整蛊',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '恶搞'
                        }
                    },
                    piclistData: result.spoof
                },
                showModuleData: {
                    type: '综艺搞笑',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '综艺'
                        }
                    },
                    piclistData: result.variety
                },
                menOrwomenModuleData: {
                    type: '宅男腐女',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'FunnyDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '搞笑',
                            classifyType: '宅女'
                        }
                    },
                    piclistData: result.girl
                }
            });
        }).catch(error => {
            callback();
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
        <base-person-swiper-module v-if="personData.personlistData.length > 0" :data="personData"></base-person-swiper-module>
		<base-home-module v-if="dailyModuleData.piclistData.length > 0"  :data="dailyModuleData"></base-home-module>
		<base-hot-module v-if="funnyModuleData.piclistData.length > 0" :data="funnyModuleData"></base-hot-module>
        <base-swiper-module v-if="timelineSwiperModuleData.piclistData.length > 0" :data="timelineSwiperModuleData"></base-swiper-module>
        <base-home-module v-if="originalModuleData.piclistData.length > 0" :data="originalModuleData"></base-home-module>
        <base-hot-module v-if="chiildPetModuleData.piclistData.length > 0" :data="chiildPetModuleData"></base-hot-module>
        <base-hot-module v-if="crazyModuleData.piclistData.length > 0" :data="crazyModuleData"></base-hot-module>
        <base-hot-module v-if="spoofModuleData.piclistData.length > 0" :data="spoofModuleData"></base-hot-module>
        <base-hot-module v-if="showModuleData.piclistData.length > 0" :data="showModuleData"></base-hot-module>
        <base-hot-module v-if="menOrwomenModuleData.piclistData.length > 0" :data="menOrwomenModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
