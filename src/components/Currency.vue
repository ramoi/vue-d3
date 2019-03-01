<template>
	<div>
		<d3-bar id='m2' :source='dataset' title='M2 통화량 증가율 국제비교' :width=1000 :height=600 :conf='{x:"NAME", y:"M2_INC_RATE", xName : "국가", yName: "통화량 증가율(M2)"}'></d3-bar>
		
		<loader :isShow='isShowLoading'></loader>
	</div>
</template>

<script>
	import circle from './d3/circle.vue'
	import bar from './d3/bar.vue'
	import toobuk from './Toobuk'

	export default {
		name : 'currency',
		extends : toobuk,
		components : {
			'd3-circle' : circle,
			'd3-bar' : bar,
		},
		data() {
			return {
				dataset : undefined
			}
		},
		mounted() {
			this.getData()
		},
		methods : {
			getData : function() {

				this.showLoading()

				this.$http.get('/curr')
				.then((r) => {
					console.log(r.data.result )
					this.dataset = r.data.result

					this.hideLoading()
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>