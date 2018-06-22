<template>
	<div id="article-show">
		
		<div v-if="data.author">
			
			<div class="article-show-main">
				<div class="show-top">
					<p class="left"> 
						<i class="fa fa-angle-left" @click="fanhui">  </i>
						<span> {{data.type}} </span>
					</p>
					<p class="right">
						<span> 楼主 </span>
						<i class="fa fa-heart-o">  </i>
					</p>
				</div>
				<div class="show-main">
					<div class="show-main-author">
						<section class="top">
							<div class="left">
								<img style="cursor: pointer;" @click="user(data.author._id)" :src="'http://localhost:2200/img/' + data.author.img + '.jpg'" alt="" />
								<p>
									<span style="color: red;"> {{data.author.name}} </span>
									<span> <i class="fa fa-spinner" style="display: inline-block;margin-right: 8px;">  </i>{{data.times | data}} </span>
								</p>
							</div>
							<div class="right" @click="dianzan(data._id)">
								<i class="fa fa-thumbs-up" style="color: orangered;">  </i>
								<span style="color: orangered"> {{data.like_num + dianzans}} </span>
							</div>
						</section>
						<section class="main">
							<h3 style="text-align: center; margin-top: 5px"> {{data.title}} </h3>
							<p> 
								{{data.content}}
							</p>
							<!--/static/img/1510151524701.jpg-->
							<img v-if="data.img" :src="'http://localhost:2200/img/' + data.img + '.jpg'" /><br /><br />
							<span style="color: red;"> <i class="fa fa-heart-o" style="cursor: pointer;">  </i> {{data.pay_num}} </span>
							
						</section>
					</div>
					<div class="show-main-reply">
						<h2 v-if="reply.length < 1" style="font-size: 12px; margin-top: 20px; text-align: center; font-weight: 100; color: red;" > 暂无回复! </h2>
						<div class="show-reply" v-else="">
							<ul class="all-toto">
								
								<li v-for="(data,ins) in reply"> 
									<div @click="getcomment(ins,data)">
										
										<div class="top">
											<div class="top-left">
												<section>
													<img style="cursor: pointer;" @click="user(data.author_id._id)"  :src="'../../static/' + data.author_id.img + '.png'" alt="" />
													<p> 
														<span> {{data.author_id.name}} <i :style="{color:data.author_id.use_style.color}"> {{data.author_id.use_style.name}} </i> </span>
														<span style="display: block;margin-top: 0px;"> {{data.time | time}}  <i> 第{{ins + 1}}楼 </i></span>
													</p>
												</section>
											</div>
											<div class="top-right">
												<span> 
													<i class="fa fa-thumbs-up" style="color:#999;"></i>
													{{data.like_num}}
												</span>
												<span @click.stop="commentShow(data)"> 
													<i class="fa fa-comment-o" style="color:#999;">  </i>
													{{data.comment_num}}
												</span>
											</div>
										</div>
										<div style="margin-top: 10px;text-align: center;">
											<img v-if="data.img" style="width: 50%;height: 50%;" :src="'http://localhost:2200/img/' + data.img + '.jpg'" />
											<p style="font-size: 14px;text-align: left;"> {{data.content}} </p>
										</div>
									
									</div>
									<ul class="comment-li" v-if="num == ins">
										<li>
											<comment-list :data="commentlist"></comment-list>
										</li>
									</ul>
									
								</li>
							
							</ul>
							 
						</div>
					</div>
				</div>
			</div>
			<!--一级回复-->
			<div @click="showReply" class="one-reply">
				<i class="fa fa-pencil">  </i>
			</div>
			<!--一级回复-->
			<re-ply></re-ply>
			<co-mment :time="arr"></co-mment>
			
		</div>
		<div v-else="">
			
			<h1> 文章不存在!!! </h1>
		</div>
		<index-error :data="error"></index-error>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	//一级回复的组件
	import RePly from '../components/RePly'
	//二级回复的组件
	import CoMment from '../components/CoMment'
	//所有的二级回复多级回复
	import CommentList from '../components/user/CommentList'
	//错误信息提示页面
	import IndexError from '../components/IndexError'
	export default {
		components:{
			RePly,
			CoMment,
			CommentList,
			IndexError,
		},
		data:function(){
			return {
				//文章
				data:{
					author:''
				},
				c:'#EEEED1',
				//一级回复
				reply:[],
				err:'',
				//二级回复所对应的一级回复 的时间和回复的那个人
				arr:[],
				//二级回复的展开还是收缩
				num:-1,
				//所有的三级二级回复
				commentlist:[],
				//单个三级二级回复
//				onecomment:[],
				//当前页面的本次点赞次数,
				dianzans:0,
				//错误信息
				error:''
			}
		},
		mounted:function(){
			var id = this.$route.params.id
			axios.post('/los/article/show/' + id).then((data) => {
				
				if( data.data.message ){
					//当前文章
					this.data = data.data.message[0];
					//一级回复
					this.reply = data.data.message[1];
					
				}else{
					this.err = '获取文章失败,请联系管理员'
					alert('获取文章失败,请联系管理员!')
				}
				
			}).catch((err) => {
				console.log(err)
			})
		},
		methods:{
			fanhui:function(){
				this.$router.push('/article')
			},
			//显示一级回复的框架
			showReply:function(){
				if($('.admin').hasClass('true')){
					$('#reply').css('display','block')
				}else{
					alert('请先登录!')
					$('.dengyin').css('display','block')
				}
					
			},
			//显示二级回复的框架
			commentShow:function(ev){
//				this.time = ev.time
				this.arr = []
				this.arr.push(new Date(ev.time).getTime())
				this.arr.push('回复' + ' ' + ev.author_id.name + ':')
				if($('.admin').hasClass('true')){
					$('#comment').css('display','block')
				}else{
					alert('请先登录!')
					$('.dengyin').css('display','block')
				}
			},
			//所有的二级回复获取
			getcomment:function(ev,data){
				if( this.num == ev ){
					this.num = -1
				}else{
					this.num = ev
					
					var id = {};
					id['num'] = data._id;
					axios({
						url:'/los/article/reply/commentlist',
						method:'POST',
						data:$.param(id),   //将数据转换成字符串序列化对
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
						if( data.data.message ){
							this.commentlist = data.data.message
						}else{
							alert(data.data)
						}
					}).catch((err) => {
						console.log('获取失败')
					})
					
					
				}
			},
			//点击其他用户的姓名
			user:function(id){
				
				
				
				
				if($('.admin').hasClass('true')){
					if( this.$store.state.user._id == id){
					this.$router.push('/user')
				}else{
					this.$router.push('/firend/' + id)
				}
				}else{
					alert('请先登录!')
				}
			},
			//点赞功能
			dianzan:function(id){
				this.dianzans ++
				if( this.dianzans >= 10 ){
					this.dianzans = 10
					this.error = '每次最多只能点赞十次哟!'
					$('#error').css('display','block')
					$('#error').animate({
						opacity:0
					},2200,function(){
					$('#error').css('display','none')	
					})
				}else{
					
				}
				console.log(id)
			}
		}
	}
	
	
