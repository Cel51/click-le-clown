var ele_wrap = $("#wrapper");
var ele_clown = $("#clown");
var ele_pepito = $("#pepito");
var ele_time = $(".time");
var ele_score = $(".score");
var ele_best = $(".best");

var score = 0;
var init_time = 60;
var time = 60;
var actif = 0;
var bestScore = 0;
var interval;

var y = ele_wrap.height();
var x = ele_wrap.width();
var clownY = ele_clown.height();
var clownX = ele_clown.width();
var pepitoY = ele_pepito.height();
var pepitoX = ele_pepito.width();

var posY = (Math.random()*(y - ele_clown.height));
var posX = (Math.random()*(x - ele_clown.width));

function reset(){
	time = init_time;
	score = 0;
	
	ele_clown.css({"display":"inline"});

	ele_score.html(score);
	ele_time.html(time);
	ele_time.css({"font-size":"30px"});
	
	interval = setInterval(timer, 1000);
}
		
function timer(){
	time--;
	ele_time.html(time);
	
	var chapiteau = Math.floor((Math.random()*100)+1);
	if(chapiteau < 11){
		ele_pepito.css({"display":"inline"});
	}else{
		ele_pepito.css({"display":"none"});
	}
	if (time==0) {
		alert("Score: "+score);
		clearInterval(interval);

		ele_clown.css({"display":"none"});
		ele_pepito.css({"display":"none"});
		
		ele_time.html("<p onClick='reset();' action='reset();'>Try Again</p>");
		ele_time.css({"font-size":"12px"});
		if(score > bestScore){
			bestScore = score;
		}
		ele_best.html(bestScore);
		ele_best.css({"border-bottom":"2px solid #000","border-left":"2px solid #000"});
		
		//continuer attribution variable
	}
}
function move(object,factor,val){
	posX = (Math.random()*factor);
	posY = (Math.random()*factor);

	object.animate({"top":posY,"left":posX},100);

	score = score + val;
	ele_score.html(score);
}

$(document).ready(function()
{
	ele_pepito.css({"display":"none"});
	ele_score.html(score);
	ele_clown.css({"top":posY,"left":posX});

	ele_clown.click(function(){
		move($(this),x-clownX-clownX/2,1);
	});
	ele_pepito.click(function(){
		move($(this),x-pepitoX-pepitoX/2,3);
	});
		
	interval = setInterval(timer,1000);
});
