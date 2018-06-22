<template>
	<div>
		<div class="yin">
			<div class="zhuceform">
				<form action="" method="post">
					<h2> <i class="fa fa-users">  </i> </h2>
					<h4> 账号 </h4>
					<input type="text" name="username" id="username" required="" v-model="user.name" placeholder="请输入用户名中文即可！" /><br />
					<span v-if="name"> 不能有非法字符！ </span>
					<h4> 密码 </h4>
					<input type="password" name="password" id="password" required="" v-model="user.pas" placeholder="请输入密码(任意字符不包括空格)" /><br />
					<span v-if="pas"> 密码长度3-20位,不包括空格 </span>
					<h4> 请再次输入密码 </h4>
					<input type="password" name="password2" id="password" required="" v-model="user.pas2" placeholder="请再次输入密码" /><br />
					<span v-if="pas2"> 密码必须一致 </span>
					<h4> 邮箱 </h4>
					<input type="emil" name="emil" id="password" v-model="user.emil" required="" style="margin-bottom: 5px;" placeholder="请输入邮箱" /><br />
					<span v-if="emil"> 正确的邮箱格式 </span>
					<div class="t">
						<p class="none" style="margin-right: 20px;"> 取消 </p>
						<input class="tijiao" type="submit" value="注册" v-bind:disabled="post"></input>
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
					pas2:'',
					emil:'',
				},
				name:false,
				pas:false,
				pas2:false,
				emil:false,
				post:true,
			}
		},
		mounted:function(){
			var height = window.screen.height
			$('.yin').css('height',height)
			//提交注册
			this.zhucet()
			//隐藏模态框
			this.none()
		},
		updated:function(){
			var that = this
			//用户名验证
			if($('.tijiao').attr('disabled')){
				$('.tijiao').css('background','#ccc')
			}else{
				$('.tijiao').css('background','#3388ff')
			}
//			var usertest = /^[A-Za-z0-9]{5,15}$/
			if(  this.user.name.indexOf(" ") > 0 ||  this.user.name.indexOf("@") > 0){
				return this.name = true
			}else{
				this.name = false
			}
			//密码验证
			var pastest = /^.{3,20}$/
			if( !pastest.test(this.user.pas) || this.user.pas.indexOf(" ") > 0 ){
				return this.pas = true
			}else{
				this.pas = false
			}
			//再次密码验证
			if( !pastest.test(this.user.pas2) || this.user.pas2.indexOf(" ") > 0 || this.user.pas2 !== this.user.pas ){
				return this.pas2 = true
			}else{
				this.pas2 = false
			}
			//邮箱格式验证
			var emiltest = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if( !emiltest.test(this.user.emil) ){
				return this.emil = true
			}else{
					this.emil = false
			}
		
			//表单提交
			if( this.name || this.pas || this.pas2 || this.emil ){
				this.post = true
			}else{
				this.post = false
			}
			
		},
		methods: {
			//提交注册
			zhucet:function(){
				var that = this
				var user = this.user
				$('.zhuceform form').submit(function(ev){
					ev.preventDefault();
					axios({
						url:'/los/zhuce',
						method:'POST',
						data:$.param(user),   //将数据转换成字符串序列化对
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then((data) => {
						if( data.data.message ){
							console.log('注册成功')
							alert('恭喜注册成功,请登录吧!')
							return $('.yin').css('display','none')
						}else{
							console.log('注册失败')
							alert(data.data)
						}
						console.log('成功')
					}).catch((err) => {
							console.log('注册失败')
						console.log(err)
						alert('请求注册出现错误!请联系管理员')
					})
					
				})
			},
			//取消模态框
			none:function(){
				$('.none').click(function(){
					$('.yin').css('display','none')
				})
			}
			
		},
		computed:{
		}
	}
	
	
</script>

<style scoped="">
	.yin{
		position: fixed;
		top: 0;
		width: 100%;
		display: none;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	div.zhuceform{
		text-align: center;
		/*border: solid 1px red;*/
		border-radius: 5px;
		width: 80%;
		padding: 0px 10px;
		margin: 150px auto;
		background: #fff;
		padding-bottom: 15px;
	}
	div.zhuceform h2{
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
		font-size: 12px;
		width: 85%;
		height: 30px;
		padding: 4px 10px;
		border-radius: 5px;
		border: solid 1px #ccc;
	}
	div.t{
		font-size:0 ;
		margin-top: 5px;
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
	input.tijiao{
		display: inline-block;
		cursor: pointer;
		width: 80px;
		line-height: 10px;
		background: #3388FF;
		border: #fff;
		color: #fff;
		border-radius:3px ;
	}
	.zhuceform span{
		font-size: 12px;
		color: orange;
	}
</style>