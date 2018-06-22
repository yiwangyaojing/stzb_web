<template>
	<div id="myAdmin">
		<tui-chu title="系统消息"></tui-chu>
		<div class="myAdmin-main">
			<ul>
				<li v-for="(data,ins) in content.admin" v-if="data.user_type == 'user-ask'">
					<span style="font-size: 12px;"> {{data.time | data}} </span>
					<div class="info-main user-ask">
						<section class="user-ask-left">
							<img style="cursor: pointer;" @click="user(data.use_id._id)" :src="'http://localhost:2200/img/' + data.use_id.img + '.jpg'" />
							<p> 
								<span>  <i style="color: #777;"> 好友请求:</i> <i> {{data.use_id.name}} </i> </span>
								<span> <i style="color: #777;"> 头衔: </i> <i> {{data.use_id.use_style.name}} </i> </span>
							</p>
						</section>
						<section v-if="!data.add_ask" class="user-ask-right">
							<p> 
								<span @click="yesadd(data)" > 同意  </span>
								<span @click="noadd(data)"> 拒绝 </span>
							</p>
						</section>
						<section v-else="" class="user-ask-right">
							<p>
								<span v-if="data.add_ask == 'yes'" style="border: solid 1px #ccc;padding: 5px 15px; background: #f5f5f5;color: #000;" > 您已同意 </span>
								<span v-if="data.add_ask == 'no'" style="border: solid 1px #ccc;padding: 5px 15px; background: #f5f5f5;color: #000;" > 已拒绝 </span>
							</p>
						</section>
					</div>
				</li>
				
				<li v-for="(data,ins) in content.admin" v-if="data.user_type == 'user-yes'">
				<span style="font-size: 12px;"> {{data.time | data}} </span>
					<div class="info-main user-ask">
						<section class="user-ask-left">
							<img style="cursor: pointer;" @click="user(data.use_id._id)"  :src="'http://localhost:2200/img/' + data.use_id.img + '.jpg'" />
						</section>
						<section class="user-ask-right" style="float: left;overflow: hidden;margin: 15px 0px 0px 10px;">
							<span class="addyes"> <i style="color: red;font-style: initial;"> {{data.use_id.name}} </i>同意了您的好友请求 </span>
						</section>
						
							<span class="addyestrue" v-if="!data.has_look" @click="addyestrue(data._id)">确认已读</span>
							<span class="addyestrue" style="border: solid 1px #ccc;padding: 5px 15px;margin-left: 35px; background: #f5f5f5;color: #000;" v-else="" @click="addyestrue(data._id)">已同意</span>
						
					</div>
				</li>
				<li v-for="(data,ins) in content.admin" v-if="data.user_type == 'user-no'" >
					<span style="font-size: 12px;"> {{data.time | data}} </span>
					<div class="info-main user-ask">
						<section class="user-ask-left">
							<img style="cursor: pointer;" @click="user(data.use_id._id)"  :src="'http://localhost:2200/img/' + data.use_id.img + '.jpg'" />
						</section>
						<section class="user-ask-right" style="float: left;overflow: hidden;margin: 15px 0px 0px 10px;">
							<span class="addyes"> <i style="color: red;font-style: initial;"> {{data.use_id.name}} </i>拒绝了您的好友请求 </span>
						</section>
						
							<span class="addyestrue" v-if="!data.has_look" @click="addyestrue(data._id)">确认已读</span>
							<span class="addyestrue" style="border: solid 1px #ccc;padding: 5px 15px; background: #f5f5f5;color: #000;margin-left: 35px; " v-else="" @click="addyestrue(data._id)">被拒绝</span>
						
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import TuiChu from './TuiChu'
	import $ from 'jquery'
	import axios from 'axios'
	export default {
		data:function(){
			return {
			}
		},
		props:['content'],
		components:{
			TuiChu
		},
		methods:{
			//确认添加朋友
			yesadd:function(data){
				
				var id = {
					//当前发送消息那人的id
					id:data.use_id._id,
					//该条消息的id
					ids:data._id
				}
				axios({
					url:'/los/add/friend/yes',
					method:'POST',
					data:$.param(id),   //将数据转换成字符串序列化对
					headers:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then((data) => {
					console.log(data)
					alert(data.data)
  					window.location.reload();
				}).catch((err) => {
					console.log(err)
				})
			},
			//拒绝添加好友
			noadd:function(data){
				var id = {
					//当前发送消息那人的id
					id:data.use_id._id,
					//该条消息的id
					ids:data._id
				}
				
				axios({
					url:'/los/add/friend/no',
					method:'POST',
					data:$.param(id),   //将数据转换成字符串序列化对
					headers:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then((data) => {
					alert(data.data)
  					window.location.reload();
				}).catch((err) => {
					console.log(err)
				})
				
				
			},
			//消息已读
			addyestrue:function(id){
				var id = {
					id:id
				}
				axios({
					url:'/los/add/friend/true',
					method:'POST',
					data:$.param(id),   //将数据转换成字符串序列化对
					headers:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then((data) => {
					alert(data.data)
  					window.location.reload();
				}).catch((err) => {
					console.log(err)
				})
				
				
			},
			//查看
			user:function(id){
				if($('.admin').hasClass('true')){
					if( this.$store.state.user._id == id){
					this.$router.push('/user')
				}else{
					this.$router.push('/firend/' + id)
				}
				}else{
					alert('请先登录!')
				}
			}
		}
	}
	
</script>

<style scoped="">
	#myAdmin{
		margin: 40px 0px;
	}
	.myAdmin-main{
		padding: 5px 7px;
	}
	#myAdmin ul{
		
	}
	#myAdmin ul li{
		margin: 8px 0px;
		margin-bottom: 15px;
	}
	#myAdmin ul li div{
		padding: 8px 10px;
		border: solid 1px #ccc;
		box-shadow: 0px 0px 5px #ccc;
		border-radius: 4px;
		overflow: hidden;
	}
	#myAdmin ul li div .user-ask-left{
		float:left;
		overflow: hidden;
	}
	#myAdmin ul li div .user-ask-left img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		float: left;
	}
	#myAdmin ul li div .user-ask-left p span{
		font-size: 13px;
	}
	#myAdmin ul li div .user-ask-left p{
		float: right;
		margin-left: 10px;
		margin-top: 5px;
	}
	#myAdmin ul li div .user-ask-left p span{
		display: block;
	}
	#myAdmin ul li div .user-ask-left p span i{
		font-style: initial;
	}
	#myAdmin ul li div .user-ask-right{
		float:right;
	}
	#myAdmin ul li div .user-ask-right p{
		margin-top:10px ;
	}
	#myAdmin ul li div .user-ask-right p span{
		background: #3388FF;
		cursor: pointer;
		border: solid 1px #3388FF;
		border-radius:3px ;
		color: #FFFFFF;
		display: inline-block;
		margin: 2px 5px;
		font-size: 14px;
		padding: 1px 7px;
	}
	span.addyes{
		display: inline-block;
		font-size: 13px;
		float:left;
	}
	span.addyestrue{
		display: inline-block;
		background: #3388FF;
		cursor: pointer;
		border: solid 1px #3388FF;
		border-radius:3px ;
		color: #FFFFFF;
		padding: 4px 8px;
		font-size: 13px;
		margin: 10px 0px 0px 30px;
	}
</style>