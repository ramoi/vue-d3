<template>
	<div class='d3-chart'>
		<h4 v-if='title'>{{title}}</h4>
		<!-- <svg :id='id' :width='width' :height='height'></svg> -->
	</div>
</template>

<script type='text/javascript'>
	import eb from './event-bus.vue'
	import * as d3 from 'd3'
	import shape from './shape'
	import chart from '../../js/d3-config.js'
	import legend from '../../js/d3-legend.js'
	import util from '../../js/d3-util.js'

	export default {
		extends : shape,
		props : {
			svg : { type : String },
			animate : { type : Boolean, default : false },
			legend : { type : Object, default : function() { return { isShow: true }; } },
			onlyData : { type : Boolean, default : false },
			xConf : { type : Object },
			yConf : { type : Object }
		},
		data() {
			return {
				lgc : undefined
			}
		},
		methods : {
			getConf() { return chart.getLine(d3, this.conf) }
		},
		watch : {
			source : function(  ) {
				let getLgc = function () {
					let $this = this

					let getMinMax = (r, row, y) => {
						if( r.length === 0 ) {
							// console.log('init...',row,':::',y)
							r[0] = row[y]
							r[1] = row[y]
							return
						}

						if( r[0] > row[y] ) {
							// console.log('min,,,',row,':::',y)
							r[0] = row[y]
						}
						if( r[1] < row[y] ) {
							// console.log('max,,,',row,':::',y)
							r[1] = row[y]
						}
					}

					let setSeries = (y, svgG, data, getData, getSeriesName, xScale, yScale ) => {
						d3.select('body')
						.select('div.toolTip').remove();
						
						var tooltip = d3.select('body')
						.append('div')
						.attr('class', 'toolTip')
						.style('display', 'none');


						let pg = svgG.append('g')
						.selectAll('g')
						.data( data )
						.enter()
						.append('g')

						pg.append('path')
						.attr('class', 'line')
						.style('stroke', d => $this.configure.getColor( getSeriesName(d) ) )
						.attr('d', d => { 
							return d3.line()
							.x( dd => xScale( dd[$this.configure.x] )  )
							.y( dd => yScale( dd[y] )  )
							.curve(d3.curveCardinal)(getData(d))
						} )

						pg.selectAll('dot')
						.data( d => getData(d) )
						.enter()
						.append('g')
						.append('circle')
						.style('fill', d => { /*console.log( 'd=', d, ', series=',getSeriesName(d) ); */ return $this.configure.getColor( getSeriesName(d) ) } )
						.attr('class', 'dot')
						.attr('r', 3)
						.attr('cx', d => { /*console.log(d, d[$this.configure.x]); */ return xScale(d[$this.configure.x]) } )
						.attr('cy', d => { /*console.log(d, d[y]); */ return yScale( d[y]) } )
						.on('mouseover', () => tooltip.style('display', null) )
						.on('mouseout',  () => tooltip.style('display', 'none') )
						.on('mousemove', d => {
							tooltip.style('left', (d3.event.pageX+10)+'px');
							tooltip.style('top',  (d3.event.pageY-10)+'px');
							tooltip.html(`${$this.configure.xName} : ${d[$this.configure.x]} <br/>${y} : ${d[y]}`);
						});
					}

					return Array.isArray($this.configure.y) ? {
						xDomain : function() {
							return $this.source.map( d => d[$this.configure.x] )
						},
						range : function( ) {
							let r = []
							$this.source.forEach( row => {
								$this.configure.y.forEach( y => getMinMax(r, row, y) )
							})
							return r
						},
						setSeries : function(svgG, xScale, yScale)  { 
							$this.configure.y.forEach( (y) => {
								setSeries(y, svgG, [$this.source], d=>d, d=>y, xScale, yScale ) 
							})
						},
						getSeries : function() {
							return $this.configure.y
						}
					} : {
						xDomain : function() {return $this.source[0].data.map( d => d[$this.configure.x] ) }, range : function( ) {let r = []
							$this.source.forEach( s => {
								s.data.forEach( row => getMinMax(r, row, $this.configure.y) )
							})
							return r
						},
						setSeries : function(svgG, xScale, yScale) {
							setSeries($this.configure.y, svgG, $this.source, d=>d.data, d=>d[$this.configure.series], xScale, yScale ) 
						},
						getSeries : function() {
							return $this.source.map( d => d[$this.configure.series] )
						}
					}
				}

				return function( _s )  {
					const $this = this;
					if( $this.lgc === undefined ) {
						$this.lgc = getLgc.apply($this)
					}

					$this.clear();

					//var margin = {left: 20, top: 10, right: 10, bottom: 20};
					const margin = this.configure.margin
					const width  = this.dvc.width(margin) ;
					const height = this.dvc.height(margin) ;

					console.log('width=', width, 'height=',height)

					let svgG = $this.svgElement.append('g').attr('class', 'lineGroup')
					.attr('transform', 'translate(' + $this.dvc.length(margin.left) + ',' + $this.dvc.length(margin.top) + ')');

					console.log('left=',$this.dvc.length(margin.left) , 'right=',  $this.dvc.length(margin.right))
					console.log('top=',$this.dvc.length(margin.top) , 'bottom=',  $this.dvc.length(margin.bottom))

					let xScale = d3.scalePoint()//scaleBand() scaleOrdinal
				    //.domain(d3.extent(this.source[0], d => d[$this.configure.x]))
				    .domain( $this.lgc.xDomain() )
						.range([0, width])

				    let yScale = d3.scaleLinear()
				    .domain( $this.lgc.range() )
				    .nice()
				    .range([height, 0]);

					svgG.append('g')
					.attr('class', 'grid')
					.attr('transform', 'translate(0,' + height + ')')
					.call(d3.axisBottom(xScale).ticks( 6 )
						//.tickSize(-height)
					 );

					svgG.append('g')
					.attr('class', 'grid')
					.call(d3.axisLeft(yScale)
						//.ticks(5)
						//.tickSize(-width)
						);

					$this.lgc.setSeries( svgG, xScale, yScale )

					var legend = svgG.append('g')
					.attr('text-anchor', 'end')
					.selectAll('g')
					.data( $this.lgc.getSeries() )
					.enter().append('g')
					.attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

					legend.append('rect')
					.attr('x', width - 20)
					.attr('width', 19)
					.attr('height', 19)
					.attr('fill', $this.configure.getColor);

					legend.append('text')
					.attr('x', width - 30)
					.attr('y', 9.5)
					.attr('dy', '0.32em')
					.text(function(d) { return d; });
				}
			}()
		}
	} 
