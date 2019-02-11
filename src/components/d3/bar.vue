<template>
	<div class="chart bar">
		<h2 v-if='title'>{{title}}</h2>
		<!-- <svg :id='id' :width='width' :height='height'></svg> -->
	</div>
</template>

<script type="text/javascript">
	import eb from './event-bus.vue';
	import * as d3 from 'd3';
	import chart from '../../js/d3-config.js';
	import legend from '../../js/d3-legend.js';
	import util from '../../js/d3-util.js';

	export default {
		props : {
			svg : { type : String },
			id : { type : String, required : true},
			title : { type : String}, 
			width : { type : Number, required : true },
			height: { type : Number, required : true },
			animate : { type : Boolean, default : false },
			name : { type : String, default : 'name'},
			value : { type : String, default : 'value'},
			legend : { type : Object, default : function() { return { isShow: true }; } },
			onlyData : { type : Boolean, default : false },
			conf : { type : Object },
			xConf : { type : Object },
			yConf : { type : Object }
		},
		methods : {
			setSource : function( source ) {
				this.source = source;
			},
			clear() {
				if( !this.svgElement ) {
					let svg = !!this.svg ? d3.select('#' + this.svg) : d3.select(this.$el).append('svg').attr('width', this.width).attr('height', this.height);
					console.log(`svg clear.....id:: ${this.id}..,`, svg.empty());
					this.svgElement = svg.append('g').attr('id', this.id).attr('class', 'chart')
				} else {
					this.svgElement.select(this.id).selectAll('*').remove();
				}
			}
		},
		data() {
			return {
				source : undefined, 
				configure : undefined,
				svgElement: undefined
			}
		},
		created() {
			eb.$on('setData', (source) => {
				this.setSource( source );
			});

			this.configure = chart.getBar(d3, this.conf);
		},
		mounted() {
		},
		watch : {
			source : function( s ) {

				const $this = this;
				$this.clear();

				const width = $this.width - ($this.configure.margin.left + $this.configure.margin.right);
				//const height = $this.height - ($this.configure.margin.top + $this.configure.margin.bottom);
				const height = $this.height - ($this.configure.margin.bottom);

				let min = d3.min($this.source, d => d[$this.configure.y] );
				let max = d3.max($this.source, d => d[$this.configure.y] );
				const interval = (max - min) * 0.1;

				console.log(`min=${min}, max=${max}`);
				min = min - interval , max = max + interval;
				console.log(`min=${min}, max=${max}`);

				this.svgElement
				.attr('transform', `translate(${$this.configure.margin.left}, 0)`);

				const chart = $this.svgElement.append('g').attr('class', 'barGroup')
				//.attr('transform', `translate(${$this.configure.margin.left}, ${$this.configure.margin.top})`);

				const xScale = d3.scaleBand()
				.range([0, width])
				.domain($this.source.map((s) => s[$this.configure.x]))
				.padding(0.4)

				const yScale = d3.scaleLinear()
				.range([height, 0])
				//.domain(d3.extent($this.source, (d) => d[$this.configure.y]));
				.domain([min, max] );

				const makeYLines = () => d3.axisLeft()
				.scale(yScale)

				let downAxes = chart.append('g')
				.attr('class', 'daxes')
				.attr('transform', `translate(0, ${height})`);
				downAxes.call(d3.axisBottom(xScale));

				let leftAxes = chart.append('g')
				.attr('class', 'laxes');
				leftAxes.call(d3.axisLeft(yScale));
				

				chart.append('g')
				.attr('class', 'grid')
				.call(makeYLines()
					.tickSize(-width, 0, 0)
					.tickFormat('')
					)

				const barGroups = chart.selectAll()
				.data($this.source)
				.enter()
				.append('g');

				barGroups
				.append('rect')
				.attr('class', 'bar')
				.attr('x', (g) => xScale(g[$this.configure.x]))
				.attr('y', (g) => yScale(g[$this.configure.y]))
				.attr('height', (g) => height - yScale(g[$this.configure.y]))
				.attr('width', xScale.bandwidth())
				.attr("fill", (d, i) => $this.configure.getColor(i) )
				.on('mouseenter', function (actual, i) {
					d3.selectAll('.value')
					.attr('opacity', 0)

					d3.select(this)
					.transition()
					.duration(300)
					.attr('opacity', 0.6)
					.attr('x', (a) => xScale(a[$this.configure.x]) - 5)
					.attr('width', xScale.bandwidth() + 10)

					const y = yScale(actual[$this.configure.y])

					let line = chart.append('line')
					.attr('id', 'limit')
					.attr('x1', 0)
					.attr('y1', y)
					.attr('x2', width)
					.attr('y2', y)

					barGroups.append('text')
					.attr('class', 'divergence')
					.attr('x', (a) => xScale(a[$this.configure.x]) + xScale.bandwidth() / 2)
					.attr('y', (a) => yScale(a[$this.configure.y]) + 30)
					.attr('fill', 'white')
					.attr('text-anchor', 'middle')
					.text((a, idx) => {
						const divergence = (a[$this.configure.y] - actual[$this.configure.y]).toFixed(1)

						let text = ''
						if (divergence > 0) text += '+'
							text += `${divergence}`

						return idx !== i ? text : '';
					})

				})
				.on('mouseleave', function () {
					d3.selectAll('.value')
					.attr('opacity', 1)

					d3.select(this)
					.transition()
					.duration(300)
					.attr('opacity', 1)
					.attr('x', (a) => xScale(a[$this.configure.x]))
					.attr('width', xScale.bandwidth())

					chart.selectAll('#limit').remove()
					chart.selectAll('.divergence').remove()
				})

				barGroups 
				.append('text')
				.attr('class', 'value')
				.attr('x', (a) => xScale(a[$this.configure.x]) + xScale.bandwidth() / 2)
				.attr('y', (a) => yScale(a[$this.configure.y]) + 30)
				.attr('text-anchor', 'middle')
				.text((a) => `${a[$this.configure.y]}`)

				$this.svgElement
				.append('text')
				.attr('class', 'label')
				.attr('x', -(height / 2)  )
				.attr('y', -($this.configure.margin.top / 2) )
				.attr('transform', 'rotate(-90)')
				.attr('text-anchor', 'middle')
				.text($this.configure.yName || '')

				$this.svgElement.append('text')
				.attr('class', 'label')
				.attr('x', width / 2) 
				.attr('y', height + 40)
				.attr('text-anchor', 'middle')
				.text($this.configure.xName || '');


				// $this.svgElement.append('text')
				// .attr('class', 'title')
				// .attr('x', width / 2 + $this.configure.margin.left)
				// .attr('y', 40)
				// .attr('text-anchor', 'middle')
				// .text('Most loved programming languages in 2018')

				$this.svgElement.append('text')
				.attr('class', 'source')
				.attr('x', width)
				.attr('y', height + 40 )
				.attr('text-anchor', 'end')
				.text('Source: Stack Overflow, 2018')
			}
		}
	} 
