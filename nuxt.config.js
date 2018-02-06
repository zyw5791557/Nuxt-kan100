module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: '看100影视-好看的电影电视剧视频网站大全-免费在线观看',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'keywords', content: '看100影视,好看电影, 免费电视剧,免费在线电影,电视剧在线观看' },
			{ name: 'description', content: '看高清视频哪个网站好?首选看100!看100影视为您提供2016最新好看的电影、电视剧、综艺、动漫、搞笑等免费高清视频大全.在看100,所有的视频都可免费在线观看.' },
			// { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' }
		],
		script: [
			{ src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js' },
			{ src: 'https://cdn.bootcss.com/Swiper/4.0.6/js/swiper.min.js' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://cdn.bootcss.com/Swiper/4.0.6/css/swiper.min.css' }
		],
	},
	css: [
		'~assets/css/normalize.css',
		'~assets/css/main.css',
		'~assets/css/ui-modification.css',
	],
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:8888'
	},
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	plugins: [
		{ src: '~/plugins/vue-fastclick.js', ssr: false },
		{ src: '~/plugins/vue-vant.js' },
		{ src: '~/plugins/vue-infinite-scroll.js', ssr: false }
	],
	/*
	** Build configuration
	*/
	build: {
		vendor: ['axios', 'fastclick', 'vant', 'vue-infinite-scroll'],
		/*
		** Run ESLint on save
		*/
		extend(config, { isDev, isClient }) {
			// ...
			config.module.rules.push({
				enforce: 'pre',
				test: /\.scss$/,
				loader: 'vue-style-loader!css-loader!sass-loader',
				exclude: /(node_modules)/
			})
		}
	}
}
