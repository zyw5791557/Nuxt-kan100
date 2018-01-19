<script>
import BaseHeader from '~/components/BaseHeader';
import BaseNav from '~/components/BaseNav';
import BaseFooter from '~/components/BaseFooter';
/**
 * @data
 * base-header-searchPlaceholderVal 查询推荐初始值
 */
export default {
	components: {
		BaseHeader,
		BaseNav,
		BaseFooter
	},
	data () {
		return {
			base_header_searchPlaceholderVal: '将军在上',
		}
	},
	methods: {
		// base header search
		baseSearch (val) {
			console.log(val);
		},
		/* 计算内容最小高度
         */
        minHeightComputed () {
			const header = 1.22222;
			const nav = .851852;
			const footer = 2.092593 + 1.62963;
			const dom = (document.documentElement.clientHeight) / (lib.flexible.rem);
			return (dom - (header + nav + footer) + 'rem');
        }
	}
}
</script>

<template>
	<div class="home">
		<base-header :searchPlaceholderVal="base_header_searchPlaceholderVal" @search="baseSearch"></base-header>
		<base-nav></base-nav>
		<nuxt />
		<base-footer></base-footer>
	</div>
</template>

<style scoped lang="scss">

</style>
