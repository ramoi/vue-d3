import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import line from './components/sample/Line'
import bar from './components/sample/Bar'
import circle from './components/sample/Circle'
import examp from './components/sample/Examples'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

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
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Sample</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
          <b-nav-item><router-link to="/line" class="nav-link" active-class="active">라인</router-link></b-nav-item>
          <b-nav-item><router-link to="/bar"  class="nav-link" active-class="active">바</router-link></b-nav-item>
          <b-nav-item><router-link to="/circle"  class="nav-link" active-class="active">원</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container pt-3 pb-3">
      <router-view></router-view> 
  </div>
</div>
  `
//        <li><router-link to="/">Main</router-link></li>
}).$mount('#app')