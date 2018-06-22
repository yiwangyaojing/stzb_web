<template>
	<div id="friend">
		<div class="mains">
			<div class="tops">
				<div class="top-top">
					<img style="cursor: pointer;":src="'http://localhost:2200/img/' + friend.img + '.jpg'" /><br />
					<span>  {{friend.name}} </span><br />
					<span style="color: red;"> <i class="fa fa-coffee" style="color: #fff;">  </i> {{friend.jifen}} </span>
				</div><br /><br />
				<div class="top-floor" style="margin-top: 10px;">
					 <tab :line-width=2 active-color='#fc378c' v-model="index" >
				        <tab-item class="vux-center" :selected="demo2 === item" @on-item-click="dianji(item)" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
				     </tab>
				</div>
			</div>
			<div class="footer">
				<swiper v-model="index" height="100px" :show-dots="false">
				        <swiper-item v-for="(item, index) in list2" :key="index">
				          <div class="tab-swiper vux-center">
				          		<div class="myarticle-main">
										<ul v-if="item == '文章'">
											<li v-for="(val,ins) in content"> 
												<a href="#" @click="lookarticle(val.times)">
													<div> 
														<div class="top">
															<img :src="'http://localhost:2200/img/' + friend.img + '.jpg'"  alt="" />
															<p> 
																<span> {{friend.name}} </span>
																<span> {{val.times | time}} </span>
															</p>
															<section>
																<span> 
																	<i class="fa fa-thumbs-up" style="color: #3388FF;">  </i>{{val.like_num}}
																</span>
																<span>
																	<i class="fa fa-commenting-o" style="color: #3388FF;"> </i> {{val.reply_num}}
																</span>
															</section>
														</div>
														<div class="footer">
															<h4> {{val.title}} </h4>	
															<p> {{val.content}} </p>
														</div>
													</div>
												</a>
											</li>
										</ul>
										<div class="touxian" v-if="item == '头衔'">
											<li v-for="(val,ins) in style">
												<div>
													<span :style="{'color':val.color}"> {{val.name}} </span>
												</div>
											</li>
										</div>
										<div v-if="item == '陪将'">
											<div style="text-align: center;">
												暂无陪将消息
											</div>
										</div>
									</div>
				          </div>
				        </swiper-item>
				      </swiper>
			</div>
		
			<div class="addfriend" v-if="!is" @click="addfriend(id)"> 
				<i class="fa fa-angle-double-right">  </i>
				<span class="fa fa-venus-mars">
				</span>
				<i class="fa fa-angle-double-left">  </i>
			</div>
			
			<div class="addfriend" style="width: 50px;height: 50px;" v-if="is"> 
				<span class="fa fa-edit" style="margin-top: 12px; margin-left: 6px;color: #fff;">  </span>
			</div>
		</div>
					
		
		<section id="isadd">
			<div>
				<h2> 确认添加好友? </h2>
				<p> <span @click="noadd"> 取消 </span> <span @click="yesadd"> 添加 </span> </p>
			</div>
		</section>
			
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
	const list = () => ['头衔', '文章', '陪将']
	export default {
		data:function(){
			return {
				friend:{},
			    list2: list(),
			    demo2: '精选',
			    demoDisabled: 'A',
			    index: 0,
			    getBarWidth: function (index) {
			        return (index + 1) * 22 + 'px'
			    },
			    content:'',
			    //头衔
			    style:'',
			    //是否显示添加好友的按钮
      			is:false,
      			//当前朋友的id
      			id:''
			}
		},
		props:['data'],
		components: {
		    Tab,
		    TabItem,
		    Sticky,
		    Divider,
		    XButton,
		    Swiper,
		    SwiperItem
		},
		mounted:function(){
			var that = this
			that.id = this.$route.params.id
			var id = {
				id:this.$route.params.id
			}
			
			axios({
				url:'/los/user/friend',
				method:'POST',
				data:$.param(id),   //将数据转换成字符串序列化对
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then((data) => {
				if( data.data.message ){
					that.friend = data.data.message
					var user_friend = data.data.message.user_friend
					var id = data.data.newid
					var is = false;
					$('.vux-swiper').css('height','380px');
					that.style = data.data.message.list_style
					if(  user_friend  ){
						user_friend.forEach((user) => {
							if( user.id == id ){
								is = true
								that.is = true;
								return console.log('是好友')
							}else{
								console.log('不是好友')
							}
						})
					}
					if( is ){
						console.log('是好友')
					}else{
						console.log('不是好友')
					}
					
				}else{
					alert(data.data)
				}
			}).catch((err) => {
				console.log(err)
			})
			
		},
		methods:{
			dianji:function(val){
				if( val == '文章' ){
					var that = this
					var id = {
						id:this.friend._id
					}
					axios({
						url:'/los/user/allarticle',
						method:'POST',
						data:$.param(id),   //将数据转换成字符串序列化对
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
						if(data.data.message){
							that.content = data.data.message
							var height = 150 * data.data.message.length;
							$('.vux-swiper').css('height',height);
						}else{
							alert(data.data)
						}
					}).catch((err) => {
						console.log(err)
					})
				}else{
					$('.vux-swiper').css('height','380px');
				}
				
				
			},
			//点击查看文章
			lookarticle:function(time){
				var time = new Date(time).getTime()
				console.log(time)
				console.log('article/show/' + time)
				this.$router.push('/article/show/' + time)
			},
			//是否添加好友?
			addfriend:function(id){
				
				if($('.admin').hasClass('true')){
					
				$('#isadd').addClass('active')
				}else{
					alert('请先登录!')
				}
				
				
				
			},
			//不添加好友
			noadd:function(){
				$('#isadd').removeClass('active')
				console.log('butianjia ')
			},
			//确认添加好友
			yesadd:function(){
				var id = {
						id:this.id
					}
				axios({
					url:'/los/add/true/friend',
					method:'POST',
					data:$.param(id),   //将数据转换成字符串序列化对
					headers:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then((data) => {
					console.log(data)
					alert(data.data)
					window.location.reload();
				}).catch((err) => {
					console.log(err)
				})
			}
		},	
		updated:function(){
			
			
		},
	}
	
</script>

<style scoped="">
	*{
		box-sizing: border-box;
	}
	ul{
		list-style:none;
	}
	#friend{
		/*width: 100%;*/
		/*height: 100%;*/
	}
	.mains{
		margin-bottom: 40px;
		/*width: 100%;*/
		/*height: 100%;*/
	}
	.mains .tops{
		background: url(https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1510391707&di=3ac8925c3e01914d3696e6b1d8fe0b2b&src=http://pic.58pic.com/58pic/17/16/41/06G58PICfVz_1024.jpg);
		width: 100%;
		height: 272px;
		color:#fff;
	} 
	.mains .tops .top-top{
		text-align: center;
	}
	
	.mains .tops .top-top img{
		margin-top: 10px;
		width: 100px;
		height: 100px;
		border-radius:50%;
	}
	.mains .tops .top-floor ul{
		overflow: hidden;
	}
	.mains .tops .top-floor ul li{
		text-align: center;
		float: left;
		width:33%;
	}
	.mains .footer{
		width: 100%;
		height: 60%;
	} 
	.vux-tab{
		background-color: transparent;
		cursor: pointer;
	}
	
	
		.myarticle-main{
		margin-top:40px;
	}
	.myarticle-main ul li{
		padding: 10px;
	}
	.myarticle-main ul li .top{
		overflow: hidden;
	}
	.myarticle-main ul li .top img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		float: left;
	}
	.myarticle-main a{
		color: #000;
	}
	.myarticle-main ul li a > div{
		padding-bottom: 15px;
		border-bottom: solid 1px #DEDEDE;
	}
	.myarticle-main ul li .top p{
		float: left;
		margin-left: 10px;
	}
	.myarticle-main ul li .top p span{
		display: block;
		font-size: 12px;
	}
	.myarticle-main ul li .top section{
		float: right;
	}
	.myarticle-main ul li .top section span{
		display: inline-block;
		margin-right: 10px;
		font-size: 12px;
		font-weight: 100;
	}
	.myarticle-main ul li .top section span i{
		margin-right: 3px;
	}
	.myarticle-main .footer h4{
		font-size: 15px;
		font-weight: 100;
		text-align: center;
		
	}
	.myarticle-main .footer p{
		padding-left: 10px;
		width: 100%;
		font-size: 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	
	.myarticle-main .touxian div{
		border: solid 1px #3388FF;
		width: 80px;
		height: 80px;
		cursor: pointer;
		box-shadow: 0px 0px 20px #888;
		background: #3388FF;
		border-radius: 50%;
		margin-left: 10px;
        animation-name: bg;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function:linear; 
	}
	@keyframes bg{
		5%{
			
   			 box-shadow: inset -1px 1px 3px 2px #88888, inset 1px -1px 3px 2px #222222, 0 0 0px 0 #b2ff1a;
			transform: rotateX(20deg);
		}
		10%{
			transform: rotateX(0deg);
		}
		15%{
			transform: rotateX(10deg);
		}
		20%{
			transform: rotateX(0deg);
		}
		25%{
			transform: rotateX(10deg);
		}
		30%{
			transform: rotateX(0deg);
		}
		
		35%{
			transform: rotateZ(10deg);
		}
		40%{
			transform: rotateZ(0deg);
		}
		
		45%{
			transform: rotateY(10deg);
		}
		50%{
			
    box-shadow: inset -1px 1px 3px 2px #88888, inset 1px -1px 3px 2px #222222, 0 0 20px 0 #1affff;
			transform: rotateX(0deg);
		}
		55%{
			transform: rotateY(0deg);
		}
		60%{
			transform: rotateX(20deg);
		}
		65%{
			transform: rotateX(0deg);
		}
		70%{
			transform: rotateX(10deg);
		}
		75%{
			transform: rotateX(0deg);
		}
		80%{
			transform: rotateX(10deg);
		}
		85%{
			transform: rotateX(0deg);
		}
		90%{
			transform: rotateZ(10deg);
		}
		95%{
			
    box-shadow: inset -1px 1px 3px 2px #88888, inset 1px -1px 3px 2px #222222, 0 0 0px 0 #b2ff1a;
			transform: rotateZ(0deg);
		}
		
	}
	.myarticle-main .touxian div span{
		font-size: 12px;
		text-align: center;
		display: block;
		margin-top: 25px;
	}
	.addfriend{
		cursor: pointer;
		position: fixed;
		bottom: 80px;
		left: 42%;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: #FF3E96;
	}
	.addfriend span{
		text-align: center;
		display: block;
		margin-top: 20px;
		font-size: 27px;
		color: blueviolet;
	}
	.addfriend i{
		position: absolute;
		color: orange;
	}
	.addfriend i:last-child{
		right: -40px;
		font-size: 35px;
		top: 24px;
        animation-name: is;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function:linear; 
	}
	
	@keyframes is{
		0%{
			transform: translateX(20px);
		}
		50%{
			transform: translateX(0px);
		}
		100%{
			transform: translateX(20px);
		}
	}
	
	.addfriend i:first-child{
		left: -40px;
		font-size: 35px;
		top: 24px;
        animation-name: iss;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function:linear; 
	}
		
	@keyframes iss{
		0%{
			transform: translateX(-15px);
		}
		50%{
			transform: translateX(0px);
		}
		100%{
			transform: translateX(-15px);
		}
	}
	
	
	#isadd{
		position: fixed;
		width: 100%;
		height:100%;
		background: rgba(0,0,0,0.5);
		top:0;
		transition: 0.5;
		/*opacity: 1;*/
		display: none;
	}
	
	#isadd.active{
		opacity: 1;
		display: block;
	}
	
	#isadd div{
		border: solid 1px #fff;
		background: #fff;
		width:200px;
		height: 120px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #000000;
		margin: 220px auto;
	}
	
	#isadd div h2{
		font-size: 20px;
		text-align: center;
		margin-top: 15px;
	}
	#isadd div p {
		text-align: center;
		display: block;
		margin: 10px auto;
		margin-top: 15px;
	}
	#isadd div p span{
		cursor: pointer;
		display: inline-block;
		margin-left: 10px;
		margin-right: 10px;
		padding: 3px 10px;
		border-radius:5px;
	}
	#isadd div p span:first-child{
		border: solid 1px lightcoral;
		background:lightcoral;
		color: #fff;
	}
	#isadd div p span:last-child{
		border: solid 1px #3388ff;
		background: #3388ff;
		color: #fff;
	}
</style>