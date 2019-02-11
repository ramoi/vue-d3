 <template>
  <div>
    <!-- <div><button @click='getData'>데이타 가져오기</button></div> -->
    <d3-line id='stock' ref='stock' title='추이' :width=700 :height=320 :conf='{series:"year", x:"month", y:"price"}'></d3-line>
    <d3-line id='houseProgress' ref='houseProgress' title='추이' :width=700 :height=320 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["COUNTRY","CAPATIAL", "SEOUL", "SOUTH", "NORTH" ] }'></d3-line>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import eb from '../d3/event-bus.vue'
  import line from '../d3/line.vue'

export default {
    name: 'app',
  components : {
    'd3-line' : line,
  },
  data () {
      return { }
  },
  mounted() {
    console.log('getData')
    this.getData()
  },
  methods : {
    getData : function() {

        var dataset = [ 
          { year : '2017', data : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}] },
          { year : '2018', data : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}] }
        ];


        var dataset2 = [{'DATE': 201802, 'COUNTRY': 0.2, 'CAPATIAL': 0.5, 'SEOUL': 0.9, 'SOUTH': 1.2, 'NORTH': 0.7}, {'DATE': 201803, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201804, 'COUNTRY': 0.1, 'CAPATIAL': 0.2, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.3}, {'DATE': 201805, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.2, 'NORTH': 0.3}, {'DATE': 201806, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.4}, {'DATE': 201807, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.4}, {'DATE': 201808, 'COUNTRY': 0.0, 'CAPATIAL': 0.2, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201809, 'COUNTRY': 0.3, 'CAPATIAL': 0.7, 'SEOUL': 1.3, 'SOUTH': 1.5, 'NORTH': 1.0}, {'DATE': 201810, 'COUNTRY': 0.2, 'CAPATIAL': 0.4, 'SEOUL': 0.5, 'SOUTH': 0.5, 'NORTH': 0.6}, {'DATE': 201811, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.3}, {'DATE': 201812, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.0, 'SOUTH': -0.1, 'NORTH': 0.2}, {'DATE': 201901, 'COUNTRY': -0.1, 'CAPATIAL': -0.1, 'SEOUL': -0.2, 'SOUTH': -0.3, 'NORTH': -0.1}] 


      return function() {
        this.$refs.stock.setSource( dataset );
        this.$refs.houseProgress.setSource( dataset2 );
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