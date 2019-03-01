<template>
	<div>
		<d3-line id='tradeChangeRate' :source='tradeChangeRate' title='집가격 증감율 추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["전국","수도권", "서울", "강남", "강북" ], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
		<d3-line id='charterChangeRate' :source='charterChangeRate' title='전세가격 증감율 추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["전국","수도권", "서울", "강남", "강북" ], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>
		<div>
			<select v-model='selectLoc'>
				<option value=''>선택</option>
				<option v-for='loc in locList' :value='loc'>{{loc}}</option>
			</select>
		</div>
		<d3-line id='compareRate' :source='compareRate' :title='compareTitle' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["집값","전세"], margin:{top:10, right:10, bottom:40, left:50 } }'></d3-line>

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
				locList: [],
				selectLoc : '',
				dateList: [],
				selectDate : '',
				deptCp : undefined,
				tradeChangeRate: undefined,
				charterChangeRate: undefined,
				compareTitle : '증감율 추이'
			}
		},
		mounted() {
			this.showLoading()
			let loading1 = false, loading2 = false
			this.$http.get('/house/trade')
				.then((r) => {
					console.log( r.data );
					this.locList = r.data.result.loc.map( e => e.LOC )
					this.dateList = r.data.result.date.map( e => e.DATE )
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
					result.push( { 'DATE': this.tradeChangeRate[i].DATE, '집값' : this.tradeChangeRate[i][this.selectLoc], '전세':this.charterChangeRate[i][this.selectLoc]} )
				}

				return result
			}
		}
	}
</script>

<style type="text/css" media="screen">
</style>