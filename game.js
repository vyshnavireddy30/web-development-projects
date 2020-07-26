var userClickedPattern = []
var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0
var buttonPress


$(document).keypress(function() {
  userClickedPattern = []
  gamePattern = []
  level = 0
  nextColor()
})

function nextColor() {
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
  var sound = new Audio('sounds/' + randomChosenColour + '.mp3');
  sound.play()
  buttonPress = 0
  level = level + 1
  userClickedPattern = []
  $("h1").text("Level " + level)
}


$('.btn').click(function(event) {
  buttonPress = buttonPress + 1
  var userChosenColour = event.currentTarget.classList[1]
  animateButton (userChosenColour)
  userClickedPattern.push(userChosenColour)
  var sound = new Audio('sounds/' + userChosenColour + '.mp3');
  sound.play()
  if (check()) {
    if (buttonPress == level) {
      setTimeout(function() {
        nextColor();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, press any key to Restart !")
  }
})


function check() {
  var n = 0
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      n = n + 1
    } else {
      setTimeout(function() {
        var sound = new Audio('sounds/wrong.mp3');
        sound.play()
        return false
      }, 200);
      $("body").addClass("game-over")
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

    }
  }
  if (n == userClickedPattern.length) {
    return true
  }
}

function animateButton (color) {
  $("#" + color).addClass("pressed")
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 50);
}
