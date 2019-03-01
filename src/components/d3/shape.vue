<template>
</template>

<script type='text/javascript'>
	import * as d3 from 'd3'
	import $ from 'jquery'

	export default {
		props : {
			id : { type : String, required : true},
			source : undefined, 
			title : { type : String}, 
			width : { type : Number, required : true },
			height: { type : Number, required : true },
			name : { type : String, default : 'name'},
			value : { type : String, default : 'value'},
			conf : { type : Object },
		},
		data() {
			return {
				configure : undefined,
				svgElement: undefined,
				dvc : undefined
			}
		},
		created() {
		},
		mounted() {
			this.dvc = function() {
				let filter = "win16|win32|win64|mac|macintel"
				let isMobile = navigator.platform && filter.indexOf( navigator.platform.toLowerCase() ) < 0 

				let width = $('.d3-chart').width()
				console.log('width==', width )

				let dvc = isMobile ? {
					length : ( len ) => Math.floor( len * width / this.width ) ,
					width : ( margin ) => margin ? width - dvc.length( margin.left) - dvc.length( margin.right) : width,
					height : ( margin ) => margin ? dvc.height()  - dvc.length( margin.top ) - dvc.length( margin.bottom) : dvc.length(this.height) 
				} : {
					length : ( len ) => len,
					width : ( margin ) => margin ? this.width - margin.left - margin.right : width,
					height : ( margin ) => margin ? this.height - margin.top - margin.bottom : this.height
				}

				return dvc
			}.apply(this)

			//getConf vue에서 재정의 필요
			this.configure = this.getConf()

			let svg = !!this.svg ? d3.select('#' + this.svg) : d3.select(this.$el).append('svg').attr('width', this.dvc.width()).attr('height', this.dvc.height())
			this.svgElement = svg.append('g').attr('id', this.id).attr('class', 'chart')
		},
		methods : {
			clear() {
				this.svgElement.selectAll('*').remove()
			}
		}
	} 
</script>
<style type='text/css'>
</style>
