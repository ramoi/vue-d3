<template>
	<div>
		<b-card title="주택가격 및 전세 동향 추이">
			<b-card-text>
				주택가격 및 전세 가격 동향 추이를 지역별로 대비시켜 보여줍니다. 아래 e-나라지표에서 데이타를 읽어왔습니다.
			</b-card-text>

			<a href='http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1240' target='_new'><b-badge variant="primary">e-나라지표-주택매매가격 동향</b-badge></a>
			<a href='http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=1241' target='_new'><b-badge variant="primary">e-나라지표-주택전세가격 동향</b-badge></a>	
		</b-card>
		<b-card>
			<d3-line id='tradeChangeRate' :source='tradeChangeRate' title='집가격 증감율 추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["전국","수도권", "서울", "강남", "강북" ], margin:{top:10, right:30, bottom:40, left:60 } }'></d3-line>
			<d3-line id='charterChangeRate' :source='charterChangeRate' title='전세가격 증감율 추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["전국","수도권", "서울", "강남", "강북" ], margin:{top:10, right:30, bottom:40, left:60 } }'></d3-line>
		</b-card>
			
		<div>
			<b-card title="지역별 주택가격 및 전세 동향 추이 대비">
				<b-card-text>
					지역을 선택하시면 주택 가격 및 전세가격 추이를 확인할 수 있습니다.
				</b-card-text>

				<!-- <select v-model='selectLoc'>
					<option value=''>선택</option>
					<option v-for='loc in locList' :value='loc'>{{loc}}</option>
				</select> -->
				<b-form-select v-model="selectLoc" :options="locList" />
			</b-card>
			<b-card title='지역별 집값 및 전세값 증감율 추이' >
				<d3-line id='compareRate' :source='compareRate' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["집값","전세"], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
			</b-card>
		</div>

		<loader :isShow='isShowLoading'></loader>
	</div>
</template>

<script>
	import toobuk from './Toobuk'
	import line from './d3/line'

	export default {
		name : 'house',
		extends : toobuk,
		components : {
			'd3-line' : line,
		},
		data() {
			return {
				locList: [{value:'', text:'선택'}],
				selectLoc : '',
				deptCp : undefined,
				tradeChangeRate: undefined,
				charterChangeRate: undefined
			}
		},
		mounted() {
			this.showLoading()
			let loading1 = false, loading2 = false
			this.$http.get('/house/trade')
				.then((r) => {
					console.log( r.data );
					//this.locList = r.data.result.loc.map( e => e.LOC )
					this.locList = this.locList.concat( r.data.result.loc.map( e => { return { value : e.LOC, text : e.LOC } } ) )
					this.tradeChangeRate = r.data.result.changeRate

					loading1 = true
					if( loading1 && loading2) { this.hideLoading() }
				})
			this.$http.get('/house/charter')
				.then((r) => {
					console.log( r.data )
					this.charterChangeRate =  r.data.result.changeRate ;

					loading2 = true
					if( loading1 && loading2) { this.hideLoading() }
				})
		},
		computed : {
			compareRate : function() {
				if( !( this.selectLoc && this.tradeChangeRate && this.charterChangeRate ) ) {
					return 
				}

				this.compareTitle = `[${this.selectLoc}]증감율 추이`

				const result = []
				for( let i = 0, t = this.tradeChangeRate.length; i < t ; i++ ) {
					result.push( { 'DATE': this.tradeChangeRate[i].DATE, '집값' : this.tradeChangeRate[i][this.selectLoc], '전세':this.charterChangeRate[i+3][this.selectLoc]} )
				}

				return result
			}
		}
	}
</script>

<style type="text/css" media="screen">
</style>