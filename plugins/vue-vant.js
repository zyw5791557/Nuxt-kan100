import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import { Lazyload } from 'vant';

/**
 * @options loading 加载时的图片
 * @options error   加载失败时的图片
 */
Vue.use(Lazyload, {
    loading: require('~/assets/images/pre-loading.gif'),
    error: require('~/assets/images/pre-loading.gif')
});

Vue.use(Vant);