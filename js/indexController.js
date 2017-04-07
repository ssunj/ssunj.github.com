
function IndexController(){
	var self=this;

	self._init = function(canvas){
		canvas.width = window.innerHeight; 
		canvas.height = window.innerWidth; 

	};

	self._canvasSquare = function(ctx){
	
		//各个角的顶点 从左上角开始 回到左上角 连成线
		// CTX.MOVETO(0, CANVAS.HEIGHT/2);  
		// CTX.LINETO(CANVAS.WIDTH, CANVAS.HEIGHT/2);  
		// CTX.LINETO(CANVAS.WIDTH, CANVAS.HEIGHT);  
		// CTX.LINETO(0, CANVAS.HEIGHT);  
		// CTX.LINETO(0, CANVAS.HEIGHT/2);
		//结束  
	
	
		//持续的清空画布并重新绘制新的图形 就像电影每秒播放24张图片 告诉浏览器每一帧用loop来控制
		//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
		window.requestAnimFrame = (function(){  
		return  window.requestAnimationFrame       ||  
		        window.webkitRequestAnimationFrame ||  
		        window.mozRequestAnimationFrame    ||  
		        function( callback ){  
		          window.setTimeout(callback, 1000 / 60);  
		        };  
		})();  
		//设置颜色区间
		var lines = ["rgba(0,222,255, 0.2)",  
               "rgba(157,192,249, 0.2)",  
               "rgba(0,168,255, 0.2)"];
		//初始角度为0  
		var step = 0;  
		function loop(){  
		    ctx.clearRect(0,0,canvas.width,canvas.height);  

		    for (var j = lines.length-1; j>=0;j--) {
		    
			    ctx.fillStyle = lines[j];  
			    //角度增加一度  
			    step++;  
			    //角度转换成弧度  
			    var angle = (step+j*45)*Math.PI/180;  
			    //矩形高度的变化量  
			    var deltaHeight   = Math.sin(angle) * 50;  
			    //矩形高度的变化量(右上顶点)  
			    var deltaHeightRight   = Math.cos(angle) * 50;  

			    //开始绘制路径
			   	ctx.beginPath();  
				ctx.moveTo(0, canvas.height/2+deltaHeight);  
				//ctx.lineTo(canvas.width, canvas.height/2+deltaHeightRight);  
				//画曲线  
				ctx.bezierCurveTo(canvas.width /2, canvas.height/2+deltaHeight-50, canvas.width / 2, canvas.height/2+deltaHeightRight-50, canvas.width, canvas.height/2+deltaHeightRight);  
				//右上角右下角
				ctx.lineTo(canvas.width, canvas.height);  
				//左下角
				ctx.lineTo(0, canvas.height);  
				//左上角
				ctx.lineTo(0, canvas.height/2+deltaHeight);  
				//闭合路径
				ctx.closePath(); 
				//填充路径
			    ctx.fill();  
			};

		    requestAnimFrame(loop);  

		} 

		loop();  


};

}
if(typeof (indexController) =="undefined"){}
	indexController = new IndexController();