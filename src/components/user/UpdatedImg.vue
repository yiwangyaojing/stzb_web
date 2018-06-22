<template>
	<div id="updatedimg" @click.self="nonereply">
		<div id="updatedimg-form">
			<h4> 更改头像 </h4>
			<img v-if="img" style="width: 50px;height: 50px;" :src="img"/>
			<form style="margin-top: 15px;" action="" method="post">
					<section>
						<input  @change="showimg" class="file" type="file" name="photo" id="photo" value="" />
						<a style="text-align: center;" href="">上传文件</a>
					</section><br />
					<input style="margin-top: 10px;" type="submit" class="fabiao" value="上传"/>
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
				img:'',
				is:false,
			}
		},
		mounted:function(){
			//上传头像
			this.up();
		},
		updated:function(){
		},
		methods:{
			//隐藏二级回复
			nonereply:function(){
				$('#updatedimg').css('display','none')
			},
			//获取上传图片的信息
			showimg:function(ev){
				var form = $('form');
				var last = form.find('.file').val().lastIndexOf("\\")
				var filename = form.find('.file').val().substring(last - 0 + 1,form.find('.file').val().length - 4)
				$('form section a').html(filename)
				this.is = true;
			},
			//上传头像
			up:function(){
				var that = this
				$('form').submit(function(ev){
					ev.preventDefault()
					var datas = new FormData(this)
					datas.append('is',that.is)
					axios({
							url:'/los/user/updatedimg',
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
				})
			}
		}
	}
</script>

<style scoped="">
	#updatedimg{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 6;
		display: none;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	#updatedimg-form{
		overflow: hidden;
		text-align: center;
		width: 50%;
		background: #fff;
		height: 120px;
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
	form{
		overflow: hidden;
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
		border: solid 1px #3388FF;
		background: #3388FF;
		border-radius: 3px;
		width: 100px;
		height: 30px;
		color:#fff
	}
</style>