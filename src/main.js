import Vue from 'vue';
import App from './App';
import router from './router/index';
import * as filters from './filters';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import "../static/css/main.css";
import './http';
import store from './store';
import './icons';
import '@/directive/waves/waves.css';
import '@/directive/waves'
import "babel-polyfill";
import VueLazyload from 'vue-lazyload'


Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.use(ElementUI);
Vue.use(VueLazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
