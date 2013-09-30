$(document).ready(function()
{
	var posX = (Math.random()*650);
	var	posY = (Math.random()*650);

	var score = 0;
	var time = 60;
	var actif = 0;

		$(".score").html(score);
		$("#clown").css({"top":posX,"left":posY});

		$("#clown").click(function()
		{
			position($(this));	
		});
		
		$("#pepito").click(function()
		{
			position($(this));	
		});
		
		var interval = setInterval(timer,1000);

		function timer()
		{
			time--;
			$(".time").html(time);
			if (time==0) 
			{
				alert("Score: "+score);
				clearInterval(interval);

				$("#clown").off();
			}
		}
		
		function position(onch){
			posX = (Math.random()*650);
			posY = (Math.random()*650);

			console.log(posX + " " +posY);

			onch.animate({"top":posX,"left":posY},100);

			score++;
			$(".score").html(score);		
		}
		
	

});

	
