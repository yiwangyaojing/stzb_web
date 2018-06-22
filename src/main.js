// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import './assets/font-awesome/css/font-awesome.min.css'


import $ from 'jquery'
import store from './store.js'
import moment from 'moment'
Vue.use(require('vue-moment'));
FastClick.attach(document.body)

/* eslint-disable no-new */
//全局过滤器
Vue.filter("time", function(data) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面  
      	return moment(data).fromNow()
});
Vue.filter("data",function(data){
		return moment(data).format('llll'); // 2017年11月7日星期二下午5点20分
})
	
new Vue({
  el: '#app',
	store,
	router,
  template: '<App/>',
  components: { App },
  
})
