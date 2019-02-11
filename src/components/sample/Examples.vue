 <template>
  <div>
    <d3-test></d3-test>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import test from '../d3/test.vue'
export default {
  name: 'app',
  components : {
    'd3-test' : test
  },
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
