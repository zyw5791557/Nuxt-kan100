<script>
import { mapMutations } from 'vuex';
import Axios from '~/plugins/getAPI.js';
import BaseWikiModule from '@/components/BaseWikiModule';
import BaseSelectItem from '@/components/popup/BaseSelectItem';
import BaseNumCollectSwiperModule from '@/components/BaseNumCollectSwiperModule';
import BaseSwiperModule from '@/components/BaseSwiperModule';
import BasePersonSwiperModule from '@/components/BasePersonSwiperModule';
import BaseClipsModule from '@/components/BaseClipsModule';
import BaseHotModule from '@/components/BaseHotModule';
import BaseClipsItem from '@/components/popup/BaseClipsItem';
import BaseNumCollectItem from '@/components/popup/BaseNumCollectItem';
/**
 * @data
 * wikiData         百科
 * playData         选集
 * playerData       参演明星
 * clipsData        片花资讯
 * relatedData      相关专题
 * similarData      同类型电影
 * hotData          热播榜
 */
export default {
    components: {
        BaseWikiModule,
        BaseSelectItem,
        BaseNumCollectSwiperModule,
        BaseSwiperModule,
        BasePersonSwiperModule,
        BaseClipsModule,
        BaseHotModule,
        BaseClipsItem,
        BaseNumCollectItem
    },
    asyncData({ route }, callback) {
        Axios('detailItem', {
            method: 'post',
            data: {
                id: ~~route.params.id,
                category: '动漫'
            }
        }).then(result => {
            callback(null, {
                wikiData: {
                    img: result.img,
                    title: result.title,
                    meta: '1080P',
                    score: result.score,
                    type: result.type,
                    release: result.broadcast_time,
                    time: '',
                    des: result.introduce,
                    sourceArr: result.video_list
                },
                playData: {
                    id: '001',
                    type: '选集',
                    headLinkIcon: 'arrow',
                    piclistData: result.video_list
                },
                playerData: {
                    type: '参演明星',
                    pd: false,
                    backEnable: true,
                    itemRouteName: 'StarDetailView-id',
                    personlistData: result.actor
                },
                clipsData: {
                    id: '002',
                    type: '片花资讯',
                    headLinkIcon: 'arrow',
                    newsModule: true,
                    ellipsisLines: 2,
                    piclistData: result.movie_clips_prevue
                },
                relatedData: {
                    type: '相关专题',
                    newsModule: true,
                    backEnable: true,
                    itemRouteName: 'AnimeDetailView-id',
                    piclistData: result.special_topic
                },
                similarData: {
                    id: '002',
                    type: '同类型动画',
                    backEnable: true,
                    itemRouteName: 'AnimeDetailView-id',
                    piclistData: result.common_video
                },
                hotData: {
                    id: '003',
                    type: '热播榜',
                    rank: true,
                    backEnable: true,
                    itemRouteName: 'MovieDetailView-id',
                    piclistData: result.hotMovieList
                }
            });
        }).catch(error => {
            callback();
        });
    },
    data () {
        return {
            selectSourcePopupFlag: false,
            collectPopupFlag: false,
            clipsPopupFlag: false,
        }
    },
    computed: {
        playSource() {
            const o = {
                title: '请选择播放源',
                items: this.wikiData.sourceArr
            };
            return o;
        }
    },
    created () {
        // 修改电影默认源
        this.PLAY_SOURCE(this.wikiData.sourceArr[0]);
    },
    methods: {
        ...mapMutations({
            PLAY_SOURCE: 'SET_PLAY_SOURCE'
        }),
    }
}
</script>

<template>
    <div class="container">
        <base-wiki-module :data="wikiData" @popup="selectSourcePopupFlag = true;"></base-wiki-module>
        <base-num-collect-swiper-module v-if="playData.piclistData.length > 0" :data="playData" @popup="collectPopupFlag = true;"></base-num-collect-swiper-module> 
        <base-person-swiper-module v-if="playerData.personlistData.length > 0" :data="playerData"></base-person-swiper-module>
        <base-clips-module v-if="clipsData.piclistData.length > 0" :data="clipsData" @popup="clipsPopupFlag = true;"></base-clips-module>
        <base-hot-module v-if="relatedData.piclistData.length > 0" :data="relatedData"></base-hot-module>
        <base-swiper-module v-if="similarData.piclistData.length > 0" :data="similarData"></base-swiper-module>
        <base-swiper-module v-if="hotData.piclistData.length > 0" :data="hotData"></base-swiper-module>
        <!-- popup -->
        <mt-popup
            v-if="playSource.items.length > 0"
            v-model="selectSourcePopupFlag"
            position="bottom"
            class="selectSourcePopup">
            <base-select-item :data="playSource" @close="selectSourcePopupFlag=false"></base-select-item>
        </mt-popup>
        <mt-popup
            v-if="$store.state.play_source.play_list !== undefined"
            v-model="collectPopupFlag"
            position="bottom"
            class="collectPopup">
            <base-num-collect-item :data="$store.state.play_source" @close="collectPopupFlag=false"></base-num-collect-item>
        </mt-popup>
        <mt-popup
            v-if="clipsData.piclistData.length > 6"
            v-model="clipsPopupFlag"
            position="bottom"
            class="clipsPopup">
            <base-clips-item :data="clipsData" @close="clipsPopupFlag=false"></base-clips-item>
        </mt-popup>
    </div>
</template>

<style lang="scss">
.selectSourcePopup,
.clipsPopup,
.collectPopup {
    width: 100%;
}

</style>
