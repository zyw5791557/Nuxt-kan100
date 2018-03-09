<script>
import Axios from '~/plugins/getAPI.js';
import BaseSpecialPoster from '~/components/BaseSpecialPoster';
import BaseSpecialWiki from '~/components/BaseSpecialWiki';
import BaseClipsModule from '@/components/BaseClipsModule';
export default {
    name: 'SpecialDetailView',
    components: {
        BaseSpecialPoster,
        BaseSpecialWiki,
        BaseClipsModule
    },
    asyncData ({ route }, callback) {
        Axios('specialDetail', {
            method: 'post',
            data: {
                id: ~~route.params.id
            }
        }).then(result => {
            callback(null, {
                title: result.title,
                subtitle: result.subtitle,
                img: result.img,
                author: result.author,
                editorials: result.editorials,
                description: result.description,
                views: result.views,
                likes: result.likes,
                collections: result.collections,
                videoListData: {
                    type: '作品列表',
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
        <base-special-poster
            :title="title"
            :subtitle="subtitle"
            :img="img"
            :author="author"
            :views="views"
            :likes="likes"
            :collections="collections"></base-special-poster>
        <base-special-wiki
            :editorials="editorials"
            :description="description"></base-special-wiki>
        <base-clips-module 
            v-if="videoListData.piclistData.length > 0" 
            :data="videoListData"></base-clips-module>
    </div>
</template>

<style lang="scss" scoped>

</style>
