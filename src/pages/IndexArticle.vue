<template>
	<div id="article">
		<!--所有帖子-->
		<div class="article-main">
			<div class="article-main-top">
				
				<section class="article-title">
					<span class="fa fa-search" @click="soso">  </span>
					<h2> 率土之滨 </h2>
				</section>
				<div class="article-type">
					<ul>
					   	<tab :line-width=2 active-color='#fc378c' v-model="index">
					        <tab-item @on-item-click="handler(item)" style="cursor: pointer;" class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
					    </tab>
					</ul>
				</div>
			</div>
			<div class="article-main-main">
				<section>
					<!--置顶帖-->
					<div class="article-main-main-top">
						<ul>
							<li> <h3 style="text-align: center;"> 暂无置顶帖 </h3> </li>
						</ul>
					</div>
					<!--普通帖子-->
					
					  <div>
					    <div>
					      <swiper v-model="index" height="100px" :show-dots="false">
					        <swiper-item v-for="(item, index) in list2" :key="index">
					        	
					          	<div class="article-main-main-floor" v-show="types.length > 0" v-cloak="">
									<ul>
										<li v-for="(val,ins) in types" @click="articleShow(val)">
											<div class="article-main-main-floor-li-top">
												<section class="left"> 
													<img :src="'http://localhost:2200/img/' + val.author.img + '.jpg'" alt="" />
													<p> <span> {{val.times | time}} </span><br /> <span> {{val.author.name}} </span> </p>
												</section>
												<section class="right">
													<span> <i class="fa fa-bullseye">  </i> {{val.looks_num}} </span>
													<span> <i class="fa fa-commenting">  </i> {{val.reply_num}} </span>
												</section>
											</div>
											<div class="article-main-main-floor-li-floor" style="overflow: hidden;">
												<p> {{val.title}} </p>
												<span> {{val.type}} </span>
											</div>
										</li>
									</ul>
								</div>
					          	<div v-show="types.length == 0" v-cloak="">
					          		<h2 style="font-size: 12px; margin-top: 20px; text-align: center; font-weight: 100; color: red;" > 暂无帖子! </h2>
					          	</div>
					          	
					        </swiper-item>
					      </swiper>
					    </div>
					  </div>
					
				
				
				
				</section>
			</div>
			
			<div @click="fabu" class="fabu-article">
				<i class="fa fa-pencil-square-o">  </i>
			</div>
		</div>
		<!--编写文章的模块-->
		<fa-bu :type="type"></fa-bu>
		<!--错误模块的提示-->
		<index-error :data="error"></index-error>
		<!--搜索-->
		
		<my-hunt></my-hunt>
	</div>
</template>

<script>
	import Vue from 'vue'
