<template>
	<div>
		<div><button @click='getData'>조회</button></div>
		<d3-line id='stock' :source='stock' title='주가 추이' :width=700 :height=320 :conf='{series:"stockName", x:"DATE", y:"END_PRICE", margin:{top:10, right:10, bottom:20, left:50 }}'></d3-line>
	</div>
</template>

<script>
	import line from './d3/line'

	export default {
		name : 'stock',
		components : {
			'd3-line' : line,
		},
		data() {
			return {
				stock : undefined
			}
		},
		methods : {
			getData : function() {
				this.$http.get('/stock')
				.then((r) => {
					console.log(r.data)
					this.stock = r.data.stock;
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>