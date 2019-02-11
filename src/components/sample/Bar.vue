 <template>
  <div>
    <!-- <div><button @click='getData'>데이타 가져오기</button></div> -->
    <d3-bar id='bar1' ref='bar1' title='Most loved programming languages' :width=1000 :height=600 :conf='{series:"language", x:"year", y:"value"}'></d3-bar>
    <d3-bar id='bar2' ref='bar2' title='Most loved programming languages' :width=1000 :height=600 :conf='{x:"language", y:"value"}'></d3-bar>
    <div>참고 사이트 : https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/</div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import bar from '../d3/bar.vue'

export default {
  name: 'app',
  components : {
    'd3-bar' : bar,
  },
  data () {
      return { }
  },
  mounted() {
    this.getData()
  },
  methods : {
    getData : function() {

    const dataset = [
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

      return function() {
        this.$refs.bar1.setSource( dataset )
        this.$refs.bar2.setSource( dataset.slice(10) )
      }
    }()
  }
}
</script>

<style>
</style>
