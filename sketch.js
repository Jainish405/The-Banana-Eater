var backgr,backImage
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var gameOver;
var score=0;

function preload(){
  
  backImage=loadImage("jungleImage.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   
 
}



function setup() {
  createCanvas(400,400);
  
var score=0;
  
  backgr=createSprite(0,0,400,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey=createSprite(40,360,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;

  ground = createSprite(40,360,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
 
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}


function draw() {

    background("255");
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.16;
                break;
        case 20: monkey.scale=0.18;
                break;
        case 30: monkey.scale=0.20;
                break;
        case 40: monkey.scale=0.22;
                break;
    }
  
   if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);  
  
    spawnFood();
  
    spawnObstacles();
  
  if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     // score=score-2;
    }
 
   drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 150,50); 
  
  
  

  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    backgr.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
      
 }
  
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    banana.addImage(bananaImage);
    banana.scale=0.07;
    
     FoodGroup.add(banana);
  }
}
    
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
        
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}





