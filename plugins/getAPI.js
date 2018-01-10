import axios from 'axios';

const baseURL = 'http://localhost:8888';

const serverURL = 'http://localhost:3001/api.php?op=v1/'

export default (api,...arg) => {
	const api_port = {
		// 首页
		'index': 'index',
		// 电影
		'movie': 'movieIndex',
		// 获取追番表信息
		animeTimeline: baseURL + '/mock/timeline.json',
	}
	let params = {};
	if(api !== 'animeTimeline') {
		params.url = serverURL  + api_port[api];
	}
	for ( let key in arg[0]) {
		params[key] = arg[0][key];
	};
	return axios(params);
}