import axios from 'axios';

const baseURL = 'http://localhost:8888';

export default (api,...arg) => {
	const api_port = {
		// 获取追番表信息
		animeTimeline: '/mock/timeline.json',
	}
	let params = {};
	params.url = baseURL + api_port[api];
	for ( let key in arg[0]) {
		params[key] = arg[0][key];
	};
	return axios(params);
}