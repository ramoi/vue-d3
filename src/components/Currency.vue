<template>
	<div>
		<b-card title="통화량 추이">
			<b-card-text>
				연도별 통화량 증감율을 보여줍니다. 아래 e-나라지표에서 데이타를 읽어왔습니다.
			</b-card-text>

			<a href='http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1072' target='_new'><b-badge variant="primary">e-나라지표-통화량 추이</b-badge></a>
		</b-card>
		<b-card>
			<d3-bar id='m2' :source='dataset1' title='M2 통화량 증가율 국제비교' :width=1000 :height=600 :conf='{x:"NAME", y:"M2_INC_RATE", xName : "국가", yName: "통화량 증가율(M2)"}'></d3-bar>

			<d3-line id='currencyChangeRate' :source='dataset2' title='통화량 추이(평잔 증가율(%))' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["본원통화","M1", "M2", "Lf" ], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
		</b-card>
		
		<loader :isShow='isShowLoading'></loader>
	</div>
</template>

<script>
	import line from './d3/line'
	import bar from './d3/bar.vue'
	import toobuk from './Toobuk'

	export default {
		name : 'currency',
		extends : toobuk,
		components : {
			'd3-line' : line,
			'd3-bar' : bar,
		},
		data() {
			return {
				dataset1 : undefined
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
					this.dataset1 = r.data.result['growthRate']
					this.dataset2 = r.data.result['changeRate']

					this.hideLoading()
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>