//	import VueMomentJS from "vue-momentjs";
	import FaBu from '../components/FaBu'
	import moment from 'moment'
	import axios from 'axios'
	import $ from 'jquery'
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
	//搜索提示页面
	import MyHunt from '../components/SoSo'
	//错误信息提示页面
	import IndexError from '../components/IndexError'
	const list = () => ['全部帖子','杂烩论坛','大神攻略','极限贫民','武将剖析','萌新求助','王者招募']
	export default {
		data:function(){
			return {
				type:['杂烩论坛','大神攻略','极限贫民','武将剖析','萌新求助','王者招募'],
				//所有的文章
				all:[],
				//分类文章
				types:[],
				list2: list(),
		        demo2: '精选',
		        demoDisabled: 'A',
		        index: 0,
		        getBarWidth: function (index) {
		          return (index + 1) * 22 + 'px'
     		    },
     		    arr:[
     		    	{num:0,nowtype:'全部帖子'},
     		    	{num:0,nowtype:'杂烩论坛'},
     		    	{num:0,nowtype:'大神攻略'},
     		    	{num:0,nowtype:'极限贫民'},
     		    	{num:0,nowtype:'武将剖析'},
     		    	{num:0,nowtype:'萌新求助'},
     		    	{num:0,nowtype:'王者招募'},
     		    ],
		        //初始页面数
		        num:0,
		        //当前的文章分类
		        nowtype:'全部帖子',
		        //错误信息
		        error:'已无更多消息'
			}
		},
		mounted:function(){
			//获取所有文章
			moment.locale('zh-cn');
			this.getAllArticle()
			//下滑加载更多
			this.addmore();
		},
		updated:function(){
			
			var height = $('.article-main-main-floor').height() + 50;
			$('.vux-swiper').css('height',height);
		},
		methods:{
			fabu:function(){
				
				//判断是否登录
				if( $('.admin').hasClass('true') ){
					$('#fabu').css('display','block')
					$('#fabu').removeClass('donghuachus')
					$('#fabu').addClass('donghuaru')
					//所有文章
					$('.article-main').removeClass('donghuaru2')
					$('.article-main').addClass('donghuachu')
					//文章分类是绝对定位所有需要再加一个动画
					$('.article-main-top').removeClass('donghuaru2')
					$('.article-main-top').addClass('donghuachu')	
					setTimeout(function(){
						$('.article-main').css('display','none')
					},500)
				}else{
					
					alert('请先登录!')
					$('.dengyin').css('display','block')
				}
			},
			//在此处封装获取所有文章消息
			getAllArticle:function(){
				var page =  {
					num:this.num,
					type:this.nowtype,
				}
				
//				this.arr.forEach((data) => {
//					if( data.nowtype == this.nowtype ){
//						data.num++;
//						page = {
//							num:data.num,
//							type:this.nowtype,
//						}
//					}
//				})
				
				axios({
						url:'/los/article/getAll',
						method:'POST',
						data:$.param(page),   //将数据转换成字符串序列化对
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
					
					if( data.data.message.length < 1 ){
						$('#error').css('display','block')
						$('#error').css('opacity',1)
						$('#error').stop().animate({
							opacity:0	
						
						},2200)
						setTimeout(function(){
							$('#error').css('display','none')
						},2200)
					}else{
						data.data.message.forEach((data) => {
						this.all.push(data)
						this.types.push(data)
					})
					}
						
					
				}).catch((err) => {
					console.log(err)
				})
			},
			//选项卡切换
			handler:function(val){
				//每次切换选项卡都会使默认的显示为第一页
				this.num = 0;
				//设置当前的类型
				this.nowtype = val
				this.types = [];
				this.all = [];
				
				
				
				this.getAllArticle()
				this.all.forEach((data) => {
					if( data.type == val ){
						this.types.push(data)
					}else{
					}
				})
				
				
				
			},
			//单文章显示
			articleShow:function(data){
				var tt = new Date(data.times).getTime()
				this.num = 0;
				this.$router.push('/article/show/' + tt)
				$(window).unbind('scroll')
			},
			//下滑加载更多时
			addmore:function(){
				var that = this
				$(window).scroll(function(){
					var top = $(this).scrollTop();
					var height = $(document).height();
					var heights = $(this).height();
					if( top + heights == height ){
						that.num++;
						
						
						that.getAllArticle()
					}
				})
			},
			//搜索文章
			soso:function(){
				$('#soso').css('display','block');
			}
		},
		components:{
			FaBu,
		    Tab,
		    TabItem,
		    Sticky,
		    Divider,
		    XButton,
		    Swiper,
		    SwiperItem,
		    IndexError,
			MyHunt,
		}
	}
</script>

