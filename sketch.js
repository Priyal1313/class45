var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletSound;
var zombieImg;
function preload(){
  
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")
zombieImg = loadImage ("zombie.png")
  bgImg = loadImage("bg.jpeg")
bulletSound = loadSound("explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
console.log(frameCount);

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bulletSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies()

drawSprites();

}


function spawnZombies(){
  if(frameCount%100==0){
var zombie = createSprite(width,Math.round(random(50,height-50)),50,100);
zombie.addImage(zombieImg);
zombie.scale = 0.1;
zombie.velocityX=-3;



}




}