</script>
<style type="text/css">

/*body {
  font-family: 'Open Sans', sans-serif;
}*/

.bar .barGroup div#layout {
  text-align: center;
}

.bar .barGroup div#container {
  width: 1000px;
  height: 600px;
  margin: auto;
  //background-color: #2F4A6D;
}

/*svg {
  width: 100%;
  height: 100%;
}*/

/*.bar {
  fill: #80cbc4;
}
*/
/*text {
  font-size: 12px;
  fill: #fff;
}*/

.bar .barGroup path {
  stroke: gray;
}

.bar .barGroup line {
  stroke: gray;
}

.bar .barGroup line#limit {
  stroke: #FED966;
  stroke-width: 3;
  stroke-dasharray: 3 6;
}

.bar .barGroup .grid path {
  stroke-width: 0;
}

.bar .barGroup .grid .tick line {
  stroke: #9FAAAE;
  stroke-opacity: 0.3;
}

.bar .barGroup text.divergence {
  font-size: 14px;
  fill: #2F4A6D;
}

.bar .barGroup text.value {
  font-size: 14px;
}

.bar .barGroup text.title {
  font-size: 22px;
  font-weight: 600;
}

.bar .barGroup text.label {
  font-size: 14px;
  font-weight: 400;
}

.bar .barGroup text.source {
  font-size: 10px;
}
</style>
