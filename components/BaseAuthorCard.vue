<script>
export default {
    name: 'BaseAuthorCard',
    props: {
        author: {
            typr: String
        },
        img: {
            type: String
        },
        plays: {
            type: Number
        },
        followers: {
            type: Number
        },
        videos: {
            type: Number
        }
    }
}
</script>

<template>
    <div class="card-container">
        <div class="avatar-box">
            <div class="avatar" :style="`background-image: url(${ img })`"></div>
        </div>
        <span class="author">{{ author }}</span>
        <div class="info-collect">
            <span>播放量： {{ plays }}次</span>
            <i>|</i>
            <span>粉丝数： {{ followers }}人</span>
            <i>|</i>
            <span>视频： {{ videos }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.card-container {
    height: 4.592593rem;
    background-image: url('~assets/images/common_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar-box {
        padding: .055556rem;
        border-radius: 50%;
        background-color: rgb(241, 141, 76);
    }
    .avatar {
        width: 1.888889rem;
        height: 1.888889rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .author {
        margin-top: .268519rem;
        margin-bottom: .240741rem;
        color: #fff;
        font-weight: bold;
    }
    .info-collect {
        i { margin: 0 .277778rem; }
        > * { color: $card-text; }
    }
}

.card-container {
    .author { font-size: 16px; }
    .info-collect > * { font-size: 12px; }
}
[data-dpr="2"] .card-container {
    .author { font-size: 32px; }
    .info-collect > * { font-size: 24px; }
}
[data-dpr="3"] .card-container {
    .author { font-size: 48px; }
    .info-collect > * { font-size: 36px; }
}

</style>
