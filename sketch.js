//Game States
var PLAY = 1;
var END = 0;
var gameState =1;

var sword, knifeSwooshSound, swordImage;
var position,fruit,fruitImage,fruit1,fruit2,fruit3,fruit4;
var monster,monsterImage,monster1,monster2;
var gameOver,gameOverImage, gameOverSound;



function preload(){
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  
swordImage = loadImage("sword.png");
  
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 
  monster1 = loadImage("alien1.png");
  monster2 = loadImage("alien2.png");
  
  gameOverImage = loadImage("gameover.png")
  

}

function setup(){
  createCanvas(600, 600);
  
  //creating sword
  sword = createSprite(40,200,20,20)
  sword.addImage(swordImage);
  sword.scale = 0.7
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}



function draw(){
  background ( "lightblue")
  fruits();
  enemy();
  
  if(gameState === PLAY){
      sword.y = World.mouseY;
  sword.x = World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    //knifeswoosh Sound.
    knifeSwooshSound.play();
    score = score+2;
        }
      
    if(enemyGroup.isTouching(sword)){
      gameState = END
      //gameover Sound.
      gameOverSound.play();
      
    }

  }
  
     if(gameState=== END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
      sword.addImage(gameOverImage)
      sword.x = 300;
      sword.y = 300;
     }
  
  

  
  
  text("Score: "+ score, 500,50);
  drawSprites();

}

function fruits(){
  if (World.frameCount%80===0){
     position = Math.round(random(1,2));
     fruit=createSprite(600,200,20,20);
     fruit.scale= 0.2;
    
    if (position==1)
    {
    fruit.x=600;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position===2){
        fruit.x =0;
      //increase the velocity of the food.
        fruit.velocityX = (7+(score/4));
      }
    }
    
    //fruit.debug = true;
    r=Math.round(random(1,4))
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
     fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
   
    
    
    //fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addImage(monster1);
    monster.addImage(monster2);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}