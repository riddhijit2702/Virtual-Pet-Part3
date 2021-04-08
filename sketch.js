//Create variables here
var dog,dogImg,happyDogImg,foodS,foodStock,milkImg;
var readState,gameState="hungry";
var nameOfDog;
var bedroomImg,gardenImg,washroomImg,sadDogImg;
var database
var count=2;
var feed,lastFed,presentTime;
var hr;

function preload()
{
  happyDogImg=loadImage("Dog .png")
  dogImg=loadImage("happydog .png")
  milkImg=loadImage("Milk.png")
  bedroomImg=loadImage("Bed Room.png")
  gardenImg=loadImage("Garden.png")
  sadDogImg=loadImage("deadDog.png")
	//load images here
}

function setup() {

  createCanvas(500,500);
  database = firebase.database();
 foodObj=new food();
  //Create an object of Food Class

  

 foodStock=database.ref('Food')
 foodStock.on("value",readStock)

 dog=createSprite(250,400)
dog.addImage(dogImg)
dog.scale=0.20;

nameDog=createInput("Oscar")
nameDog.position(600,120)

//The 2 buttons should be Feed Dog and Add Food
//Last Fed time is just text not a button

//There should be 2 mousepressed event(call functions) 1 for Add Food(addFood---function name(addFoods)) and One for feed dog(feedDog---function name(writestock))



feed=createButton("Feed Your Dog")
feed.position(600,95)
feed.style('cursor','pointer')
feed.mousePressed(feedDog)

addFood=createButton("Add Food")
addFood.position(720,95)
addFood.style('cursor','pointer')
addFood.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87); 
hr=hour()
foodObj.display();


textSize(18)
fill('red')
updateName(name)
  dog.name = nameDog.value();
  text("Name of Your Dog:  "+dog.name,40,30)



if(foodStock===0){
  gameState="hungry";
}


readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val(); 
  })
  
  nameofDog=database.ref('name')
  nameofDog.on("value",function(data){
    //gameState=data.val(); 
  })


  fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){ 
     lastFed=data.val(); 
    });
  
  fill(255,255,254);
   textSize(15);

    if(lastFed>=12){
       text("Last Fed : "+ lastFed%12 + " PM", 350,30);
       }else if(lastFed==0){ 
         text("Last Fed : 12 AM",350,30);
       }else{ 
         text("Last Fed : "+ lastFed + " AM", 350,30); 
      } 
 
      if(gameState!=="hungry")
      {
        feed.hide();  
        addFood.hide();
        dog.visible=false;
      }
      else{
        feed.show();
    addFood.show();
    dog.visible=true;
      }
      if(presentTime==(lastFed+1))
      {
        update("playing")
        foodObj.garden();
        console.log(background);
      }
      else if(presentTime==(lastFed+2))
      {
        update("sleeping");
        foodObj.bedroom()
        console.log(background);
      }
      else if(presentTime>(lastFed+2)&&presentTime<=(lastFed+4))
      {
        update("bathing");
        foodObj.washroom();
       // console.log(background);
      }
      else{
        update("hungry");
        foodObj.display();
        
        dog.addImage(happyDogImg);
       // console.log(background);
      }
presentTime=hour()

  drawSprites();
 text(mouseX+","+mouseY,mouseX,mouseY)
}

//function to read food Stock 
function readStock(data){ 
  foodS=data.val();
   foodObj.updateFoodStock(foodS);
   } //function to update food stock and last fed time
 function feedDog(){ 
   dog.addImage(happyDogImg); 
  foodObj.updateFoodStock
  (foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(), 
    FeedTime:hour() 
  }) 
} //function to add food in stock
 function addFoods(){ 
   foodS++;
    database.ref('/').update(
      { Food:foodS }
      )

    }
    function update(state)
    {
      database.ref("/").update({
        gameState:state
      })
    }
    function updateName(name){
      database.ref("/").update({
        nameOfDog:name
      })
    }
//function to add food in stock


//function to update food stock and last fed time(use hour()) in database 
//add happy dog image
//Call updateFoodStock(foodS) from Food Class to update value in the class using getFoodStock()
//foodObj.updateFoodStock(foodObj.getFoodStock()-1);

/*function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  Food:x
})
}*/