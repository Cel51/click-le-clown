var score = 0;
var time = 5;
var actif = 0;
var bestScore = 0;
var interval;
function reset()
{
	time = 5;
	score = 0;
	
	$("#clown").attr("disable",false);

	$(".score").html(score);
	$(".time").html(time);
	$(".time").css({"font-size":"30px"});
	
	interval = setInterval(timer, 1000);
}
		
function timer()
{
	time--;
	$(".time").html(time);
	if (time==0) 
	{
		alert("Score: "+score);
		clearInterval(interval);

		$("#clown").attr("disable",true);
		
		$(".time").html("<p onClick='reset();' action='reset();'>Try Again</p>");
		$(".time").css({"font-size":"12px"});
		if(score > bestScore){
			bestScore = score;
		}
		$(".best").html(bestScore);
		$(".best").css({"border-bottom":"2px solid #000","border-left":"2px solid #000"});
	}
}
$(document).ready(function()
{
	var posX = (Math.random()*650);
	var	posY = (Math.random()*650);
	
		$(".score").html(score);
		$("#clown").css({"top":posX,"left":posY});

		$("#clown").click(function()
		{
			posX = (Math.random()*650);
			posY = (Math.random()*650);

			$(this).animate({"top":posX,"left":posY},100);

			score++;
			$(".score").html(score);
		});
		
	interval = setInterval(timer,1000);
});
