export default {
	draw(p) {
		p.svg.select('g.legend').remove();
		const legend = p.svg.append('g')
		.attr('width', p.$this.width)
		.attr('class', 'legend')
		.selectAll('g')
		.data(p.data)
		.enter()
		.append('g');

		legend.append('rect')
		.attr('width', 15)
		.attr('height', 15)
		.attr('x', function(d, i) { return 10; })
		.attr('y', function(d, i) { return 20 * (i + 1); })
		.attr('fill', (d, i) => p.conf.getColor(i) );

		legend.append('text')
		.style('text-overflow', 'ellipsis')
		.text(function(d) { return d.data[p.$this.name]; })
		.attr('fill', function(d, i) { return p.conf.getColor(i); })
		.attr('x', function(d, i) { return 30; })
		.attr('y', function(d, i) { return 20 * (i + 1); })
	}
}