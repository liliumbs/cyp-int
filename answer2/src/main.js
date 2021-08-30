import Vue from 'vue';
import App from './App.vue';
import LazyList from './components/LazyList.vue';

Vue.component('LazyList', LazyList);

new Vue({
  el: '#app',
  render: h => h(App),
});