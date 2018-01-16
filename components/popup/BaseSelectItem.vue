<script>
import { mapMutations } from 'vuex';
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            loadData: this.data
        }
    },
    methods: {
        selectSource (item) {
            this.$store.dispatch('selectSource', item).then(res => {
                this.$emit('close');
                this.$toast({
                    message: '切换成功!',
                    position: 'middle',
                    duration: 1000
                });
            });
        }
    }
}
</script>

<template>
    <div class="popup-container">
        <div class="popup-title">{{ loadData.title }}</div>
        <ul class="popup-list">
            <li v-for="(item,index) in loadData.items" :key="index" class="list-item">
                <a @click="selectSource(item)" href="javascript:void(0);">{{ item.channel_name }}</a>
            </li>
        </ul>
        <a @click="$emit('close')" class="popup-close" href="javascript:void(0);">取消</a>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
    .popup-container {
        .popup-title,
        .popup-close {
            color: $baseColor;
        }
        .popup-title,
        a {
            display: block;
            padding-left: .666667rem;
            line-height: 1.066667rem;
            border-bottom: 1px solid #ddd;
        }
        .list-item a {
            color:#898b8e;
        }
        .popup-close {
            text-align: center;
            padding: 0;
        }
    }
    
/* 字体大小设置 */
.popup-container {
    .popup-title {
        font-size: 14px;
    }
    a {
        font-size: 18px;
    }
}
[data-dpr="2"] .popup-container {
    .popup-title {
        font-size: 28px;
    }
    a {
        font-size: 36px;
    }
}
[data-dpr="3"] .popup-container {
    .popup-title {
        font-size: 42px;
    }
    a {
        font-size: 54px;
    }
}
</style>
