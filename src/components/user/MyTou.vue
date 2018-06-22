<template>
	<div id="myArticle">
		<tui-chu title="上传头像"></tui-chu>
		<div class="myinfo-main">
			在此处上传头像
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