<template>
	<div>
		<div><button @click='getData'>조회</button></div>
		<!-- <d3-line id='houseProgress' ref='houseProgress' title='추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:{"전국":"COUNTRY", "수도권":"CAPATIAL","서울":"SEOUL","강남":"SOUTH","강북":"NORTH" }}'></d3-line> -->
		<d3-line id='houseProgress' ref='houseProgress' title='추이' :width=700 :height=700 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["COUNTRY","CAPATIAL", "SEOUL", "SOUTH", "NORTH" ] }'></d3-line>
		<div>
			<select v-model='selectLoc' @change='getLoc'>
				<option value=''>선택</option>
				<option v-for='loc in locList' :value='loc'>{{loc}}</option>
			</select>
			<select v-model='selectDate' @change='getLoc'>
				<option value=''>선택</option>
				<option v-for='date in dateList' :value='date'>{{date}}</option>
			</select>
		</div>
	</div>
</template>

<script>
	import line from './d3/line'

	export default {
		name : 'house',
		components : {
			'd3-line' : line,
		},
		data() {
			return {
				locList: [],
				selectLoc : '',
				dateList: [],
				selectDate : '',
				deptCp : undefined
			}
		},
		created() {
			this.$http.get('/house/getLoc')
				.then((r) => {
					console.log( r.data );
					this.locList = r.data.result.map( e => e.LOC )
				})

			this.$http.get('/house/getDate')
				.then((r) => {
					console.log( r.data );
					this.dateList = r.data.result.map( e => e.DATE )
				})
		},
		methods : {
			getData : function() {

				this.$http.get('/house/getTradeIDRatio')
				.then((r) => {
					console.log( r.data.result )
					this.$refs.houseProgress.setSource( r.data.result );
				})
			}
		}
	}
</script>

<style type="text/css" media="screen">
	
</style>