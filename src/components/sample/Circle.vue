 <template>
  <div>
    <div><button @click='getData'>데이타 가져오기</button></div>
    <d3-circle id='dept' title='통화량' :width=300 :height=300  :source='dataset' :legend='{isShow: false}' :conf='{name:"name",value:"value",animate:true }'></d3-circle>
    <div>참고 사이트 : <a href='http://blog.naver.com/sol9501/220199577721' target='_new'>http://blog.naver.com/sol9501/220199577721</a></div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import eb from '../d3/event-bus.vue'
  import circle from '../d3/circle.vue'
  import line from '../d3/line.vue'
  import bar from '../d3/bar.vue'

  import test from '../d3/test.vue'

  let svg;

export default {
  name: 'app',
  components : {
    'd3-circle' : circle
  },

  data () {
      return { 
        dataset : undefined
      }
  },
  methods : {
    getData : function() {

      let arr = [
        [{ name:'Aaaaaaaaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaa2', value: 40}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 100} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 50}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 10}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 20} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 30 } ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 30} ],
        [{ name:'Aaaaaaaaaaaaaaaaaaa1', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa2', value: 60}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 30 }]
      ];

      let idx =0;

      return function() {
        idx = idx + 1; 
        idx = idx > arr.length - 1 ? 0 : idx;
        console.log( arr[idx] );
        //this.$refs.dept.setSource( arr[idx] );
        this.dataset = arr[idx]
      }
    }()
  }
}
</script>

<style>
</style>
