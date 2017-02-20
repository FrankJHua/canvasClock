var canvas1,
	canvas2,
	ctx1,
	ctx2;
var WIDTH = 800,
	HEIGHT = 800;

function init(){
	canvas1 = document.getElementById('canvas1');
	canvas2 = document.getElementById("canvas2");
	if(canvas1.getContext('2d')){
		ctx1 = canvas1.getContext('2d');
		ctx2 = canvas2.getContext('2d');
	}else{
		return;
	}
	canvas1.width = WIDTH;
	canvas1.height = HEIGHT;
	canvas2.width = WIDTH;
	canvas2.height = HEIGHT;

	//绘制时钟边框和刻度（由于是静态的，为了提高渲染速度，采用分层canvas）
	drawClockBorder();

	//绘制时针动画
	window.requestAnimationFrame(draw);
}

function draw(){

	ctx1.save();
	ctx1.clearRect(0,0,800,800);

	ctx1.translate(400,400);
	//将x轴转到竖直向上的方向，以习惯时钟方向，便于计算
	ctx1.rotate(-Math.PI/2);
	ctx1.save();

	var time = new Date();		//获取当前的时间数据
	var hour = time.getHours()%12;
	var minute = time.getMinutes();
	var second = time.getSeconds();

	//画时针
	ctx1.save();
	ctx1.lineWidth = 25;
	ctx1.lineCap = 'round';
	ctx1.rotate( hour*(Math.PI/6) + minute*Math.PI/360);
	ctx1.beginPath();
	ctx1.moveTo(-40,0);
	ctx1.lineTo(200,0);
	ctx1.stroke();
	ctx1.restore();

	//画分针
	ctx1.save();
	ctx1.lineWidth = 15;
	ctx1.lineCap = 'round';
	ctx1.rotate( minute*(Math.PI/30) + second*Math.PI/1800);
	ctx1.beginPath();
	ctx1.moveTo(-40,0);
	ctx1.lineTo(260,0);
	ctx1.stroke();
	ctx1.restore();

	//画秒针
	ctx1.save();
	ctx1.lineWidth = 8;
	ctx1.lineCap = 'round';
	ctx1.strokeStyle = 'red';
	ctx1.rotate( second*(Math.PI/30) );
	ctx1.beginPath();
	ctx1.arc(0,0,10,0,Math.PI*2,true);
	ctx1.moveTo(-60,0);
	ctx1.lineTo(-10,0);
	ctx1.moveTo(10,0)
	ctx1.lineTo(200,0);
	ctx1.moveTo(240,0);
	ctx1.arc(220,0,20,0,Math.PI*2,true);
	ctx1.stroke();
	ctx1.restore();

	ctx1.restore();
	ctx1.restore();
	window.requestAnimationFrame(draw);
}

function drawClockBorder(){

	ctx2.clearRect(0,0,WIDTH,HEIGHT);
	ctx2.translate(400,400);
	ctx2.rotate(-Math.PI/2);
	ctx2.save();

	// 蓝色外边框
	ctx2.strokeStyle = "#325FA2";
	ctx2.lineWidth = 20;
	ctx2.beginPath();
	ctx2.arc(0,0,300,0,Math.PI*2,true);
	ctx2.stroke();

	//小时刻度
	ctx2.lineWidth = 8;
	ctx2.lineCap = 'round';
	ctx2.strokeStyle = 'black';
	for (var i = 0; i < 12; i++){
    	ctx2.beginPath();
    	ctx2.rotate(Math.PI/6);
    	ctx2.moveTo(240,0);
    	ctx2.lineTo(280,0);
    	ctx2.stroke();
 	}
	ctx2.restore();

	//分钟刻度
	ctx2.save();
	ctx2.lineWdith = 4;
	ctx2.lineCap = 'square';
	for( var i = 0; i < 60; i++){
		if(i%5!=0){
			ctx2.beginPath();
			ctx2.moveTo(260,0);
			ctx2.lineTo(280,0);
			ctx2.stroke();
		}
		ctx2.rotate(Math.PI/30);
	}
	ctx2.restore();
}
window.onload = init();
