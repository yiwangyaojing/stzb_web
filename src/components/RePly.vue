<template>
	<div id="reply" @click.self="nonereply">
		<div id="reply-form">
			<h4> 回复 </h4><br />
			<form action="" method="post">
				<input type="hidden" name="imgs" id="imgs" v-model="imgs" />
				<textarea style="resize:none;" name="content" required="" rows="" v-model="data.content" placeholder="内容(必填)" cols=""></textarea><br /><br />
					<section>
						<input @change="filename" class="file" type="file" name="photo" id="photo" value="" />
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
					
				},
				imgs:'1',
				is:false
			}
		},
		mounted:function(){
			//发表回复
			this.fabiao()
		},
		methods:{
			//隐藏一级回复
			nonereply:function(){
				$('#reply').css('display','none')
			},
			//发表回复
			fabiao:function(){
				var that = this
				$('#reply-form form').submit(function(ev){
					ev.preventDefault()
					var datas = new FormData(this)
					if( that.data.content.trim().length == 0 ){
						alert('回复不能为空')
					}else{
//						that.data['id'] = that.$route.params.id
						datas.append('id',that.$route.params.id)
						datas.append('is',that.is)
						axios({
							url:'/los/article/reply',
							method:'POST',
							data:datas,   //将数据转换成字符串序列化对
							contentType:false,
							processData:false,
							headers:{
								'Content-Type':'multipart/form-data'
							}
						}).then((data) => {
							alert(data.data)
							window.location.reload();
						}).catch((err) => {
							console.log(err)
						})
					}
				})
			},
				//获取上传图片名字
			filename:function(event){
				this.is = true;
				this.imgs = new Date().getTime()
				console.log('55')
				var form = $('form');
				var last = form.find('.file').val().lastIndexOf("\\")
				var filename = form.find('.file').val().substring(last - 0 + 1,form.find('.file').val().length - 4)
				$('form section a').html(filename)
			}
		}
	}
</script>

<style scoped="">
	#reply{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 6;
		display: none;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	#reply-form{
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