<template>
	<div class="header">
		<div class="h"> 
			<a href="#/page">
				<p class="fa fa-github-alt"> </p>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		data:function(){
			return {
				
			}
		},
		
	}
</script>

<style scoped="">
	.header{
		position: fixed;
		/*width: 30px;*/
		z-index: 10;
		right: 2%;
		top: 5px;
		background: rgba(0,0,90,0);
	}
	.h{
		text-align: right;
		/*width: 30px;*/
	}
	.h p{
		color: orangered;
		font-size: 35px;
	}
	.h p:hover{
		cursor: pointer;
	}
</style>