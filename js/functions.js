var ele_wrap = $("#wrapper");
var ele_info = $(".infoGame");
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

var tuto_clown = $("#tutoClown");
var tuto_pepito = $("#tutoPepito");
var tuto_popcorn = $("#tutoPopcorn");
var tuto_soda = $("#tutoSoda");
var tuto_ice = $("#tutoIcecream");
var tuto_vip = $("#tutoVip");

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
var actif = 0;
var bestScore = 0;
var step = 0;

var interval;
var chances = 11;
var fact = 1;
var clownVal = 1;
var pepitoVal = 3;


function reset(){
	time = init_time;
	score = 0;
	chances = 11;
	
	byDefault("all");
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
	if(time > 0){
		time--;
		ele_time.html(time);
		
		var chapiteau = Math.floor((Math.random()*100)+1);
		if(chapiteau < chances){
			ele_pepito.css({"display":"inline"});
		}else{
			ele_pepito.css({"display":"none"});
		}
	}else{
		if (time==0) {
			$("#clown").css({"display":"none"});
			ele_pepito.css({"display":"none"});
			
			
			ele_bonus.css({"bgcolor":"#ED1C24"});
			ele_pop.css({"display":"none"});
			ele_soda.css({"display":"none"});
			ele_ice.css({"display":"none"});
			ele_vip.css({"display":"none"});
		
			$(popcorn.getName()).css({"display":"none"});
			$(soda.getName()).css({"display":"none"});
			$(icecream.getName()).css({"display":"none"});
			$(vip.getName()).css({"display":"none"});
		
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
}
function scoring(up){
	score = score + up;
	ele_score.html(score);
}
function move(object,factor){
	posX = (Math.random()*factor);
	posY = (Math.random()*factor);

	object.animate({"top":posY,"left":posX},100);
	if(factor == x-clownX-clownX/2){
		scoring(clownVal*fact);
	}else{
		scoring(pepitoVal*fact);
	}
}

function buy(object){
	console.log(object.getName());
	
	if(object.getCost() <= score){
		score = score-object.getCost();
		object.cost = object.getCost() * 2;
		$(object.getName()).html(object.cost+' pts');
		ele_score.html(score);
	
		switch(object.getName()){
			case ".prixp":
				multiply(object.getCost()/2);
				break;
			case ".prixs":
				addTime();
				break;
			case ".prixi":
				freeze(object.getCost()/2);
				break;
			case ".prixv":
				spawn(object.getCost()/2);
		}
	}
}

//fonctionsBonus
function byDefault(called){
	
	if(called == "pop"){
		fact = 1;

		$(popcorn.getName()).css({"display":"inline"});
		ele_pop.css({"display":"inline"});
	}
	
	if(called == "soda"){
		$(soda.getName()).css({"display":"inline"});
		ele_soda.css({"display":"inline"});
		
	}
	
	if(called == "vip"){
		$(vip.getName()).css({"display":"inline"});
		ele_vip.css({"display":"inline"});
	}
	
	if(called == "ice"){
		$(icecream.getName()).css({"display":"inline"});
		ele_ice.css({"display":"inline"});
		
		ele_clown.off('click');
		
		ele_clown.click(function(){
			move($(this),x-clownX-clownX/2);
		});
	}
	if(called == "all"){
		byDefault("pop");
		byDefault("soda");
		byDefault("vip");
		byDefault("ice");
	}
}

function multiply(factor){
	fact = 2;
	$(popcorn.getName()).css({"display":"none"});
	ele_pop.css({"display":"none"});
	setTimeout(function(){
		byDefault("pop");
	},3000*factor);
}

function addTime(){
	time = time+10;
	$(soda.getName()).css({"display":"none"});
	ele_soda.css({"display":"none"});
	setTimeout(function(){
		byDefault("soda");
	},10000);
}

function freeze(duration){
	//blocage du mouvement, ou réduction de la zone de déplacement
	$(icecream.getName()).css({"display":"none"});
	ele_ice.css({"display":"none"});
	
	ele_clown.off('click');
	ele_clown.click(function(){
		scoring(clownVal*fact);
	});
	setTimeout(function(){
		byDefault("ice");
	},duration*1000/3);
}
function spawn(param){
	$(vip.getName()).css({"display":"none"});
	ele_vip.css({"display":"none"});
	
	chances = chances + 10;setTimeout(function(){
		byDefault("vip");
	},10000);
}

function tuto(){
	clearInterval(interval);
	switch(step){	
		case 0:
			ele_again.css({"font-size":"30px","border":"2px solid #000"});
			ele_again.html("<p onClick='tutoInc();' align='center' vAlign='top'>Next</p>");
			
			ele_clown.css({"top":"0px","left":"0px"});
			tuto_clown.addClass('tuto');
			$(".explain").html('</br>Clickez sur le clown </br> pour gagner 1 point');
			ele_info.hide();
			break;
		case 1:
			ele_pepito.css({"display":"inline"});
			tuto_clown.animate({"left":"+=200","top":"+=100"},"fast");
			$(".explain").html('</br>Clickez sur le chapiteau </br> pour gagner 3 points');
			break;
		case 2:
			tuto_clown.css({"left":"100px","top":"0px"});
			ele_pepito.css({"display":"none"});
			tuto_clown.removeClass('tuto');
			$(".explain").html('');
			tuto_popcorn.addClass('tutofat');
			$(".explain1").html('</br></br></br>Prenez du Pop Corn</br>pour doubler</br>temporairement</br>la valeur des clics');
			break;
		case 3:
			tuto_popcorn.animate({"top":"+=200"});
			$(".explain1").html('</br></br></br>Buvez un soda pour</br>augmenter de 10</br>secondes la limite de </br>temps');
			break;
		case 4:
			tuto_popcorn.animate({"top":"+=200"});
			$(".explain1").html('</br></br></br>Prenez une glace</br>afin de stoper les</br>mouvements du clown');
			break;
		case 5:
			tuto_popcorn.animate({"top":"+=200"});
			$(".explain1").html('</br></br></br>Achetez le billet V.I.P</br>afin de voir le</br>chapiteau plus souvent');
			break;
		case 6:
			tuto_popcorn.css({"top":"0px"});
			$(".explain1").html('');
			tuto_popcorn.removeClass('tutofat');
			step = 0;
			ele_again.css({"border":"none"});
			ele_again.html('');
			ele_info.show();
			ele_info.html("<a onClick='reset()'>D&eacute;marrer le jeu</a>");
			break;
	}
}

function tutoInc(){
	step = step + 1;
	tuto();
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