<style scoped="">
	ul{
		list-style: none;
	}
	#article{
		width: 100%;
		/*height:800px;*/
	}
	.article-main{
		/*overflow: hidden;*/
		position: relative;
	}
	.article-main .article-main-top{
		position: fixed;
		z-index: 5;
		top: 0;
		width: 100%;
	}
	.article-main .article-main-top .article-title{
		padding: 9px;
		background: #EEC900;
		text-align: center;
		position: relative;
		
	}
	.article-main .article-main-top .article-title h2{
		font-size: 20px;
		color: #111;
		font-weight: 500;
	}
	.article-main .article-main-top .article-title span{
		position: absolute;
		top:15px;
		left: 15px;
		cursor: pointer;
		font-size: 19px;
		color: #fff;
	}
	.article-main .article-main-top .article-type{
		background: #FFFFFF;
		padding: 5px 7px;
		width: 100%;
		overflow-x:scroll;
	}
	.article-main .article-main-top .article-type ul{	
		 width: 560px;
	}
	.article-main .article-main-top .article-type ul li{
		float: left;
		list-style: none;
		margin: 5px 12px; 
		margin-top: 0;
		margin-bottom: 10px;
	}
	.article-main .article-main-top .article-type ul li span{
		display: inline-block;
		cursor: pointer;
		font-size: 14px;
		color: #222;
	}
	.article-main .article-main-top .article-type ul li span.active{
		border-bottom:solid 2px red ;
		color: red;
	}
	.article-main-main{
		margin-top: 100px;
		/*border: solid 1px red;*/
		/*height: 500px;*/
		margin-bottom: 50px;
	}
	.article-main-main > section .article-main-main-top{
		background: #fff;
		border-bottom: solid 1px #F0F0F0;
	}
	.article-main-main > section .article-main-main-top ul{
		overflow: hidden;
		padding: 5px 10px;
		list-style: none;
	}
	.article-main-main > section .article-main-main-top ul li{
		height: 50px;
	}
	.article-main-main > section .article-main-main-floor{
		margin-top: 3px;
		background: #fff;
	}
	.article-main-main > section .article-main-main-floor ul{
		overflow: hidden;
		/*padding: 5px 10px;*/
		list-style: none;
	}
	.article-main-main > section .article-main-main-floor ul li{
		/*height: 50px;*/
	}
	/*文章发布的按钮*/
	.fabu-article{
		position: fixed;
		bottom: 70px;
		right: 20px;
		border:solid 1px red;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		text-align: center;
		background: red;
		box-shadow: 2px 2px 15px #888;
		transition: 1s;
		cursor: pointer;
	}
	.fabu-article i{
		line-height: 60px;
		padding-left: 3px;
		font-size: 25px;
		color: #fff;
		/*border: solid 1px red;*/
	}
	.fabu-article:hover{
		background: blueviolet;
		border:solid 1px blueviolet;
		box-shadow: 2px 2px 15px #fff;
	}
	.article-main-main-floor ul {
		background: #f5f5f5;
		padding: 0;
		margin: 0;
	}
	.article-main-main-floor ul li{
		cursor: pointer;
		padding: 8px 15px;
		margin: 3px 0px;
		background: #FFFFFF;
	}
	.article-main-main-floor .article-main-main-floor-li-top{
		overflow: hidden;		
	}
	.article-main-main-floor .article-main-main-floor-li-top img{
		width: 40px;
		height: 40px;
		border-radius: 40%;
	}
	.article-main-main-floor .article-main-main-floor-li-top .left{
		float: left;
		position: relative;
	}
	.article-main-main-floor .article-main-main-floor-li-top .left p{
		position: absolute;
		width: 80px;
		font-size: 12px;
		color: #888;
		top:2px;
		left: 60px;
	}
	.article-main-main-floor .article-main-main-floor-li-top .right{
		float: right;
	}
	.article-main-main-floor .article-main-main-floor-li-top .right span{
		font-size: 12px;
		display: inline-block;
		margin-right:10px ;
		color: #888;
	}
	.article-main-main-floor-li-floor{
		margin-top: 5px;
	}
	.article-main-main-floor-li-floor p{
		float: left;
	}
	.article-main-main-floor-li-floor span{
		float: right;
		color: orange;
		font-size: 12px;
	}
</style>