</script>
<style type='text/css'>
/*.grid line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
}*/
.chart .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
}
.chart .line:hover {
    stroke: black;
    stroke-width: 3px;
}
.toolTip {
    position: absolute;
    border: 1px solid;
    border-radius: 4px 4px 4px 4px;
    background: rgba(0, 0, 0, 0.8);
    color : white;
    padding: 5px;
    text-align: center;
    font-size: 12px;
    min-width: 30px;
}
</style>





<!-- <template>
<svg width='500' $this.height='270'>
    <g style='transform: translate(0, 10px)'>
      <path :d='line' />
    </g>
  </svg>
</template>
<script type='text/javascript'>
	import * as d3 from 'd3';
	const $this.source = [99, 71, 78, 25, 36, 92];
	export default {
		name: 'non-vue-line-chart',
		template: '<div></div>',
		mounted() {
			const svg = d3.select(this.$el)
			.append('svg')
			.attr('width', 500)
			.attr('$this.height', 270)
			.append('g')
			.attr('transform', 'translate(0, 10)');
			const x = d3.scaleLinear().range([0, 430]);
			const y = d3.scaleLinear().range([210, 0]);
			d3.axisLeft().scale(x);
			d3.axisTop().scale(y);
			x.domain(d3.extent($this.source, (d, i) => i));
			y.domain([0, d3.max($this.source, d => d)]);
			const createPath = d3.line()
			.x((d, i) => x(i))
			.y(d => y(d));
			svg.append('path').attr('d', createPath($this.source));
		},
	};
</script> -->
<!-- <style lang='sass' scoped>
svg
  margin: 25px;
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style> -->