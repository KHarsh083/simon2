var gamePattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var started = false;
var level=0;

$(document).keypress(function() {
    if (started===false) {
        $("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("failure");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level"+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
  

}

function playSound(name){
   var audio= new Audio("sounds/"+name+".mp3");
audio.play();
}

function animatePress(currentColour){
   
    $("#"+currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}