<template>
	<div id='testApp'>
		<!-- <button @click='click'>test</button> -->
		<div>
			<svg width=800 height=300>
				<g>
					<circle cx='150' cy='150' r='100' fill="purple" stroke="black" stroke-width="3"/>
					<circle cx='120' cy='25' r='30' fill="purple" stroke="black" stroke-width="3"/>
					<circle cx='250' cy='100' r='10' fill="purple" stroke="black" stroke-width="3"/>
				</g>

				<g transform='translate(250)'>
					<circle cx='150' cy='150' r='100' style='styled-circle'></circle>
					<circle cx='120' cy='25'  r='30' style='styled-circle'></circle>
					<circle cx='250' cy='100' r='10' style='styled-circle'></circle>
				</g>

				<g transform='translate(500)'>
					<ellipse cx=150 cy=150 rx=100 ry=80 fill='orange'></ellipse>
				</g>
			</svg>
		</div>

		<div>
			<svg width='800' height=300>
				<g>
					<rect x=10 y=10 width=100 height=150 rx=10 ry=5 />
				</g>
				<g transform='translate(300,10)'>
					<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
					<path d='M 0 50 q 50 -50 100 0 l -100 0' stroke='yellow' fill='none'></path>
				</g>
				<g>
					<line x1=10 y1=15 x2=700 y2=125 stroke='red' stroke-width=5></line>
					<line x1=10 y1=235 x2=700 y2=130 stroke='green' stroke-width=5></line>
				</g>
			</svg>
		</div>

	</div>
</template>
<script type="text/javascript">
	
</script>
<style type="text/css">
#testApp .svg {
	stroke : grey;
	stroke-width : 5;
};

#testApp svg .styled-circle {
	fill : purple;
	stroke : yellow;
	stroke-width : 5;
};
</style>

<!-- <script type="text/javascript">
	import * as d3 from 'd3';

	export default {
		methods : {
			click : function() {
				// let p = d3.select(this.$el)
				// .append('p')
				// .html('test')
				// .style('color', 'blue');

				const arr = [ 10, 30, 50 ];
				//d3.select(this.$el).append('svg');
				const i = d3.select('#chart-01');
				i.selectAll('div.data-items')
				.data(arr)
				.enter()
				.append('div')
				.attr('class', 'data-items')
				.call( function(selection)  {
					selection.each( function(d) { d3.select(this).append('p').html(d) } )
				})
				// .append('p')
				// .html( d => d )
			},
			bar : function() {
				const arr = [ 10, 30, 50 ];

				const svg = d3.select(this.$el)
				.append('svg')
				.attr('width', 100)
				.attr('height', 300)
				.append('rect')
				.attr('width', 100)
				.attr('height', 300)
				.attr('fill', 'orange')
			}
		}
	}
</script>
 -->