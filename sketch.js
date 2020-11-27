//for some reason the  gameState gets stuck on wandering
//so the project is not yet complete



var pet;
var petI,petI2,dogasleep;
var database;
var milkCount,milk,milkImg;
var milkCountref;
var feed,restock;
var baseMilk
var lastfed
var x,y,a,b;
var feedTime
var gameState
var time
var dogPosition
var state
function preload()
{
  petI=loadAnimation("images/dogImg.png")
  petI2=loadAnimation("images/dogImg1.png")
  milkImg=loadImage("images/Milk.png")
  dogasleep=loadImage("images/Lazy.png")
  yardr=loadImage("images/Garden.png")
  batr=loadImage("images/Wash Room.png")
  bedr=loadImage("images/Bed Room.png")
  livr=loadImage("images/Living Room.png")
}
function setup() {
  database=firebase.database();
  createCanvas(1400, 700);
  baseMilk=20
  dog=createSprite(1200,400,30,30)
  dog.addAnimation("lazy",dogasleep)
  dog.addAnimation("sad",petI2)
  dog.addAnimation("happy",petI)
  dog.scale=0.4
 
  
  
  
  feed=createButton("Feed")
  restock=createButton("Restock Milk")
  feed.position(1000,50);
  restock.position(500,50);
  milkCountref=database.ref("Dog/milk")
  milkCountref.on("value",readCount)
 
  gameState="hungry"
}


function draw() {  
  time=hour();
  
  state=gameState;
   if(gameState="wandering"){
    if(position="yard"){jungle()}
    if(position="livingroom"){liviroom()}
    if(position="bedroom"){bdroom()}
    if(position="restroom"){bathroom()}
  }
  if(gameState!="wandering"){
  background("lightgreen")
  }
  textSize(20)
  text("food="+milkCount,1200,50)
  drawSprites();
  
  text("last feed= "+lastfed+":00",750,50)
  x=80
  y=100

  console.log(gameState)

if(time=lastfed+5){
  gameState==="hungry"
}

  if(gameState==="hungry"){
  if(milkCount!=0 ){
 
 for (var i=0;i<milkCount;i++){
  if(i%10===0){
    x=80;
    y=y+75;
  } 

  
   imageMode(CENTER)
   image(milkImg,x,y,75,75)
   x=x+50;
 }

}
}


  if(gameState="wandering"){
    dog.visible=false;
    if(time=lastfed+1){
      position="yard"
    }
    if(time=lastfed+2){
      position="bedroom"
    }
    if(time=lastfed+3){
      position="restroom"
    }
    if(time=lastfed+4){
      position="livingroom"
    }
  }

  if(gameState!="sleepy"){
  feed.mousePressed(function(){
    Eat(milkCount)
    gameState="wandering"
    lastfed=hour();
    console.log(lastfed)
    dog.changeAnimation("happy",petI)
    dog.scale=0.4
  })
}
  restock.mousePressed(function(){
    Restock(50)
    })
    if(keyDown("r")){
      Restock(50)
      }
    
    if(time<=8&&time>=16){
      gameState==="sleepy"
    }
    if (gameState==="sleepy"){
      dog.changeAnimation("lazy",dogasleep)
    }
}

function Eat(milkCount){
  if(milkCount<=0){milkCount=0}
  else{milkCount=milkCount-1}
   database.ref("Dog").update({
    milk:milkCount,
    feedTime:hour()
  })
}
function Restock(milkCount){
  database.ref("Dog").update({
    milk:milkCount
  })
}

function readCount(data){
  milkCount=data.val();
}
function readState(){
  var readState=dateabase.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val();
  })
}
function updateState(){
  database.ref('/').update({
    gameSate:state
  })
}
function bdroom(){
  background(bedr)
}
function bathroom(){
  background(batr)
}
function liviroom(){
  background(livr)
}
function jungle(){
  background(yardr)
}