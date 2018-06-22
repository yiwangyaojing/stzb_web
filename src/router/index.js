import Vue from 'vue'
import VueRouter from 'vue-router'
//这是打开网站时的首页
import Home from '../pages/IndexHome'
//这是所有的分类页面,只有通过这个页面才能访问其他页面
import Page from '../pages/IndexPage'
//个人信息页面
import User from '../pages/IndexUser'
//所有文章以及发布文章页面
import Article from '../pages/IndexArticle'
//文章详情页面
import ArticleShow from '../pages/ArticleShow'
//武将图片显示
import WuShow from '../pages/WuShow'
//武将数据
import DaTe from '../pages/IndexDate'
//率土地图
import DiTu from '../pages/IndexMap'
//率土陪将
import PeiJiang from '../pages/PeiJiang'
//在线聊天室
import IndexChat from '../pages/IndexChat'
//朋友界面
import IndexFirend from '../pages/IndexFirend'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
  {
  	path: '/',
	  component: Home
  },
  //分类
  {
  	path:'/page',
  	component:Page,
  },
  //用户
  {
  	path:'/user',
  	component:User,
  },
  //显示文章
	{
		path:'/article',
		component:Article,
	},
	//单个文章显示
	{
		path:'/article/show/:id',
		component:ArticleShow,
	},
	//武将图片显示
	{
		path:'/wushow',
		component:WuShow,
	},
	//武将数据显示
	{
		path:'/date',
		component:DaTe
	},
	//地图
	{
		path:'/map',
		component:DiTu
	},
	//陪将
	{
		path:'/peijiang',
		component:PeiJiang,
	},
	//在线聊天室
	{
		path:'/chat',
		component:IndexChat
	},
	//朋友界面
	{
		path:'/firend/:id',
		component:IndexFirend
		
	}
  ]
})

