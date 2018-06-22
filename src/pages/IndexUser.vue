<template>
	<div id="user">
		
		<div v-cloak v-show="!all" style="display:none;">
			<h5 style="text-align: center;color: red;"> 请先登录! </h5>
		</div>
		
		<div v-cloak v-show="all" style="overflow: hidden;">
			<div class="user-main">
			<div class="user-top">
				<div class="user-top-main">
					<img style="cursor: pointer;" @click="updatedimg" :src="'http://localhost:2200/img/' + user.img + '.jpg'" />
					<p style="margin-top: 10px;"> {{user.name}} </p>
					<p style="margin-top: 20px;"> <span> <i class="fa fa-coffee">  </i> : {{user.jifen}} </span> <span style="margin-left: 10px;"> {{user.use_style.name}} </span> </p>
				</div>
			</div>
			<div class="user-floor">
				<div class="user-floor-main">
					<ul>
						<li class="myinfo">
							<p> 
								<i class="fa fa-envelope-o">  </i>
								<span class="MyInfo"> 我的消息 </span>
								<b>  </b>
							</p>
						</li>
						<li class="myadmininfo">
							<p> 
								<i class="fa fa-asterisk">  </i>
								<span class="MyAdmin"> 系统消息 </span>
								<b>  </b>
							</p>
						</li>
						<li>
							<p> 
								<i class="fa fa-suitcase">  </i>
								<span class="MyCou">我的收藏 </span>
							</p>
						</li>
						<li style="margin-bottom: 10px;">
							<p> 
								<i class="fa fa-venus-mars">  </i>
								<span style="border-bottom: solid 1px #CCCCCC;" class="MyFriend"> 我的好友 </span>
							</p>
						</li>
						
						
						<li>
							<p> 
								<i class="fa fa-book">  </i>
								<span class="MyArticle"> 我的文章 </span>
							</p>
						</li>
						<li>
							<p> 
								<i class="fa fa-list">  </i>
								<span class="MyReply"> 我的回复 </span>
							</p>
						</li>
						<li>
							<p> 
								<i class="fa fa-refresh">  </i>
								<span class="MyJiang"> 我的配将 </span>
							</p>
						</li>
						<li style="margin-bottom: 10px;">
							<p> 
								<i class="fa fa-reply-all">  </i>
								<span style="border-bottom: solid 1px #CCCCCC;" class="MyjiangReply"> 配将回复 </span>
							</p>
						</li>
						<li>
							<p> 
								<i class="fa fa-leaf">  </i>
								<span class="MyStyle"> 所有头衔 </span>
							</p>
						</li>
						
						<li  style="margin-bottom: 20px;">
							<p> 
								<i class="fa fa-close">  </i>
								<span class="MyBad" style="border-bottom: solid 1px #CCCCCC;"> 黑名单 </span>
							</p>
						</li>
						<li> <p> 
							<i class="fa fa-unlink">  </i> 
							<span  @click="tuichus" style="cursor: pointer;" >退出</span> 
							</p> 
						</li>
					</ul>
				</div>
			</div>
		</div>
		
			<!--所有组件-->
			<!--<transition name="slide">-->
			<div class="user-list">
					<!--我的消息-->
					<!--<my-info></my-info>-->
					<component class="myinfo" :is="isCom" :content="all" key="isCom">
						
					</component>
				</div>
			<!--</transition>-->
			<updated-img></updated-img>
		</div>
		
		</div>
		

