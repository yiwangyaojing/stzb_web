<template>
	<div id="myfriend">
		<tui-chu title="我的好友"></tui-chu>
		<div class="myinfo-main">
			<ul>
				<li v-for="(val,ins) in content.user.user_friend"> 
					<div>
						<img @click="user(val.id)" :src="'http://localhost:2200/img/' + val.img + '.jpg'"  alt="" />
						<span> {{val.name}} </span>
						<i> 邮件 </i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import TuiChu from './TuiChu'
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
	#myfriend{
		margin-top: 45px;
	}
	.myinfo-main{
		margin: 5px 10px;
	}
	ul li div{
		padding: 10px 10px;
		overflow: hidden;
		margin: 5px 5px;
		border-bottom:solid 1px #ccc ;
	}
	div img{
		cursor: pointer;
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	div span{
		float: left;
		margin-left: 10px;
		margin-top: 14px;
	}
	ul li div i{
		cursor: pointer;
		float: right;
		border:solid 1px #D1EEEE;
		font-size: 12px;
		padding:3px 10px;
		border-radius: 3px;
		margin-top: 10px;
		margin-right: 10px;
		font-style: initial;
	}
</style>