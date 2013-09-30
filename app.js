var score = 0;
var time = 60;
var actif = 0;
var bestScore = 0;
var interval;
var posX = (Math.random()*650);
var	posY = (Math.random()*650);

function reset(){
	time = 60;
	score = 0;
	
	$("#clown").attr("disable",false);
	$("#pepito").attr("disable",false);

	$(".score").html(score);
	$(".time").html(time);
	$(".time").css({"font-size":"30px"});
	
	interval = setInterval(timer, 1000);
}
		
function timer(){
	time--;
	$(".time").html(time);
	
	var chapiteau = Math.floor((Math.random()*100)+1);
	if(chapiteau < 5){
		$("#pepito").css({"display":"inline"});
	}else{
		$("#pepito").css({"display":"none"});
	}
	if (time==0) {
		alert("Score: "+score);
		clearInterval(interval);

		$("#clown").attr("disable",true);
		$("#pepito").attr("disable",true);
		
		$(".time").html("<p onClick='reset();' action='reset();'>Try Again</p>");
		$(".time").css({"font-size":"12px"});
		if(score > bestScore){
			bestScore = score;
		}
		$(".best").html(bestScore);
		$(".best").css({"border-bottom":"2px solid #000","border-left":"2px solid #000"});
	}
}
function move(object,factor,val){
	posX = (Math.random()*factor);
	posY = (Math.random()*factor);

	object.animate({"top":posX,"left":posY},100);

	score = score + val;
	$(".score").html(score);
}

$(document).ready(function()
{
	$("#pepito").css({"display":"none"});
	$(".score").html(score);
	$("#clown").css({"top":posX,"left":posY});

	$("#clown").click(function(){
		move($(this),650,1);
	});
	$("#pepito").click(function(){
		move($(this),450,3);
	});
		
	interval = setInterval(timer,1000);
});
