<template>
	<div id="app">
        <transition name="fade"
		            mode="out-in">
            <nuxt />
        </transition>
	</div>
</template>
<script>
export default {
	data() {
		return {

		};
	},
    methods: {
        /* 计算内容最小高度
         * 221   80 + 81 + 40 + 20
         */
        minHeightComputed() {
            this.minHeight = (document.documentElement.clientHeight - 221) + 'px';
        }
    }
};
</script>

<style scoped lang="scss">
   
</style>
