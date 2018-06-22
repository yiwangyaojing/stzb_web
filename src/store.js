import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		zhuce:false,
		//用户信息
		user:{},
		//用户详细信息传值
		myuser:{},
		//获取文章id
		article_id:'',
	},
	mutations:{
		//注册模态框的弹出
		zhuce:function(state,data){
			state.zhuce = data
		},
		//注册模态框的消失
		zhucef:function(state,data){
			state.zhuce = data
		},
		//详细信息传值
		my:function(state,data){
			state.myuser = data
		}
	}
})

export default store