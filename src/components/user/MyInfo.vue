<template>
	<div id="myinfo">
		<tui-chu title="我的消息"></tui-chu>
		<div class="myinfo-main">
			<div class="myinfo-main-top">
				<ul>
					<li> <span @click="weidu" class="active"> 未读消息 </span> </li>
					<li> <span @click="yidu" > 已读消息 </span> </li>
				</ul>
			</div>
			<div class="myinfo-main-floor">
				<ul class="false active">
					<!--普通文章@-->
					<li v-for="(val,ins) in weidus" v-if="val.type == 'AT'"> 
						<a href="" @click="tarticle($event,val.article_id.times)">
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'中@了你: </a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
					<!--回复中@-->
					<li v-for="(val,ins) in weidus" v-if="val.type == 'ReplyAT'"> 
						<a href="" @click="tarticle($event,val.article_id.times)">
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'回复中@了你 :
							</a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
					<!--普通回复-->
					<li v-for="(val,ins) in weidus" v-if="val.type == 'Reply'"> 
						<a href="#" @click="tarticle($event,val.article_id.times)"> 
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'回复了你 : 
							</a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
				</ul>
				<div class="alltrue" @click="alltrue">
					<i class="fa fa-refresh">  </i>
				</div>
				<ul class="true">
					<!--普通文章@-->
					<li v-for="(val,ins) in yidus" v-if="val.type == 'AT'"> 
						<a href="#" @click="tarticle($event,val.article_id.times)"> 
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'中@了你: </a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
					<!--回复中@-->
					<li v-for="(val,ins) in yidus" v-if="val.type == 'ReplyAT'"> 
						<a href="#" @click="tarticle($event,val.article_id.times)"> 
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'回复中@了你 :
							</a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
					<!--普通回复-->
					<li v-for="(val,ins) in yidus" v-if="val.type == 'Reply'"> 
						<a href="#" @click="tarticle($event,val.article_id.times)"> 
							<a href="#"> {{val.use_at.name}}在文章'{{val.article_id.title}}'回复了你 : 
							</a>
							<a style="display: inline-block;margin-left: 10px; color: #3388FF;" href="#">{{val.reply_content}}</a>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import TuiChu from './TuiChu'
	import axios from 'axios'
	import $ from 'jquery'
	export default {
		data:function(){
			return {
				myinfo:this.$store.state.user,
				weidus:[],
				yidus:[],
			}
		},
		components:{
			TuiChu
		},
		props:['content'],
		mounted:function(){
			var that = this
			var xx = this.content.xx
			xx.forEach(function(data){
				if( data.has_look ){
					that.yidus.push(data)
				}else{
					that.weidus.push(data)
					$('.alltrue').addClass('active')
				}
				
			})
			var width = window.screen.width
			$('.myinfo-main-floor ul').css('width',width)
		},
		updated:function(){
			this.myinfo = this.$store.state.myuser
		},
		methods:{
			//点击未读的选项卡
			weidu:function(ev){
				var span = $(ev.target)
				span.parent().parent().find('span').removeClass('active')
				span.addClass('active')
				$('.myinfo-main-floor ul').removeClass('active')
				$('.myinfo-main-floor ul').eq(span.parent().index()).addClass('active')
				if( this.weidus.length > 0 ){
					$('.alltrue').addClass('active')
				}
			},
			//点击已读的选项卡
			yidu:function(ev){
				var span = $(ev.target)
				span.parent().parent().find('span').removeClass('active')
				span.addClass('active')
				$('.myinfo-main-floor ul').removeClass('active')
				$('.myinfo-main-floor ul').eq(span.parent().index()).addClass('active')
				
				$('.alltrue').removeClass('active')
				
			},
			//跳转文章
			tarticle:function(ev,time){
				ev.preventDefault()
				var time = new Date(time).getTime()
				console.log(time)
				this.$router.push('/article/show/' + time)
			},
			//所有消息已读
			alltrue:function(){
				if($('.admin').hasClass('true')){
					console.log('可以执行')
					axios({
						url:'/los/user/info/all',
						method:'POST',
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
						alert(data.data)
						window.location.reload();
					}).catch((err) => {
						console.log(err)
					})
				}else{
					alert('请先登录!')
				}
			}
		},

	}
</script>

<style scoped="">
	ul{
		list-style: none;
	}
	#myinfo{
		width: 100%;
		height: 100%;
	}
	.myinfo-main{
		/*padding: 20px;*/
		margin-top: 40px;
	}
	.myinfo-main-top{
		background: #3388ff;
		padding: 0;
	}
	.myinfo-main-top ul{
		overflow: hidden;
		list-style: none;
	}
	.myinfo-main-top ul li{
		padding: 3px;
		float: left;
		width: 50%;
		text-align: center;
		color: #fff;
	}
	.myinfo-main-top ul li span{
		font-size: 14px;
		cursor: pointer;
		line-height: 30px;
		display: inline-block;
	}
	.myinfo-main-top ul li span.active{
		color: orange;
		border-bottom: 2px solid orange;
	}
	.myinfo-main-floor{
		position: relative;
		width: 100%;
		/*overflow: hidden;*/
	}
	.myinfo-main-floor ul{
		/*opacity: 0;*/
		/*transition: 0.5s;*/
		display: none;
		position: absolute;
	}
	.myinfo-main-floor ul.active{
		opacity: 1;
		display: block;
	}
	.myinfo-main-floor ul{
		padding: 10px;
	}
	.myinfo-main-floor ul li{
		margin-bottom: 10px;
		padding: 5px 10px;
		margin-top: 5px;
		width: 100%;
		border-bottom: solid 1px #ccc;
		overflow: hidden;
	}
	.myinfo-main-floor ul li a{
		font-size: 13px;
		float: left;
		line-height: 25px;
		color: #3388ff;
		display: inline-block;
		width: 100%;
		word-wrap: break-word;
	}
	.myinfo-main-floor ul li p{
		padding-right: 10%;
		overflow: hidden;
		width: 100%;
	}
	.myinfo-main-floor ul li span{
		display: inline-block;
		text-align: center;
		float: right;
		cursor: pointer;
		font-size: 12px;
		line-height: 25px;
		background:#8968CD;
		border-radius: 5px;
		color: #fff;
		width: 80px;
	}
	.myinfo-main-floor .true li{
		text-align: center;
	}
	.myinfo-main-floor .true li a{
		color: #222;
		display: inline-block;
	}
	.myinfo-main-floor ul li p{
		width: 100%;
		word-wrap: break-word;
	}
	.myinfo-main-floor ul li p i,
	.myinfo-main-floor ul li p span,
	.myinfo-main-floor ul li p a,{
	}
	
	.alltrue{
		background: #FF0000;
		width:70px;
		height: 70px;
		border: solid 1px red;
		border-radius: 50%;
		box-shadow: 0px 0px 5px #8A2BE2;
		color: #fff;
		position: fixed;
		bottom: 60px;
		left:41%;
		transition: 0.5s;
		cursor: pointer;
		display: none;
	}
	.alltrue.active{
		display: block;
	}
	.alltrue:hover{
		border: solid 1px #8A2BE2;
		background: #8A2BE2;
		box-shadow:none;
		color: orange;
	}
	.alltrue i{
		display: block;
		margin-top:20px ;
		margin-left: 22px;
		font-size: 28px;
	}
</style>