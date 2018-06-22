<template>
	<div>
		<div class="dengyin">
			<div class="dengluform">
				<form action="" method="post">
					<h2> <i class="fa fa-user">  </i> </h2>
					<h4> 账号 </h4>
					<input type="text" name="username" id="username" required="" v-model="user.name" placeholder="请输入用户名/邮箱" /><br />
					<span v-if="name"> 用户名或邮箱格式不正确 </span>
					<h4> 密码 </h4>
					<input type="password" name="password" id="password" required="" v-model="user.pas" placeholder="请输入密码" /><br />
					<span v-if="pas"> 密码不能有空格3到20位 </span>
					<br />
					<div class="t">
						<p class="none" style="margin-right: 20px;"> 取消 </p>
						<input class="denglu" type="submit" value="登录" v-bind:disabled="post"></input>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'

	import Vue from 'Vue'
	
	
	export default {
		components: {
			
		},
		data() {
			return {
				user:{
					name:'',
					pas:'',
				},
				name:false,
				pas:false,
				post:true,
			}
		},
		mounted:function(){
			var height = window.screen.height
			$('.dengyin').css('height',height)
			//提交注册
//			this.dengluz()
			//隐藏模态框
			this.none()
			this.dengluz()
		},
		updated:function(){
			
			if( this.name || this.pas ){
				this.post = true
			}else{
				this.post = false
			}
			if($('.denglu').attr('disabled')){
				$('.denglu').css('background','#ccc')
			}else{
				$('.denglu').css('background','#3388ff')
			}
			var that = this
			//用户名验证
			var usertest = /^[A-Za-z0-9]{5,15}$/
			var emiltest = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if( this.user.name.indexOf('@') > 0 ){
				if( this.user.name.indexOf(" ") > 0){
					return this.name = true
				}else{
					this.name = false
				}
				
			}else{
				if( this.user.name.indexOf(" ") > 0 ){
					return this.name = true
				}else{
					this.name = false
				}
			}
			//密码验证
			var pastest = /^.{3,20}$/
			if( !pastest.test(this.user.pas) || this.user.pas.indexOf(" ") > 0 ){
				return this.pas = true
			}else{
				this.pas = false
			}
		},
		methods: {
			//提交登录
			dengluz:function(){
				var that = this
				var user = this.user
				$('.dengluform form').submit(function(ev){
					ev.preventDefault();
					axios({
						url:'/los/denglu',
						method:'POST',
						data:$.param(user),   //将数据转换成字符串序列化对
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
						console.log('成功')
						if( data.data.message ){
							console.log('登录成功')
							alert('登录成功!')
							//登录成功的时候添加此类名,用来判断用户是否登录
							$('.admin').addClass('true')
							$('.dengyin').css('display','none')
							location.reload() 
						}else{
							console.log('登录失败')
							alert(data.data)
						}
						console.log('成功')
				}).catch((err) => {
						console.log(err)
						alert('请求登录出现错误!请联系管理员')
					})
					
				})
			},
			//取消模态框
			none:function(){
				$('.none').click(function(){
					$('.dengyin').css('display','none')
				})
			}
			
		},
		computed:{
		}
	}
	
	
</script>

<style scoped="">
	.dengyin{
		position: fixed;
		top: 0;
		width: 100%;
		display: none;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	div.dengluform{
		text-align: center;
		/*border: solid 1px red;*/
		border-radius: 5px;
		width: 80%;
		padding: 0px 10px;
		margin: 150px auto;
		background: #fff;
		padding-bottom: 15px;
	}
	div.dengluform h2{
		border-bottom: 1px #959595 solid;
		padding: 5px 10px;
		width:60%;
		color:#9F79EE;
		margin: auto;
	}
	h4{
		font-size:15px ;
		color:rgba(0,0,0,0.9);
		margin:2.5px 0;
		margin-bottom: 1px;
		font-weight:100 ;
		
	}
	input{
		width: 85%;
		height: 30px;
		padding: 4px 10px;
		border-radius: 5px;
		border: solid 1px #ccc;
	}
	div.t{
		font-size:0 ;
		text-align: center;
	}
	p{
		display: inline-block;
		cursor: pointer;
		width: 80px;
		line-height: 30px;
		background: #3388FF;
		border: #fff;
		color: #fff;
		font-size:14px ;
		border-radius:3px ;
	}
	input.denglu{
		display: inline-block;
		cursor: pointer;
		width: 80px;
		line-height: 10px;
		background: #3388FF;
		border: #fff;
		color: #fff;
		border-radius:3px ;
	}
	.dengluform span{
		font-size: 12px;
		color: orange;
	}
</style>