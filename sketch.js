var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var divisions = [];
var particles = [];
var plinkos = [];
var particle;

var divisionHeight = 300;
var score = 0;
var p = "";
var count = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  textSize(20);
  text("Score : " + score, 20, 30);
  text("Tries: " + count, 20, 50);

  text("500", 20, 520);
  text("500", 100, 520);
  text("500", 180, 520);
  text("500", 260, 520);
  text("100", 340, 520);
  text("100", 420, 520);
  text("100", 500, 520);
  text("200", 580, 520);
  text("200", 660, 520);
  text("200", 740, 520);

  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  /*if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     //score++;
   }*/

  if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      p = particle.body.position.x;
      if (particle.body.position.x < 300) {
        score = score + 500;
        count=count+1;
        particle = null;
      } else if (particle.body.position.x >= 301 && particle.body.position.x < 600) {
        score = score + 100;
        count=count+1;
        particle = null;
      } else if (particle.body.position.x >= 601 && particle.body.position.x < 900) {
        score = score + 200;
        count=count+1;
        particle = null;
      }
    }
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  if(count >= 5){
    gameState = "end";
  }
  if(gameState == "end"){
    textSize(80);
    text("GAME OVER",200,400);
  }
}

function mousePressed() {
  if (gameState !== "end") {
     particle = new Particle(mouseX, 10, 10, 10);
     //count=count+1;
  }
}
