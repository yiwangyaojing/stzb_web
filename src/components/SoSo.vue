<template>
	
		<transition name="slide">
			<div id="soso" @click.self="none">
				<div class="soso-main">
					这是搜索
				</div>
			</div>
		</transition>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	export default {
		data:function(){
			return {
				
			}
		},
		methods:{
			none:function(){
				$('#soso').css('display','none')
			}
		}
	}

</script>

<style scoped="">
	.slide-enter-active{
			animation: slidein 3s;
	}
	.slide-leave-active{
			animation: slidein 3s reverse;
	}
	@keyframes slidein{
			0%{
				opacity: 0.3;
				transform: translateX(200px);
			}
			50%{
				opacity: 0.7;
				transform: translate(100px,100px);
			}
			100%{
				opacity: 1;
				transform: translate(0);
				
			}
	}
	#soso{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		display: none;
		z-index: 6;
		background: rgba(0,0,0,0.5);
	}
	.soso-main{
		padding: 10px;
		box-shadow: 0px 0px 10px #333;
		border-radius: 10px;
		margin: 90px auto;
		width: 300px;
		height: 400px;
		background: #fff;
		color:#000;
	}
</style>