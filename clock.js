var canvas,
	ctx;
var WIDTH = 800,
	HEIGHT = 800;

function init(){
	canvas = document.getElementById('canvas');
	if(canvas.getContext('2d')){
		ctx = canvas.getContext('2d');
	}else{
		return;
	}
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	window.requestAnimationFrame(draw);
}
function draw(){

	ctx.save();
	ctx.clearRect(0,0,800,800);

	ctx.translate(400,400);
	//将x轴转到竖直向上的方向，以习惯时钟方向，便于计算
	ctx.rotate(-Math.PI/2);
	ctx.save();

	//蓝色外边框
	ctx.strokeStyle = "#325FA2";
	ctx.lineWidth = 20;
	ctx.beginPath();
	ctx.arc(0,0,300,0,Math.PI*2,true);
	ctx.stroke();

	//小时刻度
	ctx.lineWidth = 8;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'black';
	for (var i = 0; i < 12; i++){
    	ctx.beginPath();
    	ctx.rotate(Math.PI/6);
    	ctx.moveTo(240,0);
    	ctx.lineTo(280,0);
    	ctx.stroke();
 	}
	ctx.restore();

	//分钟刻度
	ctx.save();
	ctx.lineWdith = 4;
	ctx.lineCap = 'square';
	for( var i = 0; i < 60; i++){
		if(i%5!=0){
			ctx.beginPath();
			ctx.moveTo(260,0);
			ctx.lineTo(280,0);
			ctx.stroke();
		}
		ctx.rotate(Math.PI/30);
	}
	ctx.restore();
	var time = new Date();		//获取当前的时间数据
	var hour = time.getHours()%12;
	var minute = time.getMinutes();
	var second = time.getSeconds();

	//画时针
	ctx.save();
	ctx.lineWidth = 25;
	ctx.lineCap = 'round';
	ctx.rotate( hour*(Math.PI/6) + minute*Math.PI/360);
	ctx.beginPath();
	ctx.moveTo(-40,0);
	ctx.lineTo(200,0);
	ctx.stroke();
	ctx.restore();

	//画分针
	ctx.save();
	ctx.lineWidth = 15;
	ctx.lineCap = 'round';
	ctx.rotate( minute*(Math.PI/30) + second*Math.PI/1800);
	ctx.beginPath();
	ctx.moveTo(-40,0);
	ctx.lineTo(260,0);
	ctx.stroke();
	ctx.restore();

	//画秒针
	ctx.save();
	ctx.lineWidth = 8;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'red';
	ctx.rotate( second*(Math.PI/30) );
	ctx.beginPath();
	ctx.arc(0,0,10,0,Math.PI*2,true);
	ctx.moveTo(-60,0);
	ctx.lineTo(-10,0);
	ctx.moveTo(10,0)
	ctx.lineTo(200,0);
	ctx.moveTo(240,0);
	ctx.arc(220,0,20,0,Math.PI*2,true);
	ctx.stroke();
	ctx.restore();

	ctx.restore();
	window.requestAnimationFrame(draw);
}
window.onload = init();
