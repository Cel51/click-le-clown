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