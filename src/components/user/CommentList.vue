<template>
	<div id="commentlist">
		
		<h2 v-if="data.length <= 0"> 暂无回复 </h2>
		<ul v-else="">
			<li v-for="(val,ins) in data">
				<div>
					<p style="color: #888888;"> <span>  {{val.author_id.name}}  </span> <span>  {{val.time | time}}  </span> 
						<i @click="commentreply(val)" class="fa fa-comment-o">  </i> </p>
					<p> 
						
						{{val.content}}
					</p>
				</div>
			</li>
		</ul>
		
		<co-mment :time="arr"></co-mment>
	</div>
</template>

<script>
	
	import $ from 'jquery'
	import axios from 'axios'
	//二级回复的组件
	import CoMment from '../CoMment'
	export default {
		data:function(){
			return {
				arr:[],
			}
		},
		components:{
			CoMment
		},
		props:['data'],
		methods:{
			//多级回复的出现
			commentreply:function(ev){
				
//				console.log(ev.reply_id.time)
//				一级回复的文章id
				this.arr.push(new Date(ev.reply_id.time).getTime())
				//回复了谁
				this.arr.push('回复' + ' ' + ev.author_id.name + ':')
				//二级回复的文章作者id
				this.arr.push(ev.author_id._id)
				if($('.admin').hasClass('true')){
					
					
					
					$('#comment').css('display','block')
					$('#comment section').css('display','none')
				}else{
					alert('请先登录!')
					$('.dengyin').css('display','block')
				}
			}
		}
	}
	
</script>

<style scoped="">
	ul{
		list-style: none;
	}
	#commentlist{
		width: 90%;
		margin: 10px auto;
		/*border: solid 1px red;*/
	}
	#comment{
		left: 0;
	}
	#commentlist p{
		overflow: hidden;
		font-size: 12px;
		width: 100%;
		word-wrap: break-word;
	}
	#commentlist li{
		margin: 10px 0px;
	}
	p i{
		color: #000;
		cursor: pointer;
		font-size: 15px;
		float: right;
	}
</style>