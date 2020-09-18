var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var invisibleground;
var START;
var PLAY;
var gameState;
var scrollSpeed = 2;
var x1 = 0;
var x2;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bgImage = loadImage("Forest_Image.jpg");
  
  eatSound = loadSound("bananasound.mp3");
  hurtSound = loadSound("gorillasound.mp3");
  
  goImage = loadImage("go - 3.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(80, window - 10);
  monkey.addAnimation("monkey",monkey_running);  
  monkey.scale = 0.15;
  
  invisibleground = createSprite(200, height - 90,400,10);
  invisibleground.visible = false;
  
  bananaGroup = createGroup();
  stonesGroup = createGroup();
  
  monkey.setCollider("circle",0,0,180);
  monkey.debug = true;
  
  ban = createSprite(70,55)
  ban.addImage("ban",bananaImage);
  ban.scale=0.15;
  x2 = width;
  
  survaivalTime = 0;
  ban = 0;
  hurts = 3;
  
}

function draw() {
  background("green");   

  image(bgImage, x1, 0, width, height);
  image(bgImage, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(invisibleground);
  
  if(keyWentDown("space")&&monkey.y >=400){
    monkey.velocityY = -12 ;
  }
  if(monkey.isTouching(stonesGroup)) {
     hurts = hurts - 1;
     monkey.scale = monkey.scale - 0.05;
     hurtSound.play();
     stonesGroup.destroyEach();
  }
  if(monkey.isTouching(bananaGroup)) {
     monkey.scale = monkey.scale + 0.05;
     bananaGroup.destroyEach();
     ban = ban + 1;
     eatSound.play();
  }   

  Banana();
  stones();
  stroke("black");
  textSize(15);
  fill("black");
  survaivalTime = Math.ceil(frameCount/frameRate());
  text("Survaival Time:"+ survaivalTime,40,30);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("score       = "+ ban,40,70);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("Hurts = "+ hurts,40,100);
  
  if(hurts === 0) {
    go = createSprite(250,250);
    go.addImage('go',goImage);
    fill("red");
    stroke("black");
    textSize(60);
    strokeWeight(20);
    text("Game Over",width/2,height/2);
    scrollSpeed= 0;
    monkey.visible= false;
    stonesGroup.destroyEach();
    bananaGroup.destroyEach();
  }
  
  
  
 
  drawSprites();
  
}
function Banana(){
  if(World.frameCount%80===0){
    var banana=createSprite(500,Math.round(random(height/2,height/1.5))); 
    banana.addImage("banana",bananaImage);
    banana.velocityX=-6
    banana.lifetime=150;
    banana.scale=0.1;
    bananaGroup.add(banana);
  }
}
function stones(){
   if (frameCount % 100 === 0){
     var stone = createSprite(500,height - 90);
     stone.addImage("stone",obstaceImage);
     stone.scale = 0.1;
     stone.velocityX = -4;
     stone.lifetime=100;
     stonesGroup.add(stone);
  }
}