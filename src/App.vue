<template>
  <div id="app">
 		<hea-ders></hea-ders>
 	 	<router-view :data="user"></router-view>
 	 	<foo-ters></foo-ters>
  </div>
</template>

<script>
	import HeaDers from './components/HeaDer'
	import axios from 'axios'
	import FooTers from './components/FooTer'
	import $ from 'jquery'
	import moment from 'moment'
	export default {
		data:function(){
			return {
				user:''
			}
		},
		components:{
			HeaDers,
			FooTers,
		},
		mounted:function(){
			moment.locale('zh-cn');
			//屏幕高度
			var height = window.screen.height
			$('#app').css('height',height)
			axios.post('/los/stzb/jiance').then((data) => {
				if(data.data.message){
					console.log('用户已经登录')
					this.user = data.data.message.user
					this.$store.state.user = data.data.message.user
					var message = data.data.message.xx;
					var admininfo = data.data.message.admin
					message.forEach(function(dd){
						if( dd ){
								if( !dd.has_look ){
									$('.footer .main .user .xiaoyuandian').css('display','block')
								}
						}
					})
					admininfo.forEach(function(dd){
						if( dd ){
								if( !dd.has_look ){
									$('.footer .main .user .xiaoyuandian').css('display','block')
								}
						}
					})

					//如果是登录成功状态,添加此类名
					$('.admin').addClass('true')
					$('.footer .main .admin').css('display','none')
					$('.footer .main .user').css('display','block')
				}
				if( data.data.error ){
					console.log('用户未登录')
					$('.footer .main .admin').css('display','block')
					$('.footer .main .user').css('display','none')
				}
			}).catch((err) => {
				console.log('检测失败')
			})
		}
	}

</script>

<style>
/*@import '~vux/src/styles/reset.less';*/
*{
	box-sizing: border-box;
}
ul{
	list-style: none;
}
body {
	width: 100%;
	height: 100%;
  background-color: #fbf9fe;
}
#app{
	position: relative;
	width: 99%;
	height: 100%;
}
	/*小组件入场动画*/
	div.donghuaru{
		opacity: 1;
		transition: 0.5s;
		animation-name: jin;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
	}
	
	@keyframes jin{
		from{
			left: 100%;
		}
		to{
			left:0;
		}
	}
	/*个人页面出去动画*/
	div.donghuachu{
		opacity: 0;
		transition: 0.5s;
		color: red;
		animation-name: chu;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
	}
	@keyframes chu{
		from{
			left: 0;
		}
		to{
			left:-100%;
		}
	}
	
		
	/*小组件出场动画*/
	div.donghuachus{
		opacity: 0;
		transition: 0.5s;
		animation-name: chus;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
        display: none;
	}
	
	@keyframes chus{
		from{
			right: 0;
		}
		to{
			right: -100%;
			display: none;
		}
	}
	
	/*个人页面进来动画*/
	div.donghuaru2{
		opacity: 1;
		transition: 0.5s;
		animation-name: jin2;
        animation-duration: 0.5s;
        animation-timing-function:linear; 
	}
	@keyframes jin2{
		from{
			right: 100%;
		}
		to{
			right:0;
		}
	}
</style>
