<template>
	<div id="error">
		<div class="main">
			<div>
				<h2> {{data}} </h2>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data:function(){
			return {
				
			}
		},
		props:['data']
	}
	
</script>

<style scoped="">
	#error{
		position: fixed;
		top: 50%;
		border: solid 1px #000000;
		display: none;
		width: 100%;
		height: 50px;
		background: rgba(0,0,0,1);
	}
	.main h2{
		margin-top: 5px;
		color: #fff;
		text-align: center;
		color: #3388ff;
	}
</style>