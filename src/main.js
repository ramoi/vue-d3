import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(VueRouter)

import Stock from './components/Stock'
import Currency from './components/Currency'
import Debt from './components/Debt'
import House from './components/House'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Stock },
    { path: '/currency', component: Currency },
    { path: '/debt', component: Debt },
    { path: '/house', component: House },
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
        <a class="navbar-brand" href="/">뚜벅뚜벅</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item"><router-link to="/" class="nav-link" active-class="active">주식</router-link></li>
                <li class="nav-item"><router-link to="/currency" class="nav-link" active-class="active">통화량</router-link></li>
                <li class="nav-item"><router-link to="/debt" class="nav-link" active-class="active">부채</router-link></li>
                <li class="nav-item"><router-link to="/house" class="nav-link" active-class="active">주택</router-link></li>
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