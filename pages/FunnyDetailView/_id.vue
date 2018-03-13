<script>
import Axios from '~/plugins/getAPI.js';
import BaseAuthorCard from '@/components/BaseAuthorCard';
import BaseClipsModule from '@/components/BaseClipsModule';
export default {
    name: 'FunnyDetailView',
    components: {
        BaseAuthorCard,
        BaseClipsModule
    },
    asyncData ({ route }, callback) {
        Axios('funSpecialDetail', {
            method: 'post',
            data: {
                id: ~~route.params.id
            }
        }).then(result => {
            callback(null, {
                author: result.title,
                img: result.img,
                plays: result.broadcast_num,
                followers: result.fans_num,
                videos: result.video_num,
                videoListData: {
                    type: result.title + '的全部视频',
                    newsModule: true,
                    ellipsisLines: 2,
                    backEnable: true,
                    noLimit: true,
                    piclistData: result.video_list
                }
            });
        }).catch(error => {
            callback();
        });
    }
}
</script>

<template>
    <div class="container">
        <base-author-card
            :author="author"
            :img="img"
            :plays="plays"
            :followers="followers"
            :videos="videos"></base-author-card>
        
        <base-clips-module 
            v-if="videoListData.piclistData.length > 0" 
            :data="videoListData"></base-clips-module>
    </div>
</template>


<style lang="scss" scoped>

</style>
