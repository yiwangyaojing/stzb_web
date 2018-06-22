<template>
	<div id="page">
		<div class="page-main">
			<!--上面的五个模块-->
			<section style="display: block; overflow: hidden;" class="main-top">
				<!--左面的四个-->
				<section class="main-left">
				<section class="main-left-top">
						<!--首页-->
						<a href="#/">
					<div class="one black">
						<p class="fa fa-home"> </p>
					</div></a>
					<!--发帖-->
					<a href="#/article">
					<div class="two black">
						<p class="fa fa-th">  </p>
					</div>
					</a>
				</section>
				<section class="main-left-footer">
						<!--武将和战法3d信息-->
						<a href="#/wushow">
					<div class="four black">
						<img src="../../static/jian.png"/>
						<p>  </p>
					</div>
					</a>
					<!--武将3d图(可对比)-->
					<a href="#/date">
					<div class="fore black">
						<img src="../../static/lan.png"/>
						<p>  </p>
					</div>
					</a>
				</section>
			</section>
				<!--右面的一个-->
				<section class="main-right">
					
					<!--地图可视化-->
					<a href="#/map">
						<div class="sth black">
							<p class="fa fa-map-marker">  </p>
						</div>
					</a>
				</section>
			</section>
			<!--下面的三个模块-->
			<section style="display: block;overflow: hidden;" class="main-footer">
				<!--左侧聊天和网站-->
				<section class="mian-footer-left">
					<!--聊天-->
					<a href="#/chat">
					<div class="six black">
						<p class="fa fa-users"></p>
					</div>
					</a>
					<!--网站-->
					<a href="">
					<div class="sive black">
						<p class="fa fa-windows"></p>
					</div>
					</a>
				</section>
				<!--右侧武将搭配-->
				<section class="mian-footer-right">
					<!--武将搭配-->
					<a href="#/peijiang">
					<div class="eat black">
						<p class="fa fa-flag">
							
						</p>
					</div>
					</a>
				</section>
			</section>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		data:function(){
			return {
				
			}
		},
		mounted:function(){
			//模块翻转
			this.fanzhuan()
		},
		methods:{
			//随机模块翻转
			fanzhuan:function(){
				var len = $('.black').length
				setInterval(function(){
					var num = Math.floor(Math.random() * 8)
					$('.black').each(function(index){
						$('.black').eq(index).removeClass('active')
					})
					$('.black').eq(num).addClass('active')
				},1500)
			},
			//分割线
			
		}
	}
</script>

<style>
	#page{
		color: #fff;
		background: #131426;
		width: 100%;
		height: 100%;
		border: solid 0.2px transparent;
	}
	.page-main{
		font-size: 0;
		margin: 80px auto;
		text-align: center;
		width: 360px;
		/*width: 90%;*/
		height: 450px;
		/*border: solid 1px red;*/
		padding: 10px 11px;
	}
	.page-main div{
		display: inline-block;
		position: relative;
		width: 110px;
		color: #fff;
		height: 110px;
		text-align: center;
	}
	.page-main div p{
		position: absolute;
		font-size: 40px;
		top: 30px;
		left: 35px;
	}
	/*左侧的四个*/
	.page-main .main-left{
		float: left;
		overflow: hidden;
	}
	/*右侧最大的地图*/
	.page-main .main-right{
		float: left;
	}
	/*首页*/
	.page-main .one{
		float: left;
		background: #2fbfbf ;
		border: solid 1px #2fbfbf ;
		text-align: center;
		
	}
	/*发帖*/
	.page-main .two{
		float: left;
		background: #3388ff;
		border:solid 1px #3388ff;
	}
	/*地图可视化*/
	.page-main .sth{
		float: left;
		background: #2fbfbf ;
		border: solid 1px #2fbfbf ;
		height: 300px;
	}
	.page-main .sth p{
		left: 35px;
		top: 120px;
		font-size: 60px;
	}
	/*武将和战法3d信息*/
	.page-main .four{
		height: 180px;
		/*display: block;*/
		/*float: left;*/
		background: #f2c230 ;
		border: solid 1px #f2c230 ;
	}
	.page-main .four img{
		margin-top: 50px;
		width: 50px;
		height: 100px;
	}
	/*武将对比数据*/
	.page-main .fore{
		top: -20px;
		height: 120px;
		background: #CDC673;
	}
	.page-main .fore img{
		width: 80px;
	}
	/*下面的三个模块*/
	.page-main .main-footer{
		overflow: hidden;
	}
	/*左侧的聊天网站*/
	.page-main .main-footer .mian-footer-left{
		float: left;
	}
	.page-main .main-footer .mian-footer-left .six{
		background: blue;
		height: 50px;
	}
	.page-main .main-footer .mian-footer-left .six p{
		font-size: 30px;
		top: 10px;
		left: 40px;
	}
	.page-main .main-footer .mian-footer-left div{
		display: block;
	}
	/*网站*/
	.page-main .main-footer .mian-footer-left .sive{
		/*background: ;*/
		height: 50px;
	}
	.page-main .main-footer .mian-footer-left .sive p{
		font-size: 35px;
		top: 10px;
	}
	/*右侧*/
	.page-main .main-footer .mian-footer-right {
		float: left;
	}
	/*武将搭配*/
	.page-main .main-footer .mian-footer-right .eat{
		background: #9F79EE;
		height: 100px;
		width: 220px;
	}
	.page-main .main-footer .mian-footer-right .eat p{
		left: 88px;
	}
	.black:hover{
		animation-name:fan ;
        animation-duration: 0.8s;
        animation-timing-function:linear; 
	}
	div.active{
		animation-name:fan ;
        animation-duration: 0.8s;
        animation-timing-function:linear; 
	}
	@keyframes fan{
		100%{
			transform: rotateY(360deg);
		}
	}
</style>