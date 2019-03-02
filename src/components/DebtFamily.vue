<template>
	<div>
		<div>참고 사이트: <a href='http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1072' target='_new'>http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1072</a></div>
		<div>
			<d3-line id='currencyChangeRate' :source='dataset' title='가계신용동향(전년 동기 증감율)' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["가계신용","가계대출", "판매신용" ], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
		</div>

		<loader :isShow='isShowLoading'></loader>
	</div>
</template>

<script>
	import toobuk from './Toobuk'
	import line from './d3/line.vue'

	export default {
		name : 'currency',
		extends : toobuk,
		components : {
			'd3-line' : line,
		},
		data() {
			return {
				dataset : undefined
			}
		},
		mounted() {
			this.showLoading()

			this.$http.get('/debt/family')
			.then((r) => {
				console.log(r.data.result )
				this.dataset = r.data.result['changeRate']

				this.hideLoading()
			})
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>