var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];



function nextSequence() {
    
    userClickedPattern=[]

    level++;
    $("h1").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random() * 4); //this function generates a tandom number

    randomChosenColor = buttonColours[randomNumber]; //this chooses a random color from the array

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //adds animation to the selected id button

    playSound(randomChosenColor);
  
}

var userClickedPattern = []; //array to store the clicked colors

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id"); //as the button gets clicked we get its id in userChosenColor

    userClickedPattern.push(userChosenColour); //stores clicked buttons id into the userClickedPattern array

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {$("#" + currentColor).removeClass("pressed");}, 100);
}


var started=false;
var level=0;

$(document).keydown(function () { 
    
    if(!started){
    $("h1").text("Level "+level);

    setTimeout(function(){//this adds 2 sec delay when the game starts
         nextSequence();
    },1000);
   
    started=true;
   }
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);

            
        }
       
        }
        else{
            console.log('wrong');

            playSound("sounds/wrong.mp3");

            $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over");
            },300);

            $("h1").text("Game Over ,Press any key to Restart");

            startOver();

    } 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}