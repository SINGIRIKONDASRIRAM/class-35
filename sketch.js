//CRUD 
/* C - creating the database
   R - Reading the values from database
   U - Update the database
   D - Delete the database */


var ball;

var BallPos;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();

    var BallPosref = database.ref('ball/position');
    BallPosref.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
       'x' :BallPos.x + x,
       'y' :BallPos.y + y 
    })

}


function readPosition(data){
    BallPos = data.val();
    console.log(BallPos);
    ball.x = BallPos.x;
    ball.y = BallPos.y;
}

function showError(){
    console.log("Error in reading the values");
}