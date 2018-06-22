<template>
	<div class="tuihui">
		<section> 
			<i @click="fanhui" class="fa fa-undo">  </i>
			<h2> {{title}} </h2>
		</section>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		data:function(){
			return {
				
			}
		},
		props:['title'],
		methods:{
			fanhui:function(){
				console.log('点击返回了')
//				$('.user-list').addClass('donghuaru')
				//个人页面组件出去并且消失
//				$('.user-main').addClass('donghuachu')

				//个人详细信息出去
				$('.user-list').removeClass('donghuaru')
				$('.user-list').addClass('donghuachus')
				
				//个人动画进来页面
				
				$('.user-main').css('display','block')
				$('.user-main').removeClass('donghuachu')
				$('.user-main').addClass('donghuaru2')
				setTimeout(function(){
					$('.user-list').css('display','none')
				},500)
			}
		}
	}
	
</script>

<style scoped="">
	.tuihui{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}
	section i{
		position: absolute;
		border:solid 2px rgba(255,255,255,0.3) ;
		padding: 4px 5px;
		font-size: 20px;
		border-radius: 2px;
		cursor: pointer;
		top: 5px;
	}
	h2{
		text-align: center;
		font-size: 18px;
		font-weight: 100;
		color: #f5f5f5;
	}
	section{
		padding: 3px 15px;
		background: #222;
		position: relative;
		color:#FBF9FE;
		height: 40px;
	} 

	
</style>