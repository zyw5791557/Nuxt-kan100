<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BaseNavTypeModule from '~/components/BaseNavTypeModule';
import BaseHotModule from '~/components/BaseHotModule';
import BasePersonSwiperModule from '~/components/BasePersonSwiperModule';
import BaseHomeModule from '~/components/BaseHomeModule';
/**@data
 * bannerModuleData         轮播数据
 * navTypeModuleData        综艺细分类型导航   
 * personData               近期大势综艺咖
 * hotModuleData            全网热播
 * latestModuleData         最新更新
 * gossipModuleData         明星八卦
 * inlandModuleData         内地综艺
 * HKTWModuleData           港台综艺
 * JKModuleData             日韩综艺
 * OAModuleData             欧美综艺
 */
export default {
    components: {
        BaseBanner,
        BaseNavTypeModule,
        BaseHotModule,
        BasePersonSwiperModule,
        BaseHomeModule
    },
    asyncData ({ route }, callback) {
        Axios('show', {
            method: 'get'
        }).then(result => {
            callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    piclistData: result.index_slideshow
                },
                navTypeModuleData: [
                    {
                        name: '选秀',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺',
                                classifyType: '选秀'
                            }
                        }
                    },
                    {
                        name: '游戏',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺',
                                classifyType: '游戏'
                            }
                        }
                    },
                    {
                        name: '音乐',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺',
                                classifyType: '音乐'
                            }
                        }
                    },
                    {
                        name: '情感',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺',
                                classifyType: '情感'
                            }
                        }
                    },
                    {
                        name: '全部',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '综艺',
                                classifyType: '全部'
                            }
                        }
                    }
                ],
                personData: {
                    type: '近期大势综艺咖',
                    fire: true,
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.hotActor
                },
                hotModuleData: {
                    type: '全网热播',
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    piclistData: result.hotVariety
                },
                latestModuleData: {
                    type: '最新更新',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺'
                        }
                    },
                    piclistData: result.recent_update
                },
                gossipModuleData: {
                    type: '明星八卦',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺',
                            classifyType: '八卦'
                        }
                    },
                    piclistData: result.actor_news
                },
                inlandModuleData: {
                    type: '内地综艺',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺',
                            classifyArea: '大陆'
                        }
                    },
                    piclistData: result.mainland
                },
                HKTWModuleData: {
                    type: '港台综艺',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺',
                            classifyArea: '香港'
                        }
                    },
                    piclistData:result.hongkongAndTaiwan
                },
                JKModuleData: {
                    type: '日韩综艺',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺',
                            classifyArea: '日本'
                        }
                    },
                    piclistData: result.japanAndKorea
                },
                OAModuleData: {
                    type: '欧美综艺',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '综艺',
                            classifyArea: '欧美'
                        }
                    },
                    piclistData: result.europeAndAmerica
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
        <base-nav-type-module v-if="navTypeModuleData.length > 0" :data="navTypeModuleData"></base-nav-type-module>
        <base-person-swiper-module v-if="personData.personlistData.length > 0" :data="personData"></base-person-swiper-module>
		<base-home-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-home-module>
		<base-hot-module v-if="latestModuleData.piclistData.length > 0" :data="latestModuleData"></base-hot-module>
        <base-hot-module v-if="gossipModuleData.piclistData.length > 0" :data="gossipModuleData"></base-hot-module>
        <base-hot-module v-if="inlandModuleData.piclistData.length > 0" :data="inlandModuleData"></base-hot-module>
        <base-hot-module v-if="HKTWModuleData.piclistData.length > 0" :data="HKTWModuleData"></base-hot-module>
        <base-hot-module v-if="JKModuleData.piclistData.length > 0" :data="JKModuleData"></base-hot-module>
        <base-hot-module v-if="OAModuleData.piclistData.length > 0" :data="OAModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
