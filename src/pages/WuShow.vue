<template>
	<div id="Wushow" @mouseleave="small">
		<div class="main">
			<!--<div class="img-show">-->
				
			<!--<img v-for="(val,ins) in id" v-if="" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>-->

			<div class="ball">
				<div class="ball_box">
					<div class="x1">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[0]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://192.168.13.212:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[0]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div>
					</div>
					<div class="x2">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[1]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[1]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x3">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[2]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[2]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x4">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[3]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[3]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x5">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[4]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[4]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x6">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[5]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[5]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x7">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[6]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[6]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x8">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[7]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[7]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x9">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[8]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[8]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x10">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[9]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[9]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x11">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[10]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[10]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x12">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[11]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[11]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x13">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[12]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[12]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x14">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[13]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[13]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x15">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[14]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[14]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x16">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[15]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[15]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x17">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[16]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[16]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x18">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[17]" >
								<img  @mousemove="mo(val,$event)" @click="cl(val)" :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[17]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x19">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[18]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[18]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>
					<div class="x20">
						<div class="left" style="text-align: left;">
							<section v-for="(val,ins) in left[19]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
							
						</div>
						<div class="right" style="text-align: right;">
							<section v-for="(val,ins) in right[19]" >
								<img @mousemove="mo(val,$event)" @click="cl(val)"  :src="'http://localhost:2200/stzb/card_' + val + '.jpg'"/>
								<br />
							</section>
						</div></div>

					<div class="y1"></div>
					<div class="y2"></div>
					<div class="y3"></div>
					<div class="y4"></div>
					<!--<div class="y5"></div>-->
					<div class="y6"></div>
					<div class="y7"></div>
					<div class="y8"></div>
					<div class="y9"></div>
				</div>
			</div>

			<div class="someshow">
					<h2 @click="none" class="fa fa-close">  </h2>
				<div>
					<section>
						
					<img class="max-show" src=""/>
					</section>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	export default {
		data: function() {
			return {
				//当前的图片id和连接等等资源的数据变量
				ids: [],
				//本地服务器图片的序列号
				id: [],
				//所有的左侧id,数组套20个数组
				left:[],
				//所有的右侧id,数组套20个数组
				right:[]
			}
		},
		mounted: function() {
			
			var height = window.screen.height
			$('#Wushow').css('height',height)
			
			$('.someshow').css('height',height)
			axios.get('/stzb/json/g10_role_list.json').then((data) => {
				var lefts = [];
				var rights = [];
				data.data.forEach((datas, ins) => {
					
					if( ins < 195){
						lefts.push(datas.id)
						if( lefts.length > 9 ){
							this.left.push(lefts)
							lefts = [];
						}
					
					}else{
						
						rights.push(datas.id)
						if( rights.length > 9 ){
							this.right.push(rights)
							rights = [];
						}
						
					}
					
				})
			}).catch((err) => {
				console.log(err)
			})
			
		},
		updated:function(){
			$('.left').css('paddingTop','40px')
			$('.right').css('paddingTop','40px')
			$('.left img').eq(0).css('marginLeft','30px')
			
			console.log($('.ball_box > div').length)
			$('.ball_box > div').each(function(){
				$(this).find('.left img').eq(0).css('marginLeft','20px')
				$(this).find('.left img').eq(9).css('marginLeft','25px')
			})
		},
		methods:{
			mo:function(val,ev){
				var img = $(ev.target)
				$('img').removeClass('active')
				img.addClass('active')
			},
			small:function(ev){
				$('img').removeClass('active')
			},
			//点击图片的时候
			cl:function(ev){
				var src = 'http://localhost:2200/stzb/card_' + ev + '.jpg'
				$('.ball').addClass('active')
				$('.someshow').addClass('actives')
				$('.someshow div').addClass('active')
				$('.someshow').find('.max-show').attr('src',src)
				$('.someshow').find('.max-show').addClass('active')
				//底部栏隐藏
				$('.footer').animate({
					bottom:-50,
				})
			},
			//点击x号
			none:function(){
				$('.ball').removeClass('active')
				$('.someshow').removeClass('actives')
				//底部栏出现
				$('.footer').animate({
					bottom:0,
				})
			}
		}
	
	}
</script>

