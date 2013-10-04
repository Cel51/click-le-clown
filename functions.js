var ele_wrap = $("#wrapper");
var ele_clown = $("#clown");
var ele_pepito = $("#pepito");

var ele_again = $("#tryagain");
var ele_time = $(".time");
var ele_score = $(".score");
var ele_best = $(".best");

var ele_bonus = $("#bonuses");
var ele_pop = $(".popcorn");
var ele_soda = $(".soda");
var ele_ice = $(".icecream");
var ele_vip = $(".vip");

var popcorn = new Bonus('.prixp',2);
var soda = new Bonus('.prixs',5);
var icecream = new Bonus('.prixi',15);
var vip = new Bonus('.prixv',25);

var y = ele_wrap.height();
var x = ele_wrap.width();
var clownY = $("#clown").height();
var clownX = $("#clown").width();
var pepitoY = ele_pepito.height();
var pepitoX = ele_pepito.width();

var posY = (Math.random()*(y - $("#clown").height));
var posX = (Math.random()*(x - $("#clown").width));

var score = 0;
var init_time = 60;
var time = init_time;
var actif = 0;
var bestScore = 0;
var clownVal = 1;
var pepitoVal = 3;
var interval;
var chances = 11;
var fact = 1;

function reset(){
	time = init_time;
	score = 0;
	
	$("#clown").css({"display":"inline"});
	
	ele_again.css({"border":""})
	ele_again.html('');
	
	ele_score.html(score);
	ele_time.html(time);
	ele_time.css({"font-size":"30px"});
	
	interval = setInterval(timer, 1000);
	popcorn.cost=2;
	soda.cost=5;
	icecream.cost=15;
	vip.cost=25;
	
	$(popcorn.getName()).html(popcorn.getCost()+" pts");
	$(soda.getName()).html(soda.getCost()+" pts");
	$(icecream.getName()).html(icecream.getCost()+" pts");
	$(vip.getName()).html(vip.getCost()+" pts");
}
		
function timer(){
	time--;
	ele_time.html(time);
	
	var chapiteau = Math.floor((Math.random()*100)+1);
	if(chapiteau < chances){
		ele_pepito.css({"display":"inline"});
	}else{
		ele_pepito.css({"display":"none"});
	}
	if (time==0) {
		$("#clown").css({"display":"none"});
		ele_pepito.css({"display":"none"});
		
		ele_again.css({"font-size":"30px","border":"2px solid #000"})
		ele_again.html("<p onClick='reset();' align='center' vAlign='top'>Try Again</p>");
		
		if(score > bestScore){
			bestScore = score;
		}
		ele_best.html(bestScore);
		ele_best.css({"border-bottom":"2px solid #000","border-left":"2px solid #000"});
		
		alert("Score: "+score);
		clearInterval(interval);
	}
}

function move(object,factor){
	posX = (Math.random()*factor);
	posY = (Math.random()*factor);

	object.animate({"top":posY,"left":posX},100);
	if(factor == x-clownX-clownX/2){
		score = score + clownVal*fact;
	}else{
		score = score + pepitoVal*fact;
	}
	ele_score.html(score);
}

function buy(object){
	console.log(object.getName());
	
	if(object.getCost() <= score){
		score = score-object.getCost();
		object.cost = object.getCost() * 2;
		$(object.getName()).html(object.cost+' pts');
		ele_score.html(score);
	}
	switch(object.getName()){
		case ".prixp":
			multiply(object.getCost()/2);
			break;
		case ".prixs":
			addTime(object.getCost()/2);
			break;
		case ".prixi":
			freeze(object.getCost()/2);
			break;
		case ".prixv":
			combo(object.getCost()/2);
	}
}
function byDefault(){
	fact = 1;
	$(popcorn.getName()).css({"display":"inline"});
	ele_pop.css({"display":"inline"});
}
function multiply(factor){
	fact = 2;
	$(popcorn.getName()).css({"display":"none"});
	ele_pop.css({"display":"none"});
	setTimeout(byDefault,3000*factor);
}

function addTime(time){

}

function freeze(duration){

}

function combo(param){

}


//---------------------------------------------------------------------------

function Bonus(name, cost){
	this.name = name;
	this.cost = cost;
}	
Bonus.prototype.getName = function(){
							return this.name;
						};

Bonus.prototype.getCost = function(){
							return this.cost;
						};