</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	
	//个人信息的组件
	import MyInfo from '../components/user/MyInfo'
	//个人朋友的组件
	import MyFriend from '../components/user/MyFriend'
	//个人文章的组件
	import MyArticle from '../components/user/MyArticle'
	//个人回复的组件
	import MyReply from '../components/user/MyReply'
	//个人陪将的组件
	import MyJiang from '../components/user/MyJiang'
	//个人陪将的回复
	import MyjiangReply from '../components/user/MyjiangReply'
	//个人所有头衔
	import MyStyle from '../components/user/MyStyle'
	//更换头像
	import MyTou from '../components/user/MyTou'
	//黑名单
	import MyBad from '../components/user/MyBad'
	//更改头像组件
	import UpdatedImg from '../components/user/UpdatedImg'
	//搜藏
	import MyCou from '../components/user/MyCou'
	//系统消息
	import MyAdmin from '../components/user/MyAdimin'
	export default {
		data:function(){
			return {
				user:{
					use_style:''
				},
				//所有信息
				all:'',
				//切换组件
				isCom:'',
				//所有系统消息
				myAdminInfo:'',
			}
		},
		components:{
			MyInfo,
			MyFriend,
			MyArticle,
			MyReply,
			MyJiang,
			MyjiangReply,
			MyStyle,
			MyTou,
			MyBad,
			UpdatedImg,
			MyCou,
			MyAdmin
		},
		mounted:function(){
			var that = this;
			axios.post('/los/stzb/jiance').then((data) => {
				if(data.data.message){
					this.all = data.data.message
					this.user = data.data.message.user
					this.myAdminInfo = data.data.message.admin
				}else{
				}
				if( data.data.error ){
				}
				
				var message = data.data.message.xx;
				var admininfo = data.data.message.admin;
				//如果有未读消息存在,消息的小圆点显示
				message.forEach(function(dd){
					if(dd){
						if( !dd.has_look ){
							$('.user-floor-main ul li.myinfo p b').addClass('active')
						}
					}
					
				})
				admininfo.forEach(function(dd){
					if( dd ){
						if( !dd.has_look ){
							$('.user-floor-main ul li.myadmininfo p b').addClass('active')
						}
					}
				})
				
			}).catch((err) => {
				console.log('检测失败')
			})
			$('.user-floor-main li span').click(function(ev){
				that.isCom = $(this).attr('class')
				//信息组件进入并且显示
				$('.user-list').css('display','block')
				$('.user-list').removeClass('donghuachus')
				$('.user-list').addClass('donghuaru')
				//个人页面组件出去并且消失
				$('.user-main').removeClass('donghuaru2')
				$('.user-main').addClass('donghuachu')
				setTimeout(function(){
					$('.user-main').css('display','none')
				},500)
			})
		},
		
		updated:function(){
			
		},
		methods:{
			tuichus:function(){
				axios.post('/los/tuichu').then((data) => {
					//退出之后移除类名
					$('.admin').removeClass('true')
					location.href = '/'
				}).catch((err) => {
					
				})
			},
			//更改头像
			updatedimg:function(){
				if($('.admin').hasClass('true')){
					$('#updatedimg').css('display','block')
				}else{
					alert('请先登录!')
					$('.updatedimg').css('display','block')
				}
			}
		}
	}
	
</script>

<style scoped="">
	[v-cloak]{ 
		display: none;
	}
	ul{
		list-style: none;
	}
	/*小组件入场动画*/
	div.donghuaru{
		opacity: 1;
		transition: 0.5s;
		animation-name: jin;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
	}
	
	@keyframes jin{
		from{
			left: 100%;
		}
		to{
			left:0;
		}
	}
	/*个人页面出去动画*/
	div.donghuachu{
		opacity: 0;
		transition: 0.5s;
		color: red;
		animation-name: chu;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
        animation-iteration-count: infinite;
	}
	@keyframes chu{
		from{
			left: 0;
		}
		to{
			left:-100%;
		}
	}
	
		
	/*小组件出场动画*/
	div.donghuachus{
		opacity: 0;
		transition: 0.5s;
		animation-name: chus;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
        display: none;
	}
	
	@keyframes chus{
		from{
			right: 0;
		}
		to{
			right: -100%;
			display: none;
		}
	}
	
	/*个人页面进来动画*/
	div.donghuaru2{
		opacity: 1;
		transition: 0.5s;
		animation-name: jin2;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
	}
	@keyframes jin2{
		from{
			right: 100%;
		}
		to{
			right:0;
		}
	}
	#user{
		width: 100%;
		height: 800px;
	}
	.user-main{
		position: absolute;
		/*overflow: hidden;*/
		width: 100%;
		height: 100%;
	}
	.user-top{
		height: 250px;
		background: cornflowerblue;
	}
	.user-top .user-top-main{
		text-align: center;
	}
	.user-top .user-top-main img{
		margin-top: 35px;
		width: 100px;
		height: 100px;
		border-radius:50% ;
	}
	.user-top .user-top-main p{
		color: #fff;
		padding-left: 10px;
		font-size: 13px;
	}
	.user-top .user-top-main p span{
		display: inline-block;
	}
	.user-floor{
		margin-bottom: 30px;
	}
	.user-floor-main{
		padding: 20px;
		padding-top: 10px;
	}
	.user-floor-main ul{
		overflow: hidden;
	}
	.user-floor-main ul li{
		padding-left:5px ;
	}
	.user-floor-main ul li p{
		
	}
	.user-floor-main ul li p i,
	.user-floor-main ul li p span{
		display: inline-block;
		margin-top: 10px;
		padding-bottom: 10px;
	}
	.user-floor-main ul li p i{
		margin-right: 25px;
		color:lightpink;
	}
	.user-floor-main ul li p span{
		width: 200px;
		font-size: 13px;
		color: #111;
		cursor: pointer;
	}
	/*个人消息*/
	
	
	.user-list{
		background: #fff;
		position: absolute;
		top: 0;
		width: 100%;
		height: 800px;
		display: none;
		/*overflow: hidden;*/
		/*left: 100%;*/
		margin: 0;
	}
	.user-floor-main ul li p{
		position: relative;
	}
	.user-floor-main ul li p b{
		display: none;
		position: absolute;
		width: 10px;
		height: 10px;
		background: rgba(255,62,150,0.5);
		top: 15px;
		left: 120px;
		border: solid 1px rgba(255,62,150,0.1);
		border-radius:50%;
		box-shadow: 2px 2px 3px rgba(255,62,150,0.5);
	}
	.user-floor-main ul li p b.active{
		display: block;
	}
</style>