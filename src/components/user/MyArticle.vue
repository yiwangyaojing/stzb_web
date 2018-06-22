<template>
	<div id="myArticle">
		<tui-chu class="top" title="我的文章"></tui-chu>
		<div class="myarticle-main">
			<ul>
				<li v-for="(val,ins) in article"> 
					<a href="#" @click="lookarticle(val.times)">
						<div> 
							<div class="top">
								<img :src="'http://localhost:2200/img/' + content.user.img + '.jpg'"  alt="" />
								<p> 
									<span> {{content.user.name}} </span>
									<span> {{val.times | time}} </span>
								</p>
								<section>
									<span> 
										<i class="fa fa-thumbs-up" style="color: #3388FF;">  </i>{{val.like_num}}
									</span>
									<span>
										<i class="fa fa-commenting-o" style="color: #3388FF;"> </i> {{val.reply_num}}
									</span>
								</section>
							</div>
							<div class="footer">
								<h4> {{val.title}} </h4>	
								<p> {{val.content}} </p>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import TuiChu from './TuiChu'
	export default {
		data:function(){
			return {
				article:[],
			}
		},
		props:['content'],
		components:{
			TuiChu
		},
		mounted:function(){
			var that = this
			var id = {
				id:this.content.user._id
			}
			axios({
				url:'/los/user/allarticle',
				method:'POST',
				data:$.param(id),   //将数据转换成字符串序列化对
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then((data) => {
				if(data.data.message){
					that.article = data.data.message
				}else{
					alert(data.data)
				}
			}).catch((err) => {
				console.log(err)
			})
			
		},
		methods:{
			lookarticle:function(time){
				var time = new Date(time).getTime()
				console.log(time)
				this.$router.push('article/show/' + time)
			}
		}
	}
	
</script>

<style scoped="">
	#myArticle{
		margin-bottom: 50px;
	}
	ul{
		list-style: none;
	}
	.tuichu{
		position: fixed;
		top: 0;
	}
	.myarticle-main{
		margin-top:40px;
	}
	.myarticle-main ul li{
		padding: 10px;
	}
	.myarticle-main ul li .top{
		overflow: hidden;
	}
	.myarticle-main ul li .top img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		float: left;
	}
	.myarticle-main a{
		color: #000;
	}
	.myarticle-main ul li a > div{
		padding-bottom: 15px;
		border-bottom: solid 1px #DEDEDE;
	}
	.myarticle-main ul li .top p{
		float: left;
		margin-left: 10px;
	}
	.myarticle-main ul li .top p span{
		display: block;
		font-size: 12px;
	}
	.myarticle-main ul li .top section{
		float: right;
	}
	.myarticle-main ul li .top section span{
		display: inline-block;
		margin-right: 10px;
		font-size: 12px;
		font-weight: 100;
	}
	.myarticle-main ul li .top section span i{
		margin-right: 3px;
	}
	.myarticle-main .footer h4{
		font-size: 15px;
		font-weight: 100;
		text-align: center;
		
	}
	.myarticle-main .footer p{
		padding-left: 10px;
		width: 100%;
		font-size: 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>