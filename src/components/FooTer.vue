<template>
	<div class="footer">
		<div class="main">
			<section class="one">
				<a class="one-a" href="#/">
					<i class="fa fa-circle-thin">  </i>
					<span> 首页 </span>
				</a>
			</section>
			<span class="p">  </span>
			<section class="two">
				<div class="user" style="display: none;">
					<a class="user-a" href="#/user">
						<i class="fa fa-user-o" style="color: #3388ff;">  </i>
						<span> 个人中心 </span>
					</a>
					<i class="xiaoyuandian">  </i>
				</div>
				<div class="admin" style="display: none;">
					<a @click="denglu" style="margin-right: 40px; cursor: pointer;">
						<i class="fa fa-refresh">  </i>
						<span> 登录 </span>
					</a>
					<a @click="zhuce" style="cursor: pointer;"> 
						<i class="fa fa-pencil" style="color: #ccc;">  </i>
						<span> 注册 </span>
					</a>
				</div>
			</section>
		</div>
		<zhu-ce :show="z"></zhu-ce>
		<deng-lu></deng-lu>
	</div>
</template>

<script>
	import $ from 'jquery'
	import ZhuCe from './ZhuCe'
	import DengLu from './DengLu'
	import {mapState} from 'vuex'
	export default {
		data:function(){
			return {
				z:false,
			}
		},
		components:{
			ZhuCe,
			DengLu,
		},
		methods:{
			zhuce:function(ev){
				//注册模态框出现
				$('.yin').css('display','block')
			},
			//登录模态框
			denglu:function(ev){
				$('.dengyin').css('display','block')
			}
		}
	}
</script>

<style scoped="">
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		background: rgb(255, 250, 250);
		border-top-left-radius: 1px;
		border-top-right-radius: 1px;
		border-top: solid 1px #ccc;
	}
	.footer .main{
		position: relative;
		overflow: hidden;
	}
	.footer .main section{
		padding-top:2px ;
		width: 49.5%;
		text-align: center;
	}
	.footer .main section span{
		color: #222;
		font-size: 11px;
	}
	.footer .main section a i{
		display: block;
		color: orange;
		font-size: 22px;
	}
	.footer .main section .user-a,
	.one-a{
		text-align: center;
		display: block;
		width:50% ;
		margin: 0 auto;
	}
	.footer .main .one{
		float: left;
	}
	.footer .main .two{
		float: right;
	}
	.footer .main .p{
		width: 1px;
		background: #959595;
		top: 2px;
		left: 50%;
		position: absolute;
		height: 90%;
	}
	.admin a{
		display: inline-block;
	}
	.footer .main .admin i{
		color: #3388FF;
	}
	.xiaoyuandian{
		display: none;
		position: absolute;
		width: 10px;
		height: 10px;
		border: solid 1px rgba(255,62,150,0.1);
		top: 5px;
		right: 72px;
		background: rgba(255,62,150,0.5);
		border-radius: 50%;
		box-shadow: 2px 2px 3px rgba(255,62,150,0.4);
	}
</style>