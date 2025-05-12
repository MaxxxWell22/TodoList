import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'; 
import './styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');