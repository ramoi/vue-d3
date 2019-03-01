<template>
</template>

<script>
	import loader from '../plugins/Loader.vue'

	export default {
		name : 'base',
		components : {
			'loader' : loader
		},
		data() {
			return {
				isShowLoading : false
			}
		},
		methods : {
			showLoading() {
				this.isShowLoading = true
			},
			hideLoading() {
				this.isShowLoading = false
			}
		}
	}
</script>

<style type="text/css" media="screen">
</style>

<!-- 
<template>
</template>

<script>
import Vue from 'vue'
import Loader from '../plugins/Loader.js';
Vue.use(Loader)

	export default {
		name : 'base',
		methods : {
			showLoading() {
				Loader.show()
			},
			hideLoading() {
				Loader.hide()
			}
		}
	}
</script>

<style type="text/css" media="screen">
</style> -->