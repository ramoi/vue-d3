export default {
	animate(p) {
		p.g.transition()
		.duration(1000)
		.delay(function(d, i) {
			return i * 1000;
		})
		.attrTween("d", function(d, i) {
			var interpolate = p.d3.interpolate(
				{startAngle : d.startAngle, endAngle : d.startAngle},
				{startAngle : d.startAngle, endAngle : d.endAngle}
				);
			return function(t){
				return p.arc(interpolate(t));
			}
		});
	}
}