import axios from 'axios';
import { Toast } from 'mint-ui';

const baseURL = 'http://localhost:8888';

const serverURL = 'http://localhost:3001/api.php?op=v1/';

export default (api, ...arg) => {
	const api_port = {
		// 首页
		'index': 'index',
		// 电影
		'movie': 'movieIndex',
		// 视频详情
		'detailItem': 'detailItem',
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
	return axios(params);
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
	Toast({
		message: '加载超时',
		position: 'bottom',
		duration: 5000
	});
	return Promise.reject(error);
});

// axios response 拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  },  error => {
	// Do something with response error
	Toast({
		message: '加载失败',
		position: 'bottom',
		duration: 5000
	});
    return Promise.reject(error);
  });