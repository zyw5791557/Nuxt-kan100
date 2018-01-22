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
	],
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:8888'
	},
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	plugins: [
		'~/plugins/vue-mint.js',
		'~/plugins/vue-museui.js',
		{ src: '~/plugins/fastclick.js', ssr: false }
	],
	/*
	** Build configuration
	*/
	build: {
		vendor: ['axios'],
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
