//const color = [ 'red', 'blue', 'orange', 'yellow'];

let getTick = ( data ) => {
	return {
		count : data.length,
	}
}

let util = {
	copy : ( val, target ) => {
		if( !val ) { return target; }

		for( let p in val ) {
			if( typeof val[p] !== 'function' && val.hasOwnProperty(p) )  {
				target[p] = val[p];
			}
		}
		return target;
	},
	extent : ( array, accessor, interval, interval2 ) => {
		let min, max;

		array.reduce( a => {
			let val = accessor(a);
		});
	}
}

let getDefault = function(d3) {

	let defaultConf = {
		getStroke : () => 'white',
		getColor : d3.scaleOrdinal(d3.schemeCategory10),
		// getColor : function(idx)  {
		// 	idx > color.length - 1 ? 0 : idx
		// 	return color[idx];
		// }
	};

	if( arguments.length === 1 ) {
		return defaultConf;
	} else {
		for( let i = 1; i < arguments.length; i++) {
			defaultConf = util.copy( arguments[i], defaultConf );

			if (arguments[i].colors !== undefined) {
				let colors = arguments[i].colors
				defaultConf.getColor = (i) => colors[i]
			}
		}
	}

	return defaultConf;
};

export default {

	getCircle : ( d3, conf ) => {
		let pieDefault =  { sumView: true, ioRadiusRate: 0.4 };
		return getDefault(d3, pieDefault, conf);
	},
	getLine : (d3, conf ) => {
		let lineDefault = {
			margin : { top : 10, right : 20, bottom : 20, left : 30 }
		};
		return getDefault(d3, lineDefault, conf);
	},
	getBar : (d3, conf ) => {
		let barDefault = {
			margin : { top : 80, right : 80, bottom : 80, left : 80 }
		};
		return getDefault(d3, barDefault, conf);
	},
	getX : (conf) => {
		let xdefault = {
			height : 30,
			tick : conf.dataLength / 2,
		};

		return util.copy( conf, xdefault );
	},
	getY : (conf) => {
		let ydefault = {
			tick : conf.dataLength / 2,
		};

		return util.copy( conf, ydefault );
	}
}