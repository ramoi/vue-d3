<template>
	<div>
		<div><button @click='getData'>조회</button></div>
		<d3-line id='stock' ref='stock' title='추이' :width=700 :height=320 :conf='{series:"stockName", x:"DATE", y:"END_PRICE", margin:{top:10, right:10, bottom:20, left:50 }}'></d3-line>
	</div>
</template>

<script>
	import line from './d3/line'

	export default {
		name : 'stock',
		components : {
			'd3-line' : line,
		},
		methods : {
			getData : function() {
				this.$http.get('/stock/getStock')
				.then((r) => {
					console.log(r.data.result)
					this.$refs.stock.setSource( r.data.stock );
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>