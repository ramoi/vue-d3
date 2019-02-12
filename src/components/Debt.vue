<template>
	<div>
		<div>
			<d3-bar id='m2' :source='m2' title='국가채무비율 (GDP 대비)' :width=1000 :height=600 :conf='{x:"YEAR", y:"DEBT_RATIO", xName : "연도", yName: "GDP 대비 국가채무 비율(%)"}'></d3-bar>
		</div>
		<div>
			<div>
				<select v-model='selectYear' @change='getDeptCp'>
					<option value=''>선택</option>
					<option v-for='year in yearList' :value='year'>{{year}}</option>
				</select>
			</div>
			<div>
				<d3-circle id='dc' :source='dc' title='부채구성 정부부분' :width=200 :height=200  :legend='{isShow: false}' :conf='{name:"d",value:"val",animate:true ,colors:["red", "blue"]}'></d3-circle>
				<d3-circle id='dcDtl' :source='dcDtl' title='중앙정부 부채구성' :width=200 :height=200  :legend='{isShow: false}' :conf='{name:"d",value:"val",animate:true }'></d3-circle>
			</div>
			<div>
				<d3-circle id='dc2' :source='dc2' title='부채구성 채무부문' :width=200 :height=200  :legend='{isShow: false}' :conf='{name:"d",value:"val",animate:true ,colors:["red", "blue"]}'></d3-circle>
				<d3-circle id='legalDtl' :source='legalDtl' title='적자성채무' :width=200 :height=200  :legend='{isShow: false}' :conf='{name:"d",value:"val",animate:true }'></d3-circle>
				<d3-circle id='financeDtl' :source='financeDtl' title='금융성채무' :width=200 :height=200  :legend='{isShow: false}' :conf='{name:"d",value:"val",animate:true }'></d3-circle>
			</div>
		</div>
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
		data() {
			return {
				yearList: [],
				selectYear : '',
				m2 : undefined,
				deptCp : undefined,
				dc : undefined,
				dcDtl :undefined,
				dc2 : undefined,
				legalDtl : undefined,
				financeDtl : undefined
			}
		},
		created() {
			this.getData()
		},
		methods : {
			getData : function() {
				this.$http.get('/debt/gDebt')
				.then((r) => {
					console.log(r.data.result )
					this.m2 = r.data.result
					this.yearList  = r.data.result.map( e => e.YEAR )
				})
			},
			getDeptCp : function() {
				if( this.deptCp === undefined ) {
					this.$http.get('/debt/deptCp')
					.then((r) => {
						this.deptCp = r.data.result
						this.getDeptCp()
					})
				} else {
					let thisVue = this
					console.log(this.selectYear, "::", this.deptCp)
					let dc = this.deptCp.find( e => e.YEAR === thisVue.selectYear )
					this.dc =  [{ d : '중앙정부', val:dc.CENTERAL_GOVERNMENT }, { d : '지방정부 순채무', val:dc.LOCAL_GOVERNMENT } ] 
					this.dcDtl =  [{ d : '국채', val:dc.national_debt }, { d : '차입금', val:dc.loan }, { d : '국고채무부담행위', val:dc.ntlba } ] 
					this.dc2 =  [{ d : '적자성채무', val:dc.LEGAL }, { d : '금융성채무', val:dc.FINANCE } ] 
					this.legalDtl =  [{ d : '일반회계 적자보전', val:dc.loss_preserve }, { d : '공적자금 국채전환 등', val:dc.to_national_from_public } ] 
					this.financeDtl =  [{ d : '외환시장 안정용', val:dc.exchange_stablity }, { d : '서민주거 안정용 등', val:dc.house_stablity } ] 
				}
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>