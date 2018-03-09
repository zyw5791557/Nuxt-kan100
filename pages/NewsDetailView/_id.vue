<script>
import Axios from '~/plugins/getAPI.js';
import BaseNewsReadModule from '@/components/BaseNewsReadModule.vue';
import BaseReadSwitches from '@/components/BaseReadSwitches.vue';
import BaseRelatedRead from '@/components/BaseRelatedRead.vue';
import BaseClipsModule from '@/components/BaseClipsModule';
export default {
    name: 'NewsDetailView',
    components: {
        BaseNewsReadModule,
        BaseReadSwitches,
        BaseRelatedRead,
        BaseClipsModule
    },
    asyncData ({ route }, callback) {
        Axios('newsDetail', {
            method: 'post',
            data: {
                id: ~~route.params.id,
            }
        }).then(result => {
            callback(null, {
                title: result.title,
                author: result.author,
                inputtime: result.inputtime,
                content: result.content,
                tags: result.tags,
                previous_page: result.previous_page,
                next_page: result.next_page,
                relatedReadData: {
                    itemRouteName: 'NewsDetailView-id',
                    type: '相关阅读',
                    backEnable: true,
                    piclistData: result.relation_news
                },
                guessLikeData: {
                    type: '猜你喜欢',
                    headLinkIcon: 'arrow',
                    newsModule: true,
                    ellipsisLines: 2,
                    backEnable: true,
                    piclistData: result.maybe_like
                },
                hotNewsData: {
                    type: '热门资讯',
                    headLinkIcon: 'arrow',
                    newsModule: true,
                    ellipsisLines: 2,
                    backEnable: true,
                    piclistData: result.hot_news
                },
                gossipData: {
                    type: '八卦热点',
                    headLinkIcon: 'arrow',
                    newsModule: true,
                    ellipsisLines: 2,
                    backEnable: true,
                    piclistData: result.gossip_news
                }
            })
        }).catch(error => {
            callback();
        });
    }
}
</script>

<template>
    <div class="container">
        <base-news-read-module
            :title="title"
            :author="author"
            :inputtime="inputtime"
            :content="content"
            :tags="tags"></base-news-read-module>
        <base-read-switches
            :previousData="previous_page"
            :nextData="next_page"></base-read-switches>
        <base-related-read v-if="relatedReadData.piclistData.length > 0" :data="relatedReadData"></base-related-read>
        <base-clips-module v-if="guessLikeData.piclistData.length > 0" :data="guessLikeData"></base-clips-module>
        <base-clips-module v-if="hotNewsData.piclistData.length > 0" :data="hotNewsData"></base-clips-module>
        <base-clips-module v-if="gossipData.piclistData.length > 0" :data="gossipData"></base-clips-module>
    </div>
</template>