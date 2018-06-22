<template>
	<div id="fabu">
		<section class="fabu-top"> 
			<i @click="fanhuiArticle" class="fa fa-angle-left">  </i>
			<h2> 文章发布 </h2>
		</section>
		<div class="fabu-main">
			<section>
				<form action="" name="article" method="post">
					<input type="hidden" name="imgs" id="" v-model="img" />
					<input class="name" type="text" name="title" required="" id="title" v-model="data.title" placeholder="标题(必填)" /><br />
					<select name="type" v-model="data.type">
						<option v-for="(val,index) in type">{{val}}</option>
					</select> <span style="color: #555;font-size: 12px;display: inline-block;text-align: right; width: 300px;"> 默认杂烩(点击左侧选择) </span> <br />
					<textarea style="resize:none;" name="content" required="" v-model="data.content" rows="" placeholder="内容(必填)" cols=""></textarea><br /><br />
					<section>
						<input @change="filename" class="file" type="file" name="photo" id="photo" value="" />
						<a href="">上传文件</a>
					</section>
					<input type="submit" class="fabiao" value="发表"/>
				</form>
			</section>
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
					type:'杂烩论坛'
				},
				is:false,
				img:'545',
			}
		},
		props:['type'],
		updated:function(){
		},
		methods:{
			fanhuiArticle:function(){
				$('#fabu').removeClass('donghuaru')
				$('#fabu').addClass('donghuachus')
				
				//个人文章
				$('.article-main').css('display','block')
				$('.article-main').removeClass('donghuachu')
				$('.article-main').addClass('donghuaru2')
				//文章分类是绝对定位所有需要再加一个动画
				$('.article-main-top').removeClass('donghuachu')
				$('.article-main-top').addClass('donghuaru2')	
				setTimeout(function(){
					$('#fabu').css('display','none')
				},500)
			},
			fabut:function(){
				var that = this;
				$('#fabu .fabu-main form').submit(function(ev){
					ev.preventDefault()     
					var datas = new FormData(this)
					if( that.data.content.trim().length == 0 || that.data.title.trim().length == 0){
						alert('标题/内容不能全部是空格')
					}else{
						
					}
					if( that.is ){
						console.log('上传图片了')
						datas.append('is',true)
					}else{
						datas.append('is',false)
					}
					axios({
						url:'/los/add/article',
						method:'POST',
						data:datas,   //将数据转换成字符串序列化对
						contentType:false,
						processData:false,
						headers:{
							'Content-Type':'multipart/form-data'
						}
					}).then((data) => {
						console.log('成功')
						if( data.data.message ){
							alert(data.data.message)
							window.location.reload();
						}else{
							alert(data.data)
						}
					}).catch((err) => {
						console.log(err)
						console.log('失败')
					})
				})
			},
			//获取上传图片名字
			filename:function(event){
				this.is = true;
				this.img = new Date().getTime()
				var form = $('#fabu .fabu-main form');
				var last = form.find('.file').val().lastIndexOf("\\")
				var filename = form.find('.file').val().substring(last - 0 + 1,form.find('.file').val().length - 4)
				$('#fabu .fabu-main form section a').html(filename)
			}
		},
		mounted:function(){
			var height = window.screen.height
			$('#article').css('height',height)
			$('#fabu').css('height',height)
			this.fabut()
		}
	}
</script>

<style scoped="">
	#fabu{
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		/*height: 600px;*/
		/*border: solid 1px red;*/
		/*background: #000;*/
		display: none;
	}
	#fabu .fabu-top{
		text-align: center;
		width: 100%;
		height: 40px;
		background: #EEC900;
	}
	#fabu .fabu-top i{
		border: solid 1px #f5f5f5;
		cursor: pointer;
		font-size: 35px;
		text-align: center;
		position: absolute;
		top: 5px;
		left: 10px;
		line-height: 30px;
		width: 30px;
	}
	#fabu .fabu-top h2{
		display: inline-block;
		font-size: 19px;
		line-height: 40px;
	}
	.fabu-main{
		padding: 5px;
		width: 100%;
		/*height: 600px;*/
		/*border: solid 1px red;*/
	}
	.fabu-main form{
		overflow: hidden;
	}
	.fabu-main form textarea{
		margin-top: 3px;
		width: 99%;
		height: 400px;
	}
	.fabu-main form input.name{
		margin-bottom: 3px;
		width: 200px;
		height: 30px;
		border: solid 1px transparent;
		background: transparent;
		padding:3px 7px;
		padding-left: 3px;
	}
	.fabu-main form select{
		height: 25px;
		border: solid 1px transparent;
		-moz-appearance:none;  
        -webkit-appearance:none; 
		background: transparent;
	}
	.fabu-main form option{
		border: solid 1px transparent;
	}
	.fabu-main form textarea{
		/*padding-top: 5px;*/
		border: solid 1px transparent;
		border-top: solid 1px #F0F0F0;
		border-bottom: solid 1px #F0F0F0;
		background:transparent ;
		font-size: 13px;
		padding: 10px;
	}
	.fabu-main form .fabiao{
		float: right;
		border: solid 1px #3388FF;
		background: #3388FF;
		border-radius: 3px;
		width: 100px;
		height: 30px;
		color:#fff
	}
	.fabu-main form input.file{
		opacity: 0;
		position: relative;
		width: 100px;
		z-index: 2;
	}
	.fabu-main form section{
		border: solid 1px #2FBFBF;
		border-radius:3px ;
		width: 100px;
		display: inline-block;
		background: #BFEFFF;
		position: relative;
	}
	.fabu-main form section a{
		text-align: center;
		font-size:14px ; 
		color:  #2FBFBF;
		position: absolute;
		top: 3px;
		left: 18px;
		z-index: 1;
	}
</style>