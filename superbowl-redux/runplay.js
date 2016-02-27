$(document).ready (function() {

  var message, down;
  down = 1;
  var openPlayers = [];
  var game = "on"
  var passedTo = "";
  var Player = function (n, s, a, h, c, o, d, p, m) {
    this.name = n;
    this.speed = s;
    this.accuracy = a;
    this.hands = h;
    this.clutch = c;
    this.openness = o;
    this.defense = d;
    this.position = p;
    this.matchup = m;
    this.open = false;
    this.caught = false;
    this.playMaker = (this.clutch * Math.floor((Math.random() * 10) + 1)) / 2 ;
    this.getOpen = function() {
      if(this.openness > Math.floor((Math.random() * 10) + 1)) {
        this.open = true;
        // return this.open;
      }
    };
    this.catchPass = function() {
      if(this.hands > Math.floor((Math.random() * 10) + 1)) {
        this.caught = true;
        // return this.caught;
      }
    };
  }

  qb = new Player("Russell Wilson", 8, 7, 8, 9, 3, 2, "Quarterback");
  r1 = new Player("Ricardo Lockette", 5, 2, 5, 4, 4, 2, "Receiver");
  r2 = new Player("Jermaine Kearse", 4, 2, 5, 5, 4, 2, "Receiver");
  r3 = new Player("Doug Baldwin", 6, 2, 7, 5, 5, 2, "Receiver");
  r4 = new Player("Chris Matthews", 9, 1, 6, 8, 5, 1, "Receiver");
  d1 = new Player("Malcom Butler", 7, 2, 7, 7, 2, 6, "Defense");
  d2 = new Player("Darelle Revis", 3, 1, 5, 5, 2, 5, "Defense");
  d3 = new Player("Brandon Browner", 5, 3, 6, 5, 3, 6, "Defense");
  d4 = new Player("Devin McCourty", 7, 2, 6, 4, 2, 5, "Defense");

  var receivers = [r1,r2,r3,r4];
  var defenders = [d1,d2,d3,d4];

  // assigning matchups
  for (var i = 0; i < receivers.length; i++) {
    receivers[i].matchup = defenders[i];
    defenders[i].matchup = receivers[i];
  }


  // setting scoreboard
  $("figcaption").hide();
  $("li").hover(
    function() {
    $(this).find("figcaption").slideToggle(1000);
  }, function() {
    $(this).find("figcaption").slideToggle(1000);
  });

  function transition (message) {
    $(".scoreboard").animate({
      opacity: 0
    }, 00);
    $(".scoreboard").text(message);
    $(".scoreboard").animate({
      opacity: 1
    }, 1500);
  };

    // determining open receivers
  var runRoute = function() {
    var defender = new Player();

    for (var i = 0; i < receivers.length; i++) {
      receivers[i].getOpen();
      console.log(receivers[i].open);
      if (receivers[i].open == true) {
        openPlayers.push(receivers[i]);
      }
    }

    transition("Down " + down + ". Seahawks have the ball on the 1-yard line! Click the Quarterback to hike.");
    if (down <= 4) {
      $(".play-by-play").text("Down " + down );
    }
  }
  $(".scoreboard").on("click", function() {
    console.log(game)
    if (game == "on") {
      runRoute();
    } else if (game == false) {
      game = "reset";
      $(".scoreboard").text("The game is over! Click here to start over");
    } else if (game == "reset") {
      reset();
    }
  });

  // passing the ball
  $(".wilson").on("click", function() {
    if (game) {
      if (openPlayers.length) {
        passedTo = openPlayers[Math.floor(Math.random()*openPlayers.length)];
        defender = passedTo.matchup

        console.log("passes to: ", passedTo.name);
        console.log("defended by: ",passedTo.matchup.name);
        transition(qb.name + " passes to " + passedTo.name + ". Gaurded by " + passedTo.matchup.name + ". Click on the receiver.");

      } else {
        transition("Wilson is sacked! Click for next down.");
        down++;
      }
    }
  });


  // checking for reception
  $('.receivers > li').on("click", function(event) {
    var name = $(this).children('figcaption').text()
    if (name == passedTo.name) {
      passedTo.catchPass();
      defender.catchPass();
      if (passedTo.caught == true && defender.caught != true) {
        down = 5;
        transition("TOUCHDOWN! " + passedTo.name + " makes an incredible catch over " + defender.name + "! Seattle wins!!!");
      } else if (passedTo.caught == true && defender.caught == true) {
        if (passedTo.playMaker <= defender.playMaker) {
          transition("Incomplete. " + defender.name + " knocked it away. Click here for next down.");
          down++;
        } else {
          down = 5;
          transition("TOUCHDOWN! " + passedTo.name + " makes an incredible catch over " + defender.name + "! Seattle wins!!!");
        }
      } else if (passedTo.caught != true && defender.caught == true) {
        down = 5;
        transition("INTERCEPTION! " + defender.name + " picked it off! The Patriots take over on the one. And just like that it's all over for Seattle.");
      } else if (passedTo.caught != true && defender.caught != true) {
        transition("Incomplete. " + " Wilson just couldn't find " + passedTo.name + " on that one. Click here to try again.");
        down++;

      }




    console.log("down is " + down);
    }
    checkDown();
    clearPlayers();
  });

  var checkDown = function () {
    if (down >= 5) {
     game = false;
    }
  }
  var clearPlayers = function () {
    passedTo = "";
    openPlayers = [];
    console.log("open ",openPlayers)
  }
  var reset = function () {
    clearPlayers();
    down = 1;
    game = "on";
  }
});


