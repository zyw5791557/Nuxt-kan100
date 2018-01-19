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
                        piclistData: []
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
	}
}
</script>

<template>
    <div class="container">
        <base-banner v-if="bannerModuleData.piclistData.length > 0" :data="bannerModuleData"></base-banner>
		<base-hot-module v-if="hotModuleData.piclistData.length > 0" :data="hotModuleData"></base-hot-module>
		<base-home-module v-if="movieModuleData.piclistData.length > 0" :data="movieModuleData"></base-home-module>
		<base-home-module v-if="teleplayModuleData.piclistData.length > 0" :data="teleplayModuleData"></base-home-module>
		<base-home-module v-if="showModuleData.piclistData.length > 0" :data="showModuleData"></base-home-module>
		<base-home-module v-if="animeModuleData.piclistData.length > 0" :data="animeModuleData"></base-home-module>
    </div>
</template>

<style lang="scss" scoped>

</style>
