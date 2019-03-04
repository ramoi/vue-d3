import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import Main from './components/Main'
import Currency from './components/Currency'
import DebtNation from './components/DebtNation'
import DebtFamily from './components/DebtFamily'
import House from './components/House'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = axios

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect:'/house' },
    { path: '/house', component: House },
    { path: '/currency', component: Currency },
    { path: '/debt/nation', component: DebtNation },
    { path: '/debt/family', component: DebtFamily },
    { path: '/main', component: Main },
  ]
})


new Vue({
  router,
  template: 
// `
// <div>
//   <b-navbar toggleable="lg" type="dark" variant="info">
//     <b-navbar-brand href="#">NavBar</b-navbar-brand>

//     <b-navbar-toggle target="nav_collapse" />

//     <b-collapse is-nav id="nav_collapse">
//       <b-navbar-nav>
//         <b-nav-item href="#">Link</b-nav-item>
//         <b-nav-item href="#" disabled>Disabled</b-nav-item>
//       </b-navbar-nav>

//       <!-- Right aligned nav items -->
//       <b-navbar-nav class="ml-auto">
//         <b-nav-form>
//           <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
//           <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
//         </b-nav-form>

//         <b-nav-item-dropdown text="Lang" right>
//           <b-dropdown-item href="#">EN</b-dropdown-item>
//           <b-dropdown-item href="#">ES</b-dropdown-item>
//           <b-dropdown-item href="#">RU</b-dropdown-item>
//           <b-dropdown-item href="#">FA</b-dropdown-item>
//         </b-nav-item-dropdown>

//         <b-nav-item-dropdown right>
//           <!-- Using button-content slot -->
//           <template slot="button-content"><em>User</em></template>
//           <b-dropdown-item href="#">Profile</b-dropdown-item>
//           <b-dropdown-item href="#">Signout</b-dropdown-item>
//         </b-nav-item-dropdown>
//       </b-navbar-nav>
//     </b-collapse>
//   </b-navbar>
// </div>
// `
`
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">못난이 통계</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item><router-link to="/house" class="nav-link" active-class="active">주택</router-link></b-nav-item>
        <b-nav-item><router-link to="/currency" class="nav-link" active-class="active">통화량</router-link></b-nav-item>
        <b-nav-item><router-link to="/debt/nation" class="nav-link" active-class="active">국가채무</router-link></b-nav-item>
        <b-nav-item><router-link to="/debt/family" class="nav-link" active-class="active">가계부채</router-link></b-nav-item>
        <b-nav-item><router-link to="/main" class="nav-link" active-class="active">소개</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container pt-3 pb-3">
      <router-view></router-view> 
  </div>
</div>
`
        // <li><router-link to="/">Main</router-link></li>
}).$mount('#app')

        // <b-nav-item-dropdown text="Lang" right>
        //   <b-dropdown-item href="#">EN</b-dropdown-item>
        //   <b-dropdown-item href="#">ES</b-dropdown-item>
        //   <b-dropdown-item href="#">RU</b-dropdown-item>
        //   <b-dropdown-item href="#">FA</b-dropdown-item>
        // </b-nav-item-dropdown>