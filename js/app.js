$(document).ready(function()
{
	ele_pepito.css({"display":"none"});
	ele_score.html(score);
	ele_clown.css({"top":posY,"left":posX});
	
	$(popcorn.getName()).html(popcorn.getCost()+" pts");
	$(soda.getName()).html(soda.getCost()+" pts");
	$(icecream.getName()).html(icecream.getCost()+" pts");
	$(vip.getName()).html(vip.getCost()+" pts");
	
	ele_clown.click(function(){
		move($(this),x-clownX-clownX/2);
	});
	ele_pepito.click(function(){
		move($(this),x-pepitoX-pepitoX/2);
	});
	ele_pop.click(function(){
		buy(popcorn);
	});	
	ele_soda.click(function(){
		buy(soda);
	});	
	ele_ice.click(function(){
		buy(icecream);
	});	
	ele_vip.click(function(){
		buy(vip);
	});	
	
	interval = setInterval(timer,1000);
});
