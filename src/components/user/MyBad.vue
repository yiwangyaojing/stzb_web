<template>
	<div id="myArticle">
		<tui-chu title="黑名单"></tui-chu>
		<div class="myinfo-main">
			<li>
				<br /><br />
				<h2> 该模块正在开发中 </h2>
			</li>
		</div>
	</div>
</template>

<script>
	import TuiChu from './TuiChu'
	export default {
		data:function(){
			return {
			}
		},
		props:['content'],
		components:{
			TuiChu
		}
	}
	
</script>

<style scoped="">
	
</style>