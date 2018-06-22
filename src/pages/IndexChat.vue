<template>
	<div id="chat">
		<div class="main">
			<h2> 在线聊天室 </h2>
			<div class="chatshow">
				<div class="list">
					<ul>
						
					</ul>
				</div>
				<section>
					
					<form action="" method="post">
						<input type="text" name="message" id="message" value="" placeholder="您可以在此处进行发言" required=""/>
						<button type="submit"> 提交 </button>
					</form>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import VueSocketio from 'vue-socket.io';
    import Vue from 'vue'
	Vue.use(VueSocketio, 'http://192.168.13.212:2100');
	export default {
		data:function(){
			return {
				
			}
		},
		mounted:function(){
			var that = this
			setTimeout(function(){
				if( $('.admin').hasClass('true') ){
					$('#chat section').removeClass('active')
					
					//发送进入的消息
					that.$socket.emit('add',{
						name:that.$store.state.user.name
					})
					
				}else{
					$('#chat section').addClass('active')
					alert('请先登录!')
				}
			},500)
			
			this.tijiao()
		
		},
		sockets:{
			//接受欢迎某个人进入的消息\n 
//			connect(data) {
//				console.log(data)
//			    console.log('socket connected');
//			},
			//进入时的消息
			jojn(data) {
				var str = '<li class="xitong">欢迎<span class="user">' + data.hy + '</span>进入聊天室</li>'
				var str2 = '<li class="xitong">当前在线人数<span class="num">' + data.num + '</span>人</li>'
				$('.list ul').append(str)
				$('.list ul').append(str2)
				$('.xitong').css('display','block')
				$('.xitong').css('text-align','center')
				$('.xitong').css('marginTop','10px')
				$('.xitong').css('fontSize','12px')
				
				$('.user').css('color','red')
				$('.num').css('color','red')
				//自动让滑轮落到最下方
				$(function(){
					var h = $(document).height()-$(window).height();
					$(document).scrollTop(h);
				});
		   },
		   //退出时的消息
		   tuichu(data){
				var str = '<li class="xitong">用户<span class="user">' + data.name + '</span>已经退出</li>'
				var str2 = '<li class="xitong">当前在线人数<span class="num">' + data.num + '</span>人</li>'
				
				$('.list ul').append(str)
				$('.list ul').append(str2)
				$('.xitong').css('display','block')
				$('.xitong').css('text-align','center')
				$('.xitong').css('marginTop','10px')
				$('.xitong').css('fontSize','12px')
				
				$('.user').css('color','red')
				$('.num').css('color','red')
				$(function(){
					var h = $(document).height()-$(window).height();
					$(document).scrollTop(h);
				});
		   },
		   //接受所有用户发出的消息
		   all(data){
		   	var str = '<li class="info"><span class="user">' + data.name + '</span>:<span>' + data.content  +  '</span></li>'
		   	$('.list ul').append(str)
			$('.info').css('display','block')
			$('.info').css('text-align','left')
			$('.info').css('marginTop','10px')
			$('.info').css('marginLeft','5px')
			$('.info').css('fontSize','15px')
		   	
			$('.user').css('color','red')
			$(function(){
				var h = $(document).height()-$(window).height();
				$(document).scrollTop(h);
			});
			
		   }
		},
		methods:{
			//发出消息
			tijiao:function(){
				var that = this
				$('form').submit(function(ev){
					ev.preventDefault()
					var form = $(ev.target)
					var content = form.find('input').val()
					that.$socket.emit('content',{
						content:content
					})
					form.find('input').val('')
				})
			}
		}
	}
</script>

<style scoped="">
	#chat{
		
	}
	.main > h2{
		position: fixed;
		top: 0;
		width:100% ;
		text-align: center;
		background: #3388FF;
		color: #333;
		padding: 3px;
	}
	.chatshow{
		margin-top: 50px;
	}
	section{
		position: fixed;
		bottom: 55px;
		width: 100%;
	}
	section.active{
		display: none;
	}
	section input{
		width: 80%;
		height: 30px;
		padding: 5px;
	}
	section button{
		width: 18%;
		background: #3388FF;
		border: solid 1px #3388FF;
		line-height: 25px;
		border-radius: 3px;
	}
	ul li{
		display: block;
		width: 100%;
		text-align: center;
		font-size: 12px;
	} 
	.list{
		margin-bottom: 100px;
	}
</style>