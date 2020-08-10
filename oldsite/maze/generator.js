var app = angular.module('generator',[]);

canvas = document.getElementById("canvas");
content = canvas.getContext("2d");


app.controller('mazeController',function(){
	this.graph = [];
	this.walls = [];
	this.visited = [];
	this.solution = [];
	this.path = [];
	this.showMaze = false;
	this.n = 20; //maze size
	
	
	this.initMaze = function(){
		var n = this.n;
		if(n > 50){	return;}
		if(n == 42.32){alert("Cheat");}
		this.graph = [];
		this.walls = [];
		this.visited = [];
		this.solution = [];
		this.path = [];
		for(var i = 0;i<n*n;i++){
			this.graph.push([]);
			this.walls.push([]);
			this.visited.push(0);
			this.solution.push(0);
		}
		for(var i = 0;i<n*n;i++){
			if(i%n != n-1){
				this.graph[i].push(i+1);
				this.graph[i+1].push(i);
				console.log("edge "+i+" "+(i+1));// !!!!!!!
			}
			if(i/n < n-1){
				this.graph[i].push(i+n);
				this.graph[i+n].push(i);
				console.log("edge "+i+" "+(i+n));// !!!!!!!
			}
		}
		for(var i = 0;i<n*n;i++){
			this.graph[i].sort(function() {return .5 - Math.random();}); // shuffle neighboors of every cell
		} 
		this.solution[n*n-1] = 1;
		this.path.push(n*n-1);
		this.generateMaze(0,0); // 0 is startCell
		this.draw(false);
		this.showMaze = true;
	};
	
	this.generateMaze=function(u,papa){
		this.visited[u] = 1;
		for(var i=0;i<this.graph[u].length;i++){
			var v = this.graph[u][i];
			if(this.visited[v] == 0){
				this.generateMaze(v,u);
				if(this.solution[v] == 1){
					this.solution[u] = 1;
					this.path.push(u);
				}
			}
			else{
				if(v != papa){
					this.walls[u].push(v);
					this.walls[v].push(u);
					console.log("wall "+u+" "+v); // !!!!!
				}
			}
		}	
	};
	
	this.draw=function(solve){
		var n = this.n;
		content.strokeStyle = '#000000';
		content.clearRect(0,0,n*15,n*15);
		content.strokeRect(0,0,n*15-1,n*15-1);
		for(var i = 0;i<n;i++){
			for(var j = 0;j<n;j++){
				for(var k = 0;k<this.walls[i*n+j].length;k++){
					var v = this.walls[i*n+j][k];
					if(v == i*n+j+1){
						content.beginPath();
						content.strokeColor = "#000000";
						content.moveTo((j+1)*15,i*15);
						content.lineTo((j+1)*15,(i+1)*15);
						content.stroke();
					}
					else if(v == (i+1)*n+j){
						content.beginPath();
						content.strokeColor = "#000000";
						content.moveTo(j*15,(i+1)*15);
						content.lineTo((j+1)*15,(i+1)*15);
						content.stroke();
					}
				}
			}
		}
		content.fillStyle = '#ff0000';
		content.fillRect(5,5,5,5);
		content.fillRect((n-1)*15+5,(n-1)*15+5,5,5);
		if(solve){
			for(var i = 1;i < this.path.length;i++){
			content.beginPath();
			content.strokeStyle = '#ff0000';
			var point = this.path[i];
			var pointb = this.path[i-1];
			content.moveTo(pointb%n*15+7,Math.floor(pointb/n)*15+7);
			content.lineTo(point%n*15+7,Math.floor(point/n)*15+7);
			content.stroke();
		}
		}
	};
});