<style scoped="">
	#Wushow{
		background: #222222;
		width: 120%;
	}
	.img-show {
		height: 410px;
	}
	
	img {
		cursor: pointer;
		display: inline-block;
		height: 20px;
		width: 20px;
		/*margin-top: 8px;*/
		box-shadow: 0px 0px 15px #222;
		border-radius: 100%;
        /*transform: rotate(180deg);*/
        /*transform: rotateY(-90deg);*/
	}
	img.active{
		width: 200px;
		height: 300px;
	}
	html,
	body {
		height: 100%;
	}
	
	body {
		padding: 0;
		margin: 0;
		background: #333;
		position: relative;
	}
	.ball.active{
		display: none;
	}
	.ball {
		border-radius: 50%;
		box-shadow: 0px 0px 70px red;
		display: block;
		height: 350px;
		width: 350px;
		position: absolute;
		top: 50%;
		left: 65%;
		margin: -250px 0 0 -250px;
		transition: all .6s;
	}
	
	.ball:hover {
		transform: scale(1.2);
	}
	.ball:hover img{
		transform: scale(1.2);
	}
	.ball_box {
		width: 100%;
		height: 100%;
		animation-name: rotate3d;
        animation-duration: 20s;
        animation-iteration-count: infinite;
        animation-timing-function:linear; 
	}
	
	.ball div {
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border: solid 1px #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -50% 0 0 -50%;
		transform-style: preserve-3d;
	}
	
	.ball .x1 {
		transform: rotateY(0)
	}
	
	.ball .x2 {
			transform: rotateY(10deg)
		}
		
		.ball .x3 {
			transform: rotateY(20deg)
		}
		
		.ball .x4 {
			transform: rotateY(30deg)
		}
		
		.ball .x5 {
			transform: rotateY(40deg)
		}
		
		.ball .x6 {
			transform: rotateY(50deg)
		}
		
		.ball .x7 {
			transform: rotateY(60deg)
		}
		
		.ball .x8 {
			transform: rotateY(70deg)
		}
		
		.ball .x10 {
			transform: rotateY(80deg)
		}
		
		.ball .x11 {
			transform: rotateY(90deg)
		}
		
		.ball .x12 {
			transform: rotateY(100deg)
		}
		
		.ball .x13 {
			transform: rotateY(110deg)
		}
		
		.ball .x14 {
			transform: rotateY(120deg)
		}
		
		.ball .x15 {
			transform: rotateY(130deg)
		}
		
		.ball .x16 {
			transform: rotateY(140deg)
		}
		
		.ball .x17 {
			transform: rotateY(150deg)
		}
		
		.ball .x18 {
			transform: rotateY(160deg)
		}
		
		.ball .x19 {
			transform: rotateY(170deg)
		}
		
		.ball .x20 {
			transform: rotateY(180deg)
		}
	
	
	
	
	
	.ball .y1 {
		transform: rotateX(90deg) translateZ(140px) scale(0.60);
	}
	
	.ball .y2 {
		transform: rotateX(90deg) translateZ(100px) scale(0.80);
	}
	
	.ball .y3 {
		transform: rotateX(90deg) translateZ(60px) scale(0.92);
	}
	
	.ball .y4 {
		transform: rotateX(90deg) translateZ(10px) scale(0.98);
	}
	
	.ball .y5 {
		transform: rotateX(90deg) translateZ(0);
	}
	
	.ball .y6 {
		transform: rotateX(90deg) translateZ(-10px) scale(0.98);
	}
	
	.ball .y7 {
		transform: rotateX(90deg) translateZ(-60px) scale(0.92);
	}
	
	.ball .y8 {
		transform: rotateX(90deg) translateZ(-100px) scale(0.80);
	}
	
	.ball .y9 {
		transform: rotateX(90deg) translateZ(-140px) scale(0.60);
	}
	
	@keyframes rotate3d {
		0% {
			transform: rotate(-20deg) rotateX(-20deg) rotateY(0)
		}
		100% {
			transform: rotate(-20deg) rotateX(-20deg) rotateY(360deg)
		}
	}
	
	
	.someshow{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		display: none;
	}
	.someshow.actives{
		display: block;
	}
	.someshow section{
		text-align: center;
		width: 100%;
		height: 100%;
		margin-top: 40px;
	}
	.max-show{
		width: 84%;
		height: 75%;
		border-radius:5px ;
		box-shadow: 0px 0px 50px purple;
	}
	.max-show.active{
		width: 84%;
		height: 78%;
		animation-name: imgmax;
        animation-duration: 5s;
         animation-timing-function:inherit
	}
	.someshow h2{
		cursor: pointer;
		color:#FFFFFF;
		font-size: 25px;
		text-align: left;
		margin: 5px 0px 0 10px;
	}
	@keyframes imgmax {
		0% {
			transform:scale(0.80)
		}
		100% {
			transform:scale(1.0)
		}
	}
</style>