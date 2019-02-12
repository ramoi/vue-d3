import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import line from './components/sample/Line'
import bar from './components/sample/Bar'
import circle from './components/sample/Circle'
import examp from './components/sample/Examples'

//import 'bootstrap/dist/css/bootstrap.min.css'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: examp },
    { path: '/line', component: line },
    { path: '/bar', component: bar },
    { path: '/circle', component: circle }
  ]
})


new Vue({
  router,
  template: `
  <div>
    <nav class="navbar navbar-toggleable-md navbar-light bg-success navbar-inverse">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">시작</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item"><router-link to="/line" class="nav-link" active-class="active">라인</router-link></li>
                <li class="nav-item"><router-link to="/bar"  class="nav-link" active-class="active">바</router-link></li>
                <li class="nav-item"><router-link to="/circle"  class="nav-link" active-class="active">원</router-link></li>
            </ul>
        </div>        
    </nav>    
    <div class="container pt-3 pb-3">
      <router-view></router-view> 
    </div>
  </div>
  `
//        <li><router-link to="/">Main</router-link></li>
}).$mount('#app')