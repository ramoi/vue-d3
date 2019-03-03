<template>
	<div>
		<b-card title="가계 신용 동향">
			<b-card-text>
				연도별  가계 신용 동향을 보여줍니다. 해당 데이타는 전년 동기 증감율입니다.
			</b-card-text>

			<a href='http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1076' target='_new'><b-badge variant="primary">e-나라지표-가계 신용 동향</b-badge></a>
		</b-card>

		<b-card title='가계신용동향(전년 동기 증감율)'>
			<d3-line id='currencyChangeRate' :source='dataset' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["가계신용","가계대출", "판매신용" ], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
		</b-card>

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