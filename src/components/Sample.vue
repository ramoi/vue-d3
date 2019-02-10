 <template>
  <div>
    <button @click='getData'>데이타 가져오기</button>
    <d3-circle id='dept' ref='dept' title='통화량' :width=300 :height=300  :legend='{isShow: false}' :conf='{name:"name",value:"value",animate:true }'></d3-circle>
    <d3-circle id='dept2' ref='dept2' title='통화량2' :width=300 :height=300 :conf='{name:"key",value:"count",animate:true }'></d3-circle>

    <d3-line id='stock' ref='stock' title='추이' :width=700 :height=320 :conf='{series:"year", x:"month", y:"price"}'></d3-line>
    <d3-bar id='stock3' ref='stock3' title='Most loved programming languages' :width=1000 :height=600 :conf='{series:"language", x:"year", y:"value"}'></d3-bar>

    <svg id='complex' width=800 :height=500 >
      <d3-line id='stock2' ref='stock2' svg='complex' title='복합' :width=700 :height=320 :conf='{series:"year", x:"month", y:"price"}'></d3-line>
    </svg>

    <d3-test></d3-test>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import eb from './d3/event-bus.vue'
  import circle from './d3/circle.vue'
  import line from './d3/line.vue'
  import bar from './d3/bar.vue'

  import test from './d3/test.vue'

  let svg;

export default {
  name: 'app',
  components : {
    'd3-circle' : circle,
    'd3-line' : line,
    'd3-bar' : bar,
    'd3-test' : test
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    svg = d3.select('#svg');

  },
  methods : {
    test : function() {

    },
    getData : function() {

      let arr = [
        [{ name:'Aaaaaaaaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaa2', value: 40}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 100} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 50}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 10}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 20} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 30 } ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 30} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 60}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 30 }]
      ];

        var dataset = [ 
          { year : '2017', data : { list : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}]} },
          { year : '2018', data : { list : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}]} }
        ];

        var dataset2 = [ 
          { year : 'samsung', data : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}] },
          { year : 'kospi', data : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}] }
        ];

        // https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
    const sample = [
      {year:'2016', language: 'Rust', value: 78.9, },
      {year:'2016', language: 'Kotlin', value: 75.1, },
      {year:'2016', language: 'Python', value: 68.0, },
      {year:'2016', language: 'TypeScript', value: 67.0, },
      {year:'2016', language: 'Go', value: 65.6, },
      {year:'2016', language: 'Swift', value: 65.1, },
      {year:'2016', language: 'JavaScript', value: 61.9, },
      {year:'2016', language: 'C#', value: 60.4, },
      {year:'2016', language: 'F#', value: 59.6, },
      {year:'2016', language: 'Clojure', value: 49.6, },

      {year:'2017', language: 'Rust', value: 58.9, },
      {year:'2017', language: 'Kotlin', value: 25.1, },
      {year:'2017', language: 'Python', value: 78.0, },
      {year:'2017', language: 'TypeScript', value: 47.0, },
      {year:'2017', language: 'Go', value: 85.6, },
      {year:'2017', language: 'Swift', value: 25.1, },
      {year:'2017', language: 'JavaScript', value: 71.9, },
      {year:'2017', language: 'C#', value: 40.4, },
      {year:'2017', language: 'F#', value: 19.6, },
      {year:'2017', language: 'Clojure', value: 12.6, }
    ];

      let idx =0;

      return function() {
        idx = idx + 1; 
        idx = idx > arr.length - 1 ? 0 : idx;
        console.log( arr[idx] );
        this.$refs.dept.setSource( arr[idx] );
        this.$refs.stock.setSource( dataset );
        this.$refs.stock2.setSource( dataset2 );
        this.$refs.stock3.setSource(sample);
      }
    }()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
