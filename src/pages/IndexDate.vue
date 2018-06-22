<template>
	<div id="date">
		<h2 class="fa fa-th" @click="maxmin">  </h2>
		<div class="date-show">
			<min-date v-for="(val,ins) in datas" :data="val" :s="is" key="ins">  </min-date>
		</div>
		<h2 class="fa fa-angle-double-down" @click="more">  </h2>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import MinDate from '../components/MinDate'
	export default {
		data:function(){
			return {
				datas:[],
				id:'88888',
				t:0,
				//图片放大缩小
				is:false,
			}
		},
		components:{
			MinDate
		},
		mounted:function(){
			this.getten();
			this.add();
		},
		methods:{
			//获取前十个武将的信息
			getten:function(){
				var that = this
				var data = {
				//获取的武将个数
					num:10,
				//最初的跳过页面个数
					t:that.t,
				}
				axios({
					url:'/los/stzbshow',
					method:'POST',
					data:$.param(data),   //将数据转换成字符串序列化对
					headers:{
					'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then((data) => {
					
					if( data.data.message.length > 1 ){
						data.data.message.forEach((d) => {
							that.datas.push(d)
						})
					}
					if( !data.data.message ){
						alert('获取失败,请返回重试')
					}
				}).catch((err) => {
					console.log(err)
				})
			},
		
			//下拉滑动再次获取数据
			add:function(){
				var that = this;
				$(window).scroll(function(){
					var top = $(this).scrollTop();
					var height = $(document).height();
					var heights = $(this).height();
					if( top + heights == height ){
						that.t++ 
						that.getten();
					}
				})
			},
			//图片大小变换
			maxmin:function(){
				
				this.is = !this.is
//				if( this.is ){
//					$('.one').addClass('min')
//				}else{
//					$('.one').removeClass('min')
//				}
			},
			
			//点击加载更多
			more:function(){
				this.t++ 
				this.getten();
			}
			
		}
		
	}
	
</script>

<style scoped="">
	#date{
		padding-bottom: 50px;
	}
	#date h2.fa-th{
		position: fixed;
		top: 10px;
		left: 10px;
		cursor: pointer;
		transition: 0.8;
		color: #3388FF;
		z-index: 2;
	}
	#date .fa-th:hover{
		color: orange;
	}
	.fa-angle-double-down{
		color: rgba(0,0,0,0.5);
		position: fixed;
		bottom: 60px;
		cursor: pointer;
		font-size: 30px;
		left: 5px;
	}
</style>