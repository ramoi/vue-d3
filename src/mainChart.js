import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App'
import Stock from './components/Stock'
import Currency from './components/Currency'
import Debt from './components/Debt'
import House from './components/House'
import Sample from './components/SampleChart'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // { path: '/', component: App },
    // { path: '/stock', component: Stock },
    { path: '/', component: Stock },
    { path: '/line', component: Currency },
    { path: '/bar', component: Debt },
    { path: '/circle', component: House },
    { path: '/complex', component: Sample },
    { path: '/sample', component: Sample }
  ]
})


new Vue({
  router,
  template: `
    <div id="app">
      <ul>
        <li><a href='/'>시작</li>
        <li><router-link to="/line">라인</router-link></li>
        <li><router-link to="/bar">바</router-link></li>
        <li><router-link to="/circle">원</router-link></li>
        <li><router-link to="/complex">복합</router-link></li>
        <li><router-link to="/sample">Sample</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
  `
//        <li><router-link to="/">Main</router-link></li>
}).$mount('#app')