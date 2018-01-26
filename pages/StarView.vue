<script>
import Axios from '~/plugins/getAPI.js';
import BaseBanner from '~/components/BaseBanner';
import BaseNavTypeModule from '~/components/BaseNavTypeModule';
import BaseHotModule from '~/components/BaseHotModule';
import BasePersonModule from '~/components/BasePersonModule';
/**@data
 * bannerModuleData         轮播数据
 * navTypeModuleData        明星细分类型导航   
 * personData               热门明星
 * dailyModuleData          每日明星咨询
 * inlandModuleData         内地
 * HKTWModuleData           港台
 * JKModuleData             日韩
 * OAModuleData             欧美
 */
export default {
    components: {
        BaseBanner,
        BaseNavTypeModule,
        BaseHotModule,
        BasePersonModule
    },
    asyncData ({ route }, callback) {
        Axios('star', {
            method: 'get'
        }).then(result => {
             callback(null, {
                bannerModuleData: {
                    backEnable: true,
                    piclistData: []
                },
                navTypeModuleData: [],
                personData: {
                    type: '热门明星',
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.hotActor
                },
                dailyModuleData: {
                    type: '明星八卦',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    newsModule: true,
                    piclistData: [],
                    newsData: []
                },
                inlandModuleData: {
                    type: '内地',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.mainland
                },
                HKTWModuleData: {
                    type: '港台',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.hongkongAndTaiwan
                },
                JKModuleData: {
                    type: '日韩',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.japanAndKorea
                },
                OAModuleData: {
                    type: '欧美',
                    headLinkName: '更多',
                    headLinkIcon: 'more',
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.europeAndAmerica
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
        <base-person-module v-if="personData.personlistData.length > 0" :data="personData"></base-person-module>
		<base-hot-module v-if="dailyModuleData.piclistData.length > 0" :data="dailyModuleData"></base-hot-module>
        <base-person-module v-if="inlandModuleData.personlistData.length > 0" :data="inlandModuleData"></base-person-module>
        <base-person-module v-if="HKTWModuleData.personlistData.length > 0" :data="HKTWModuleData"></base-person-module>
        <base-person-module v-if="JKModuleData.personlistData.length > 0" :data="JKModuleData"></base-person-module>
        <base-person-module v-if="OAModuleData.personlistData.length > 0" :data="OAModuleData"></base-person-module>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
