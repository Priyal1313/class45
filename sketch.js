var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletSound;
var zombieImg;
var zombieGroup;
var bullet,bulletGroup;
var life=3;
var bullets=50;
var score =0;

function preload(){
  
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")
zombieImg = loadImage ("zombie.png")
  bgImg = loadImage("bg.jpeg")
bulletSound = loadSound("explosion.mp3")
lost  = loadSound("lose.mp3")
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

zombieGroup = new Group();
bulletGroup = new Group();
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
 bullet=createSprite(50,player.y-30,20,10);
 bullet.velocityX = 50;
 bulletGroup.add(bullet);
 bullets = bullets-1;
  player.addImage(shooter_shooting)
 bulletSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){

  player.addImage(shooterImg)
}
//to destroy the zombie when bullet touches the zombie
if(zombieGroup.isTouching(bulletGroup)){
for(var i = 0;i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy()
bulletGroup.destroyEach()
bulletSound.play()
score=score+1
}
}
}
//to destroy zombie when zombie touches the player
if(zombieGroup.isTouching(player)){
lost.play();
for(var i = 0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
  life = life-1;
  }
}
}
spawnZombies()

drawSprites();
textSize(20);
fill("white");
text("Bullets= "+bullets,displayWidth-200,50);
text("Score= "+score,displayWidth-200,100);
text("Lives= "+life,displayWidth-200,150);
}


function spawnZombies(){
  if(frameCount%100==0){
var zombie = createSprite(width,Math.round(random(50,height-50)),50,100);
zombie.addImage(zombieImg);
zombie.scale = 0.1;
zombie.velocityX=-3;
zombie.lifetime=400;
zombieGroup.add(zombie)

}




}



