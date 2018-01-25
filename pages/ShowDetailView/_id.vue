<script>
import { mapMutations } from 'vuex';
import Axios from '~/plugins/getAPI.js';
import BaseWikiModule from '@/components/BaseWikiModule';
import BaseSelectItem from '@/components/popup/BaseSelectItem';
import BaseImgPlaySwiperModule from '@/components/BaseImgPlaySwiperModule';
import BaseSwiperModule from '@/components/BaseSwiperModule';
import BasePersonSwiperModule from '@/components/BasePersonSwiperModule';
import BaseClipsModule from '@/components/BaseClipsModule';
import BaseHotModule from '@/components/BaseHotModule';
import BaseClipsItem from '@/components/popup/BaseClipsItem';
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
        BaseImgPlaySwiperModule,
        BaseSwiperModule,
        BasePersonSwiperModule,
        BaseClipsModule,
        BaseHotModule,
        BaseClipsItem
    },
    asyncData ({ route }, callback) {
        Axios('detailItem', {
            method: 'post',
            data: {
                id: ~~route.params.id,
                category: '综艺'
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
                    sourceArr: Object.prototype.toString.call(result.video_list) === '[object Object]' ? Object.values(result.video_list) : result.video_list
                },
                playData: {
                    id: '001',
                    type: '选集',
                    headLinkIcon: 'arrow',
                    piclistData: Object.prototype.toString.call(result.video_list) === '[object Object]' ? Object.values(result.video_list) : result.video_list
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
                    itemRouteName: 'ShowDetailView-id',
                    piclistData: result.special_topic
                },
                similarData: {
                    id: '002',
                    type: '同类型综艺',
                    backEnable: true,
                    itemRouteName: 'ShowDetailView-id',
                    piclistData: result.common_video
                },
                hotData: {
                    id: '003',
                    type: '热播榜',
                    rank: true,
                    backEnable: true,
                    itemRouteName: 'MovieDetailView-id',
                    piclistData: result.hotMovieList
                },
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
                items: Object.prototype.toString.call(this.wikiData.sourceArr) === '[object Object]' ? Object.values(this.wikiData.sourceArr) : this.wikiData.sourceArr
            };
            return o;
        }
    },
    created () {
        // console.log('数据源',Object.prototype.toString.call(this.playData.piclistData))
        // 修改默认源
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
        <base-img-play-swiper-module  v-if="$store.state.play_source.play_list !== undefined" :data="playData" @popup="collectPopupFlag = true;"></base-img-play-swiper-module>  
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
            <base-clips-item :data="$store.state.play_source" @close="collectPopupFlag=false"></base-clips-item>
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

<style lang="scss" scoped>
.selectSourcePopup,
.clipsPopup,
.collectPopup {
    width: 100%;
}

</style>
