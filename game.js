
/*##################### SCRIPT ##########################*/
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerClickedPattern = [];
var level = 0;
var gameOver = false;
var gameStarted = false;

setTimeout(() => { $(document).on("keyup", startGame); }, 1000);


/*##################### FUNCTIONS ##########################*/
/* Initialize the game to starting point */
function initVar(){
    gamePattern = [];
    playerClickedPattern = [];
    level = 0;
}

/* Activate button click option */
function activateButtons(){
    for (let i = 0; i < buttonColors.length; i++){
        var selectedButton = $("#"+buttonColors[i]);
        selectedButton.on('click', buttonClick);
    }
}

/* Deactivate button click option */
function deactivateButtons(){
    for (let i = 0; i < buttonColors.length; i++){
        var selectedButton = $("#"+buttonColors[i]);
        selectedButton.off('click');
    }
}

/* Start the Game */
function startGame(){
    $(document).off("keyup");
    gameOver = false; // In case of restart
    gameStarted = true;
    activateButtons(); 
    nextSequence();
}

/* Gets the next button for the game pattern */
function nextSequence(){
    if (gameOver)
        return
    $("h1").text("Level "+level);
    level++;
    randomNumber = Math.floor(Math.random() * 4);
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    buttonInteraction(randomColor);
    if (!gameStarted)
        activateButtons();
    gameStarted = false;
}

/* Handles button clicked by the player functionality */
function buttonClick(buttonEvent){
    var clickedColor = buttonEvent.target.id;
    playerClickedPattern.push(clickedColor);
    buttonInteraction(clickedColor);
    if (clickedColor != gamePattern[playerClickedPattern.length - 1]){
        endGame()
    }
    else if (playerClickedPattern.length === gamePattern.length){
        playerClickedPattern = [];
        deactivateButtons();
        setTimeout(() => { nextSequence(); }, 1000);
    }
}

/* Simulate button activation functionality */
function buttonInteraction(buttonColor){
    animatePress(buttonColor);
    playSound(buttonColor);
}

/* Play sound file */
function playSound(soundName){
    var audioFilePath = 'sounds/'+soundName+'.mp3';
    var audio = new Audio(audioFilePath);
    audio.play();
}

/* Animate button press (for both player active press and for the game pattern) */
function animatePress(buttonColor){
    var selectedButton = $("#"+buttonColor);
    selectedButton.addClass("pressed");
    setTimeout(() => { selectedButton.removeClass("pressed"); }, 100);
}

/* End game functionality*/
function endGame(){
    gameOver = true;
    $("h1").text("Game Over. Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => { $("body").removeClass("game-over"); }, 200);
    initVar();
    deactivateButtons();
    $(document).on("keyup", startGame);
}