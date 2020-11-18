var bananaImage, obstacleImage, backgroundImage, backdrop, score, player_running_images, player_running, invisible_ground


function preload(){
  backgroundImage = loadImage("jungle.jpg");
  player_running_images = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup(){
  
  createCanvas(600, 400);
  
  backdrop = createSprite(300,200,600,400);
  backdrop.addImage(backgroundImage);
  backdrop.velocityX = -5;
  player_running = createSprite(50,355,10,10);
  player_running.addAnimation("running",player_running_images);
  player_running.scale = 0.125;
  
  invisible_ground = createSprite(300,380,600,10);
  invisible_ground.visible = false;
  score = 0;

  food_group = new Group();
  obstacle_group = new Group();
  
}
function draw() {
  
  background("white");
  drawSprites();
  
  if (backdrop.x < 100){
    backdrop.x = backdrop.width/2;
  }
  foodGroup();
  obstacleGroup();
  
  
  if (keyDown("space") && player_running.collide(invisible_ground))
    player_running.velocityY = -17;
  
  player_running.velocityY = player_running.velocityY + 0.8;
  player_running.collide(invisible_ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 450,50)
  
  for(var i=0; i< food_group.length; i++){
    if (food_group.get(i).collide(player_running)){
      score = score + 2;
      food_group.get(i).destroy() } 
  }
}
function foodGroup(){
  if (frameCount % 60 === 0){
  var food = createSprite(600,220,10,10);
  food_group.add(food);
  food.addImage(bananaImage);
  food.scale = 0.05;
  food.velocityX = -5;
  food.lifetime = 130;
    if (food_group.isTouching(player_running)){
    score = score + 2;
    
}
}
}

function obstacleGroup(){
  if (frameCount % 120 === 0){
    var obstacle = createSprite(600,350,10,10);
    obstacle_group.add(obstacle)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 130;
    if (obstacle_group.isTouching(player_running)){
      player_running.scale = 0.125;
}
}
}