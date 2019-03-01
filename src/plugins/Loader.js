// alert-modal.js
import Loader from './Loader.vue';

export default  {
    install(Vue) {
        var LoaderVue = Vue.extend(Loader)
        let loader

        Vue.prototype.show = function() {
        	if ( !!loader  ) {
        		loader = new LoaderVue( {
		        	el : '#_loading'
		        } )
        	}
        	loader.show()
        }

        Vue.prototype.hide = function() { 
        	loader.hide()
        }
    }
};