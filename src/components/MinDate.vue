<template>
	<div class="one" :class="{'min':s}">
		<div class="ones">
			<img :src="'http://192.168.13.212:2200/stzb/card_' + data.img + '.jpg'"/>
		    <div :id="'main' + data.img" style="width: 350px;height:220px;border-radius: 10px;"></div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		data:function(){
			return {
			}
		},
		props:['data','s'],
		mounted:function(){
//			console.log(this.data)
			this.use();
		},
		methods:{
			use:function(){
				
				function show(ss){
						if( ss.indexOf('#') > 0 ){
							var name = ss;
				
							var arr = name.split(";")
							var str = ''
							arr.forEach(function(data){
								var num = data.substr(data.length - 5) - 0
								var s = String.fromCharCode(num)
								str = str + s
							})
							var names = str.substring(0,str.length - 1)
							return names
						}else{
							return ss
						}
				}
				
				var id = 'main' + this.data.img
				//武将名字
				var name = this.data.name
				var names = show(name)
				//初始攻击
				var gj = this.data.costs[4].substring(5)
				//初始智谋
				var zm = this.data.costs[3].substring(5)
				//初始防御
				var fy = this.data.costs[6].substring(5)
				//初始攻城
				var gc = this.data.costs[5].substring(5)
				//初始速度
				var sd = this.data.costs[7].substring(5)
				
				
				
				
				
				$('#'+id).addClass('date-show')
				var myChart = echarts.init(document.getElementById(id));
	
				$('#'+id).mouseover(function(){
					$(this).css('opacity','1')
				})
				
				$('#'+id).mouseleave(function(){
					$(this).css('opacity','0.8')
				})
				
				let option = {
				    backgroundColor: '#2c343c',
				
				    title: {
				        text: names,
				        left: 'center',
				        top: 20,
				        textStyle: {
				            color: '#ccc'
				        }
				    },
				
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				
				    visualMap: {
				        show: false,
				        min: 0,
				        max: 120,
				        inRange: {
				            colorLightness: [0, 1]
				        }
				    },
				    series : [
				        {
				            name:'数据',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '50%'],
				            data:[
				                {value:gj, name:'初始攻击'},
				                {value:zm, name:'初始谋略'},
				                {value:fy, name:'初始防御'},
				                {value:sd, name:'初始速度'},
				                {value:gc, name:'初始攻城'}
				            ].sort(function (a, b) { return a.value - b.value; }),
				            roseType: 'radius',
				            label: {
				                normal: {
				                    textStyle: {
				                        color: 'rgba(255, 255, 255,1)'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    lineStyle: {
				                        color: 'rgba(255, 255, 255, 0.5)'
				                    },
				                    smooth: 0.2,
				                    length: 10,
				                    length2: 20
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#c23531',
				                    shadowBlur: 100,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				
				            animationType: 'scale',
				            animationEasing: 'elasticOut',
				            animationDelay: function (idx) {
				                return Math.random() * 200;
				            }
				        }
				    ]
				};
				
				
				
				myChart.setOption(option);
			}
		}
	}
	
</script>

<style scoped="">
	*{
		padding: 0;
		margin: 0;
	}
	.one{
		cursor: pointer;
		box-shadow: 0px 0px 20px #222;
		overflow: hidden;
		margin: 20px auto;
		border-radius: 10px;
		width: 350px;
		height: 220px;
	}
	.ones{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.min{
		zoom: 20%;
		margin: 35px;
		top: 0;
		display: inline-block;
	}
	img{
		cursor: pointer;
		position: absolute;
		width: 220px;
		height: 350px;        
		top: -65px;
		left: 65px; 
		border-radius:10px ;
		transform: rotateZ(-90deg);   
		
	}
	.one:hover #main{
		opacity: 0;
		transition: 1s;
	}
	div.date-show{
		position: absolute;
		transition:1s;
		opacity: 0.8;
		
	}
</style>