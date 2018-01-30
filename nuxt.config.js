module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'kan100',
		meta: [
			{ charset: 'utf-8' },
			{ hid: 'description', name: 'description', content: 'Nuxt.js project' },
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
