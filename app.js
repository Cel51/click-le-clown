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
			posX = (Math.random()*650);
			posY = (Math.random()*650);

			console.log(posX + " " +posY);

			$(this).animate({"top":posX,"left":posY},100);

			score++;
			$(".score").html(score);
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
				
				$(".time").html("<p onClick='reset();'>Try Again</p>");
				$(".time").css({"font-size":"12px"});
			}
		}

		function reset(){
			time = 60;
			
			$("clown").on();			
			$(".time").html(time);
			$(".time").css({"font-size":"30px"});
			var interval = setInterval(timer, 1000);
		}

});

	
