var ele_wrap = $("#wrapper");
var ele_clown = $("#clown");
var ele_pepito = $("#pepito");
var score = 0;
var init_time = 60;
var time = 60;
var actif = 0;
var bestScore = 0;
var interval;
var posX = (Math.random()*(x - ele_clown.height));
var posY = (Math.random()*(y - ele_clown.width));
var x = ele_wrap.height();
var y = ele_wrap.width();
var clownX = ele_clown.height();
var clownY = ele_clown.width();
var pepitoX = ele_pepito.height();
var pepitoY = ele_pepito.width();

function reset(){
	time = init_time;
	score = 0;
	
	ele_clown.attr("disable",false);
	ele_pepito.attr("disable",false);

	$(".score").html(score);
	$(".time").html(time);
	$(".time").css({"font-size":"30px"});
	
	interval = setInterval(timer, 1000);
}
		
function timer(){
	time--;
	$(".time").html(time);
	
	var chapiteau = Math.floor((Math.random()*100)+1);
	if(chapiteau < 31){
		ele_pepito.css({"display":"inline"});
	}else{
		ele_pepito.css({"display":"none"});
	}
	if (time==0) {
		alert("Score: "+score);
		clearInterval(interval);

		ele_clown.attr("disable",true);
		ele_pepito.attr("disable",true);
		
		$(".time").html("<p onClick='reset();' action='reset();'>Try Again</p>");
		$(".time").css({"font-size":"12px"});
		if(score > bestScore){
			bestScore = score;
		}
		$(".best").html(bestScore);
		$(".best").css({"border-bottom":"2px solid #000","border-left":"2px solid #000"});
		
		//continuer attribution variable
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
		move($(this),y-clownY-clownY/2,1);
	});
	$("#pepito").click(function(){
		move($(this),y-pepitoY-pepitoY/2,3);
	});
		
	interval = setInterval(timer,1000);
});
