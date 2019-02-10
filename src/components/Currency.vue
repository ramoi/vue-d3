<template>
	<div>
		<div><button @click='getData'>조회</button></div>
		<!-- <d3-circle id='m2' ref='m2' title='통화량' :width=300 :height=300  :animate=true :legend='{isShow: false}' name="NAME" value="M2_INC_RATE"></d3-circle> -->
		<d3-bar id='m2' ref='m2' title='M2 통화량 증가율 국제비교' :width=1000 :height=600 :conf='{x:"NAME", y:"M2_INC_RATE", xName : "국가", yName: "통화량 증가율(M2)"}'></d3-bar>
	</div>
</template>

<script>
	import circle from './d3/circle.vue'
	import bar from './d3/bar.vue'

	export default {
		name : 'currency',
		components : {
			'd3-circle' : circle,
			'd3-bar' : bar,
		},
		methods : {
			getData : function() {
				var dataset = [ 
				{ year : '2017', data : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}] },
				{ year : '2018', data : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}] }
				];

				this.$http.get('/currency/m2')
				.then((r) => {
					console.log(r.data.result )
					this.$refs.m2.setSource( r.data.result );
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>