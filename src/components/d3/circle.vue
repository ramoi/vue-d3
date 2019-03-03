<template>
	<div class="d3-chart">
		<h4 v-if='title'>{{title}}</h4>
		<svg :id='id' :width='width' :height='height'></svg>
	</div>
</template>

<script type="text/javascript">
	import eb from './event-bus.vue';
	import * as d3 from 'd3';
	import conf from '../../js/d3-config.js';
	import legend from '../../js/d3-legend.js';
	import util from '../../js/d3-util.js';

	export default {
		props : {
			id : { type : String, required : true},
			title : { type : String}, 
			width : { type : Number, required :true},
			height: { type : Number, required : true },
			animate : { type : Boolean, default : false },
			name : { type : String, default : 'name'},
			value : { type : String, default : 'value'},
			legend : { type : Object, default : function() { return { isShow: true }; } },
			onlyData : { type : Boolean, default : false },
			source : undefined, 
			conf : { type : Object }
		},
		data() {
			return {
				configure : undefined
			}
		},
		created() {
			eb.$on('setData', (source) => {
				this.setSource( source );
			});

			this.configure = conf.getCircle(d3, this.conf);
		},
		mounted() {
		},
		watch : {
			source : function( s ) {
				let $d = d3;

				const $this = this;

				const svg = d3.select($this.$el).select("svg");
				svg.selectAll("*").remove();

				svg.attr("text-anchor", "middle")
						.style("font", "12px sans-serif");


				// pie 생성
				// let pie = d3.layout.pie(); // d3 v3 버전
				const pie = d3.pie().sort(null).value( d => d[$this.configure.value] );
				// 안쪽 반지름, 바깥쪽 반지름 설정 // 200x200 의 원 그래프 생성
				// let arc = d3.svg.arc().innerRadius(0).outerRadius(100); // d3 v3 버전
				let outerRadius = Math.min(this.width, this.height) / 2 - 1;
				console.log( outerRadius * $this.configure.ioRadiusRate, outerRadius);
				const arc = d3.arc().innerRadius(outerRadius * $this.configure.ioRadiusRate).outerRadius(outerRadius);

				// 그래프 데이터 // 합쳐서 100이 아니더라도 원이 생성됨
				const graphData = pie(this.source);

				let t = svg.append("g")
						.attr("transform", `translate(${this.width / 2},${this.height / 2})`)
					.selectAll("path")
						.data(graphData)
					.enter();
					
				let g = t.append("path")
						.attr("fill", (d, i) => $this.configure.getColor(i) )
						.attr("stroke", $this.configure.getStroke() )
						.attr("d", arc );

				g.append("title")
						.text( function(d) { console.log(d.data[$this.configure.name]); return `${d.data[$this.configure.name]}: ${d.data[$this.configure.value].toLocaleString()}`});

				const radius = Math.min(this.width, this.height) / 2 * 0.8;
				const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

				const text = t
					.append("text")
						.attr("transform", d => `translate(${arcLabel.centroid(d)})`)

				text.append("tspan")
						.attr("x", 0)
						.attr("y", "-0.7em")
						.style("font-weight", "bold")
						.text(d => d.data[$this.configure.name]);

				text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
						.attr("x", 0)
						.attr("y", "0.7em")
						.attr("fill-opacity", 0.7)
						//.text(d => d.data[$this.configure.value].toLocaleString());
						.text(function(d, i) {
							return  d.endAngle-d.startAngle > 0.2 ?
							" (" + Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10 + "%)" : ""
						}); 

				if( this.configure.sumView ) {
					svg.append("text")
							.attr("class", "total")
							.attr("transform", "translate("+($this.width/2)+", "+($this.height/2)+")")
							.text("합계:" + d3.sum($this.source, d => d[$this.configure.value]));
				}

				if( this.legend.isShow ) {
					legend.draw( {
						svg : svg, 
						$this : $this,
						data : graphData,
						conf : configure
					});
				}

				if( !!this.configure.animate ) {
					util.animate( {
						d3 : d3, 
						g : g, 
						arc : arc
					});
				}
			}
		}
	} 
</script>
<style type="text/css">
.chart {
	display : inline-block;
	margin-right : 2px;
	background-color : white;
}
.total {
	font-weight : bold;
}
</style>