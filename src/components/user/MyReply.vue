<template>
	<div id="myArticle">
		<tui-chu title="我的回复"></tui-chu>
		<div class="myreply-main">
			<ul>
				<li v-for="(val,ins) in reply"> 
					<a href="#" @click="lookarticle(val.article_id.times)">
						<div> 
							<div class="top">
								<img :src="'http://localhost:2200/img/' + content.user.img + '.jpg'"  alt="" />
								<p> 
									<span> {{content.user.name}} </span>
									<span> {{val.time | time}} </span>
								</p>
							</div>
							<div class="footer">
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
	import axios from 'axios'
	import $ from 'jquery'
	import TuiChu from './TuiChu'
	export default {
		data:function(){
			return {
				reply:[],
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
				url:'/los/user/allreply',
				method:'POST',
				data:$.param(id),   //将数据转换成字符串序列化对
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then((data) => {
				if(data.data.message){
					var arr = []
					var r  = data.data.message.reply
					var c = data.data.message.comment 
					r.forEach((data) => {
						arr.push(data)
					})
					c.forEach((data) => {
						arr.push(data)
					})
					
					arr.sort(function(a,b){
						var aa = new Date(a.time).getTime()
						var bb = new Date(b.time).getTime()
						return bb - aa
					})
					that.reply = arr
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
		background: #FFFFFF;
		margin-bottom: 50px;
	}
	ul{
		list-style: none;
	}
	.myreply-main{
		margin-top: 40px;
	}
	ul li{
		padding: 10px;
	}
	ul li .top{
		overflow: hidden;
	}
	ul li .top img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		float: left;
	}
	a{
		color: #000;
	}
	ul li a > div{
		padding-bottom: 15px;
		border-bottom: solid 1px #DEDEDE;
	}
	ul li .top p{
		float: left;
		margin-left: 10px;
	}
	ul li .top p span{
		display: block;
		font-size: 12px;
	}
	ul li .top section{
		float: right;
	}
	ul li .top section span{
		display: inline-block;
		margin-right: 10px;
		font-size: 12px;
		font-weight: 100;
	}
	ul li .top section span i{
		margin-right: 3px;
	}
	.footer h4{
		font-size: 15px;
		font-weight: 100;
		text-align: center;
		
	}
	.footer p{
		padding-left: 10px;
		width: 100%;
		font-size: 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>