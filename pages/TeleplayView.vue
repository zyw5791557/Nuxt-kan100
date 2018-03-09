<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BaseNavTypeModule from '~/components/BaseNavTypeModule';
import BaseHotModule from '~/components/BaseHotModule';
import BasePersonSwiperModule from '~/components/BasePersonSwiperModule';
import BaseHomeModule from '~/components/BaseHomeModule';
import BaseSwiperModule from '~/components/BaseSwiperModule';
/**@data
 * bannerModuleData         轮播数据
 * navTypeModuleData        电视剧细分类型导航   
 * hotModuleData            热剧精选
 * personData               人物
 * inlandModuleData         内地剧场
 * timelineSwiperModuleData 新剧预告
 * KteleplayModuleData      韩剧
 * AteleplayModuleData      美剧
 * HKteleplayModuleData     港剧
 * TWteleplayModuleData     台剧
 * TKteleplayModuleData     泰剧
 */
export default {
    components: {
        BaseBanner,
        BaseNavTypeModule,
        BaseHotModule,
        BasePersonSwiperModule,
        BaseHomeModule,  
        BaseSwiperModule
    },
    asyncData ({ route }, callback) {
        Axios('teleplay', {
            method: 'get'
        }).then(result => {
            callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    piclistData: result.index_slideshow
                },
                navTypeModuleData: [
                    {
                        name: '武侠',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧',
                                classifyType: '武侠'
                            }
                        }
                    },
                    {
                        name: '偶像',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧',
                                classifyType: '偶像'
                            }
                        }
                    },
                    {
                        name: '宫廷',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧',
                                classifyType: '宫廷'
                            }
                        }
                    },
                    {
                        name: '悬疑',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧',
                                classifyType: '悬疑'
                            }
                        }
                    },
                    {
                        name: '全部',
                        classifyGuide: {
                            name: 'Classify',
                            query: {
                                classifyNav: '电视剧',
                                classifyType: '全部'
                            }
                        }
                    }
                ],
                hotModuleData: {
                    type: '热剧精选',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    piclistData: result.hottv
                },
                personData: {
                    type: '近期TA们在霸屏',
                    fire: true,
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.hottv_star
                },
                inlandModuleData: {
                    type: '内地剧场',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '大陆'
                        }
                    },
                    piclistData: result.mainland
                },
                timelineSwiperModuleData: {
                    id: '001',
                    type: '新剧预告',
                    headLinkName: '',
                    rank: false,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    piclistData: []
                },
                KteleplayModuleData: {
                    type: '韩剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '韩国'
                        }
                    },
                    piclistData: result.korea
                },
                AteleplayModuleData: {
                    type: '美剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '美国'
                        }
                    },
                    piclistData: result.america
                },
                HKteleplayModuleData: {
                    type: '港剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    newsModule: true,classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '香港'
                        }
                    },
                    piclistData: result.hongkong
                },
                TWteleplayModuleData: {
                    type: '台剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '台湾'
                        }
                    },
                    piclistData: result.taiwan
                },
                TKteleplayModuleData: {
                    type: '泰剧',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'TeleplayDetailView-id',
                    classifyGuide: {
                        name: 'Classify',
                        query: {
                            classifyNav: '电视剧',
                            classifyArea: '泰国'
                        }
                    },
                    piclistData: result.thailand
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
		<base-hot-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-hot-module>
        <base-person-swiper-module v-if="personData.personlistData.length > 0" :data="personData"></base-person-swiper-module>
		<base-home-module v-if="inlandModuleData.piclistData.length > 0" :data="inlandModuleData"></base-home-module>
        <base-swiper-module v-if="timelineSwiperModuleData.piclistData.length > 0" :data="timelineSwiperModuleData"></base-swiper-module>
        <base-hot-module v-if="KteleplayModuleData.piclistData.length > 0" :data="KteleplayModuleData"></base-hot-module>
        <base-hot-module v-if="AteleplayModuleData.piclistData.length > 0" :data="AteleplayModuleData"></base-hot-module>
        <base-hot-module v-if="HKteleplayModuleData.piclistData.length > 0" :data="HKteleplayModuleData"></base-hot-module>
        <base-hot-module v-if="TWteleplayModuleData.piclistData.length > 0" :data="TWteleplayModuleData"></base-hot-module>
        <base-hot-module v-if="TKteleplayModuleData.piclistData.length > 0" :data="TKteleplayModuleData"></base-hot-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
