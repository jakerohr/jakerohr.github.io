$(document).ready (function() {

  var message, down;
  down = 1;
    
  var Player = function (n, s, a, h, c, o, d, p) {
    this.name = n;
    this.speed = s;
    this.accuracy = a;
    this.hands = h;
    this.clutch = c;
    this.openness = o;
    this.defense = d;
    this.position = p;
    this.open = " ";
    this.caught = " ";
    this.playMaker = (this.clutch * Math.floor((Math.random() * 10) + 1)) / 2 ;
    this.getOpen = function() {
      if(this.openness > Math.floor((Math.random() * 10) + 1)) {
        this.open = true;
        return this.open;
      }
    };
    this.catchPass = function() {
      if(this.hands > Math.floor((Math.random() * 10) + 1)) {
        this.caught = true;
        return this.caught;
      }
    };
  }

  var qb = new Player("Russell Wilson", 8, 7, 8, 9, 3, 2, "Quarterback");
  var r1 = new Player("Ricardo Lockette", 6, 2, 5, 4, 4, 2, "Receiver");
  var r2 = new Player("Jermaine Kearse", 6, 2, 5, 5, 4, 2, "Receiver");
  var r3 = new Player("Doug Baldwin", 6, 2, 7, 5, 5, 2, "Receiver");
  var r4 = new Player("Chris Matthews", 8, 1, 6, 8, 5, 1, "Receiver");
  var d1 = new Player("Malcom Butler", 7, 2, 7, 7, 2, 6, "Defense");
  var d2 = new Player("Darelle Revis", 7, 1, 5, 5, 2, 5, "Defense");
  var d3 = new Player("Brandon Browner", 5, 3, 6, 5, 3, 6, "Defense");
  var d4 = new Player("Devin McCourty", 7, 2, 6, 4, 2, 5, "Defense");
  
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
    //page won't load with this while loop.
  //while (down < 5) {
    $(".scoreboard").on("click", function() {
      var passedTo = new Player();
      var defender = new Player();

      console.log(passedTo.name);

      console.log(r1.getOpen(), r1.catchPass());
      console.log(r2.getOpen(), r2.catchPass());
      console.log(r3.getOpen(), r3.catchPass());
      console.log(r4.getOpen(), r4.catchPass());
      console.log(d1.getOpen(), d1.catchPass());
      console.log(d2.getOpen(), d2.catchPass());
      console.log(d3.getOpen(), d3.catchPass());
      console.log(d4.getOpen(), d4.catchPass());

      // this if statement works for the first down but the plays seem to stack on each other for subsequent plays
      if (down >= 5) {
       $(".scoreboard").text("The game is over!");
      } else {  
        transition("Down " + down + ". Seahawks have the ball on the 1-yard line! Click the Quarterback to hike.");
        $(".play-by-play").text("Down " + down  ); 
        
        $(".wilson").on("click", function() {
          if (r1.open == true) {
            passedTo = r1;
            defender = d1;
            var thrown = true;
          } else if (r2.open == true) {
            passedTo = r2;
            defender = d2;
            var thrown = true;
          } else if (r3.open == true) {
            passedTo = r3;
            defender = d3;
            var thrown = true;
          } else if (r4.open == true) {
            passedTo = r4;
            defender = d4;
            var thrown = true;
          } else {
            transition("Wilson is sacked! Click for next down.");
            down++;
            var thrown = false;
          }
          if(thrown == true) {
            transition(qb.name + " passes to " + passedTo.name + ". Gaurded by " + defender.name + ". Click on the receiver.");
            console.log(passedTo.name, defender.name);
          }

          $(".receivers").on("click", function() {    
            if (passedTo.caught == true && defender.caught != true) {
              down = 5;
              transition("TOUCHDOWN! " + passedTo.name + " makes an incredible catch over " + defender.name + "! Seattle wins!!!");  
            } else if (passedTo.caught == true && defender.caught == true) {
              if (passedTo.playMaker <= defender.playMaker) {
                transition("Incomplete. " + defender.name + " knocked it away.");
                down++;
              } else {
                down = 5;
                transition("TOUCHDOWN! " + passedTo.name + " makes an incredible catch over " + defender.name + "! Seattle wins!!!");  
              }
            } else if (passedTo.caught != true && defender.caught == true) {
              down = 5;
              transition("INTERCEPTION! " + defender.name + " picked it off! The Patriots take over on the one. And just like that it's all over for Seattle."); 
            } else if (passedTo.caught != true && defender.caught != true) { 
              transition("Incomplete. " + " Wilson just couldn't find " + passedTo.name + " on that one.");
              down++;
            }
            console.log("down is " + down);
          });
        });   
      }   
    });
  // }
});
  

