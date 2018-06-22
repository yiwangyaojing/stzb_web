<template>
	<div id="comment" @click.self="nonereply">
		<div id="comment-form">
			<h4> 二级回复 </h4><br />
			<form action="" method="post">
				<textarea style="resize:none;" class="comment-content" name="content" required="" rows="" :value="time[1]" placeholder="内容(必填)" cols=""></textarea><br /><br />
					<section>
						<input class="file" type="file" name="photo" id="photo" value="" />
						<a href="">上传文件</a>
					</section>
					<input type="submit" class="fabiao" value="发表"/>
			</form>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios'
	import $ from 'jquery'
	export default {
		data:function(){
			return {
				data:{
					content:''
				}
			}
		},
		props:['time'],
		mounted:function(){
			//发表回复
			this.fabiao()
			//
		},
		updated:function(){
					console.log(this.time)
		},
		methods:{
			//隐藏二级回复
			nonereply:function(){
				$('#comment').css('display','none')
			},
			//发表回复
			fabiao:function(){
				var that = this
				$('#comment-form form').submit(function(ev){
					ev.preventDefault()
					that.data.content = $('.comment-content').val()
					console.log(that.time)
					if( that.data.content.trim().length == 0 ){
						alert('回复不能为空')
					}else{
						//大文章的时间
						that.data['id'] = that.$route.params.id
						//一级回复的时间
						that.data['time'] = that.time[0]
						//二级回复的id
						that.data['comment'] = that.time[2]
						axios({
							url:'/los/article/reply/comment',
							method:'POST',
							data:$.param(that.data),   //将数据转换成字符串序列化对
							headers:{
								'Content-Type':'application/x-www-form-urlencoded'
							}
						}).then((data) => {
							alert(data.data)
							console.log(data.data)
							window.location.reload();
						}).catch((err) => {
//							console.log(err)
						})
					}
				})
			}
		}
	}
</script>

<style scoped="">
	#comment{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 6;
		display: none;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	#comment-form{
		width: 90%;
		background: #fff;
		height: 250px;
		/*border: solid 1px red;*/
		margin: 170px auto;
		padding: 5px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #222;
	}
	form input.file{
		opacity: 0;
		position: relative;
		width: 100px;
		z-index: 2;
	}
	form textarea{
		font-size:13px ;
		padding: 5px;
		border: solid 1px transparent;
		width: 95%;
		margin-left: 8px;
		height: 100px;
	}
	form section{
		border: solid 1px #2FBFBF;
		border-radius:3px ;
		width: 100px;
		margin-left: 5%;
		display: inline-block;
		background: #BFEFFF;
		position: relative;
	}
	h4{
		text-align: center;
	}
	form section a{
		text-align: center;
		font-size:14px ; 
		color:  #2FBFBF;
		position: absolute;
		top: 3px;
		left: 18px;
		z-index: 1;
	}
	input.fabiao{
		margin-right: 10%;
		float: right;
		border: solid 1px #3388FF;
		background: #3388FF;
		border-radius: 3px;
		width: 100px;
		height: 30px;
		color:#fff
	}
</style>