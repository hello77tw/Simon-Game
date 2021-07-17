var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];
var start = false;

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern=[];
  start = false;
  userClickedPattern=[];
  $("button").show();
}

function checkAnswer(){
  for(i=0;i<userClickedPattern.length;i++){
    if(userClickedPattern[i]!==gamePattern[i]){
      return false;
    }
  }
  return true;
}

function nextSequence(){
  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

//audio.play();
//$("."+buttonColours[randomChosenColour]).fadeOut(50).fadeIn(50);

$(".button").click(function(){
  if(start === true){
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    if(checkAnswer()){
        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function(){
            userClickedPattern=[];
            nextSequence();
          },1000);

      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass();
      },200);
      $("h1").text("Game Over, good job Kimia you got level "+level+" ,press start key to restart.");
      startOver();
    }
  }


});


$("button").click(function(event){
  if (start===false){
    nextSequence();
    start = true;
    $("button").hide();
  }
});
