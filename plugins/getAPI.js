import axios from 'axios';
import { Toast } from 'mint-ui';
import { ToastHandle } from '~/util/util.js';

const baseURL = 'http://localhost:8888';

// const serverURL = 'http://localhost:3001/api.php?op=v1/';
const serverURL = 'http://www.kan100.com/api.php?op=v1/';

export default (api, ...arg) => {
	const api_port = {
		// 首页
		'index': 'index',
		// 电影
		'movie': 'movieIndex',
		// 电视剧
		'teleplay': 'tvIndex',
		// 综艺
		'show': 'varietyIndex',
		// 动漫
		'anime': 'cartoonIndex',
		// 明星
		'star': 'actorIndex',
		// 搞笑
		'funny': 'funIndex',
		// 资讯
		'news': 'newsIndex',
		// 专题
		'special': 'specialIndex',
		// 视频详情
		'detailItem': 'detailItem',
		// 明星详情页
		'starDetail': 'actorDetail',
		// 分类
		'classify': 'categoryList',
		// 获取追番表信息
		animeTimeline: baseURL + '/mock/timeline.json',
	}
	let params = {};
	if (api !== 'animeTimeline') {
		params.url = serverURL + api_port[api];
	}
	for (let key in arg[0]) {
		params[key] = arg[0][key];
	};
	return new Promise((resolve, reject) => {
		axios(params).then(res => {
			const result = res.data.data;
			const code   = res.data.code;
			if(code === 1) {
				if(process.browser) {
					ToastHandle(1);
				}
				reject();
			} else if (code === 0) {
				resolve(result);
			}
		});
	})
}

// axios request 拦截器
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	if(config.method === 'post') {
		config.headers['Content-Type'] = 'text/plain'
	}
	return config;
},  error => {
	// Do something with request error
	if(process.browser) {
		Toast({
			message: '加载失败',
			position: 'bottom',
			duration: 5000
		});
	}
	return Promise.reject(error);
});

// axios response 拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  },  error => {
	// Do something with response error
	if(process.browser) {
		Toast({
			message: '加载失败',
			position: 'bottom',
			duration: 5000
		});
	}
    return Promise.reject(error);
  });