</script>

<style scoped="">
	ul{
		list-style: none;
	}
	.fa-spinner{
		color:red;
		animation-name: zhuan;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-timing-function:linear; 
	}
	
	@keyframes zhuan{
		from{
			transform:rotate(0deg);
		}
		to{
			transform:rotate(360deg);
		}
	}
	
	#article-show{
		margin-bottom: 50px;
	}
	.article-show-main{
		top: 0;
		border-top: solid 0.5px #3388FF;
		position: relative;
	}
	.article-show-main .show-top{
		overflow: hidden;
		position: fixed;
		top: 0;
		z-index: 1;
		background: #3388FF;
		height: 50px;
		width: 100%;
	}
	.article-show-main .show-top p{
		height: 50px;
	}
	.article-show-main .show-top p i,
	.article-show-main .show-top p span{
		line-height: 50px;
		color:#fff;
	}
	.article-show-main .show-top .left{
		float: left;
		overflow: hidden;
	}
	.article-show-main .show-top p{
		padding-left: 15px;
	}
	.article-show-main .show-top .left i{
		font-size: 30px;
		text-align: center;
		width: 40px;
		cursor: pointer;
		float: left;
	}
	.article-show-main .show-top .left span{
		font-size: 15px;
	}
	.article-show-main .show-top .right{
		float: right;
		overflow: hidden;
		margin-right: 60px;
	}
	.article-show-main .show-top .right span{
		float: left;
		margin-right: 10px;
		line-height: 25px;
		margin-top: 10px;
		cursor: pointer;
		padding: 1px 10px;
		border-radius: 3px;
		border: solid 1px burlywood;
	}
	.article-show-main .show-top .right i{
		float: right;
		cursor: pointer;
		margin-top: 2px;
	}
	
	
	.show-main{
		margin-top: 50px;
		padding: 5px 10px;
	}
	.show-main .show-main-author{
		border-bottom: solid 1px #DEDEDE;
		padding-bottom:10px ;
	}
	.show-main .show-main-author .top{
		padding-bottom: 5px;
		border-bottom: solid 1px #f5f5f5;
	}
	.show-main .show-main-author .top{
		overflow: hidden;
	}
	.show-main-author .top .left{
		float: left;
		overflow: hidden;
	}
	.show-main-author .top .left img{
		width: 50px;
		border-radius: 50%;
		float: left;
	}
	.show-main-author .top .left p{
		padding-top: 5px;
		float: right;
		margin-left: 10px;
	}
	.show-main-author .top .left p span{
		display: block;
		color: #555;
		font-size: 12px;
	}
	.show-main-author .top .right{
		float: right;
		margin-top: 10px;
		cursor: pointer;
		margin-right: 10px;
	}
	.show-main .show-main-author .main{
		text-align: center;
	}
	.show-main .show-main-author .main img{
		width: 80%;
		height: 80%;
	}
	.show-main .show-main-author .main p{
		text-align: left;
		width: 100%;
		word-wrap: break-word;
	}
	.one-reply{
		position: fixed;
		background: #3388FF;
		z-index: 1;
		right: 40px;
		bottom: 80px;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		cursor: pointer;
		box-shadow:0px 2px 4px #BFEFFF;
		color: #fff;
	}
	.one-reply i{
		font-size: 20px;
		margin-top: 10px;
		margin-left: 14px;
		display: block;
	}
	/*一级回复*/
	.show-main-reply ul.all-toto{
		padding: 3px 10px;
	}
	.show-main-reply ul.all-toto > li{
		margin: 4px 0px;
		padding: 2px 2px 5px 2px;
		border-bottom: solid 1px #DEDEDE;
	}
	.show-main-reply ul.all-toto  > li .top img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.show-main-reply ul.all-toto >  li .top{
		overflow: hidden;
	}
	.show-main-reply ul.all-toto  > li .top .top-left{
		float: left;
	}
	.show-main-reply ul.all-toto  > li .top .top-right{
		float: right;
	}
	.show-main-reply ul.all-toto  > li .top .top-left p{
		display:inline-block;
		margin-left: 5px;
	}
	.show-main-reply ul.all-toto  > li .top .top-left p span{
		font-size: 12px;
		color: #C2C2C2;
		font-weight: 100;
	}
	.show-main-reply ul.all-toto  > li .top .top-left p span i{
		font-style: initial;
		display: inline-block;
		margin-left: 3px;
	}
	.show-main-reply ul.all-toto >  li .top .top-right{
		
	}
	.show-main-reply ul.all-toto  > li .top .top-right span{
		font-size: 12px;
		display: inline-block;
		margin-left: 8px;
		color: #3388FF;
		cursor: pointer;
	}
	
	.all-toto .main p{
		width: 100%;
		word-wrap: break-word;
	}
</style>