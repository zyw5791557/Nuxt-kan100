<script>
export default {
    name: 'BaseNewsReadModule',
    data () {
        return {
            title: "《红海行动》好看吗?上映时间是什么时候？",
            author: "英英",
            inputtime: "2018-03-06 10:47:08",
            content: "<div>&nbsp;</div>\r\n<div>2018年春节来最火的一部电影《红海行动》于2018年2月16日上映，截至3月5日上午，票房破30亿，跻身华语电影影史票房前四，总票房在逐步逼近《唐人街探案2》。该片导演林超贤说：&ldquo;《红海行动》里动作戏很多，但我其实是想用战争场面带来一种反战的思考。&rdquo; 虽然之前不被人看好，现在却成了逆袭的黑马，让人震撼！！</div>\r\n<div>&nbsp;</div>\r\n<div><img alt=\"\" src=\"http://www.kan100.com/allimgs/2018/0306/20180306111931530.png\"   /><br />\r\n影片故事以也门撤侨，保护中国侨民利益为背景。索马里海域外，中国商</div>\r\n<div>&nbsp;</div>\r\n<div>船遭遇劫持，船员全数沦为阶下囚，蛟龙突击队沉着应对，潜入商船进行突袭，成功解救全部人质。</div>\r\n<div>&nbsp;</div>\r\n<div>返航途中，非洲北部伊维亚共和国政局动荡，恐怖组织连同叛军攻入首都，当地华侨面临危险，海军战舰接到上级命令改变航向，前往执行撤侨任务。蛟龙突击队八人，整装待发。</div>\r\n<div>&nbsp;</div>\r\n<div>时间紧迫，在&ldquo;撤侨遇袭可反击，相反则必须避免交火，以免引起外交冲突&rdquo;的大原则下，海军战舰及蛟龙突击队深入伊维亚，在恶劣的环境下，借助海陆等多种装备，成功转移等候在码头的中国侨民，并在激烈的遭遇战之后，营救了被恐怖分子追击的中国领事馆巴士。</div>\r\n<div>&nbsp;</div>\r\n<div>然而事情尚未完结，就在掩护华侨撤离之际，蛟龙突击队收到中国人质被恐怖分子劫持的消息。众人深感责任重大，义无反顾地再度展开营救行动。前方路途险恶，蛟龙突击队即将遭遇的，远不止人质营救那么简单，恐怖分子的惊天阴谋即将浮出水...</div>\r\n<div>&nbsp;</div>\r\n<div>&nbsp;</div>\r\n<div><img alt=\"\" src=\"http://www.kan100.com/allimgs/2018/0306/20180306111342735.jpg\"   /></div>\r\n<div>网友：李纯LiChun<span class=\"Apple-tab-span\"  > </span></div>\r\n<div>#纯看片儿#《红海行动》春节档最燃最刺激没毛病！节奏紧凑到几次不能呼吸，血肉横飞高潮迭起，国产战争片终于有赶超好莱坞的势头啦！里面几个年轻演员的表演可圈可点，看完有点跃跃欲试。虽然直男感爆表，但还是春节档最大的惊喜，推荐！ ​</div>\r\n<div>&nbsp;</div>\r\n<div>网友：徐冬冬<span class=\"Apple-tab-span\"  > </span></div>\r\n<div>《红海行动》很燃，很燃！除了目不暇接的战斗场面，我们还会看到这部影片的人性高度，一个小细节：爆炸后一根戴了戒指的断指，即便还在危险的炮火中，军人还是小心翼翼地将其捡起来，跟死者的手接到一起，然后用土轻轻地掩埋&hellip;&hellip;那一刻，我的泪点被击中，你可以感受到导演对生命的尊重和敬畏。好的电影就应如此，即便场面宏大到令人热血沸腾，也不会忽略一个个温柔的细节，这才是战争片的动人之处。</div>\r\n<div>&nbsp;</div>\r\n",
            tags: [
                "红海行动",
                "上映时间"
            ]
        }
    }
}
</script>

<template>
    <div class="news-read">
        <div class="head-box">
            <h1>{{ title }}</h1>
            <p>
                <span class="time">{{ inputtime }}</span>
                <span class="author">{{ author }}</span>
            </p>
        </div>
        <div class="read-main" v-html="content">

        </div>
        <div class="read-tags">
            <span class="title">相关标签</span>
            <a v-for="(item,index) in tags" :key="index" href="javascript:void(0);">{{ item }}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';
.news-read  {
    margin: .185185rem $gap 0;
    line-height: .703704rem;
    .head-box {
        padding-bottom: .555556rem;
        border-bottom: $moduleBorder;
        h1 {
            color: $baseColor;
            margin-bottom: .444444rem;
        }
        p {
            color: $colorGray;
            .author { margin-left: .240741rem; }
        }
    }
    .read-main {
        border-bottom: $moduleBorder;
    }
    .read-tags {
        padding: .555556rem 0;
        .title {
            color: $colorGray;
            display: flex;
            margin-bottom: .231481rem;
        }
        a {
            padding: .148148rem .296296rem;
            border: solid 1px #e6e6e6;
            border-radius: .592593rem;
            color: $tagColor;
            background-color: $tagBackground;
            margin-right: .092593rem;
        }
    }
}

// 字体大小设置
.news-read  {
    .head-box {
        h1 { font-size: 19px; }
        p { font-size: 12px; }
    }
    .read-tags {
        .title,a { font-size: 12px; }
    }
}
[data-dpr="2"] .news-read  {
    .head-box {
        h1 { font-size: 38px; }
        p { font-size: 24px; }
    }
    .read-tags {
        .title,a { font-size: 24px; }
    }
}
[data-dpr="3"] .news-read  {
    .head-box {
        h1 { font-size: 57px; }
        p { font-size: 36px; }
    }
    .read-tags {
        .title,a { font-size: 36px; }
    }
}
</style>

<style lang="scss">
@import '~assets/css/vars.scss';
.news-read {
    .read-main {
        div,
        p { color: $baseColor; }
        img { width: 100%; }
    }
}

// 字体大小设置
.news-read  {
    .read-main {
        div,
        p { font-size: 14px; }
    }
}
[data-dpr="2"] .news-read  {
    .read-main {
        div,
        p { font-size: 28px; }
    }
}
[data-dpr="3"] .news-read  {
    .read-main {
        div,
        p { font-size: 42px; }
    }
}
</style>

