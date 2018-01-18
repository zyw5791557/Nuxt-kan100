<script>
import { mapMutations } from 'vuex';
import Axios from '~/plugins/getAPI.js';
import { ToastHandle } from '~/util/util.js';
import BaseWikiModule from '@/components/BaseWikiModule';
import BaseSelectItem from '@/components/popup/BaseSelectItem';
import BaseSwiperModule from '@/components/BaseSwiperModule';
import BasePersonSwiperModule from '@/components/BasePersonSwiperModule';
import BaseClipsModule from '@/components/BaseClipsModule';
import BaseHotModule from '@/components/BaseHotModule';
import BaseClipsItem from '@/components/popup/BaseClipsItem';
/**
 * @data
 * wikiData         百科
 * playData         正片预告
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
                is_fun: 0,
                id: ~~route.params.id,
                category: '电影'
            }
        }).then(res => {
            const result = res.data.data;
            const code   = res.data.code;
            if (code === 0) {
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
                    playerData: {
                        type: '参演明星',
                        pd: false,
                        backEnable: true,
                        itemRouteName: 'StarDetailView-id',
                        personlistData: result.actor
                    },
                    clipsData: {
                        id: '001',
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
                        itemRouteName: 'MovieDetailView-id',
                        piclistData: result.special_topic
                    },
                    similarData: {
                        id: '002',
                        type: '同类型电影',
                        backEnable: true,
                        itemRouteName: 'MovieDetailView-id',
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
                })
            } else {
                ToastHandle(1);
                callback();
            }
        });
    },
    data () {
        return {
            selectSourcePopupFlag: false,
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
.clipsPopup {
    width: 100%;
}

</style>
