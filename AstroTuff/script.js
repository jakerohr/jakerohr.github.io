function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
  var qb = document.getElementById("qb");
  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var four = document.getElementById("four");
  var five = document.getElementById("five");
  var ball = document.getElementById("ball");

  var team = [qb,one,two,three,four,five];
// Pick a play
var set = false
var play = "";
$( "#play-picker" ).click(function() {
  console.log($( ".pre-snap").attr("id"))
  if ($( ".pre-snap").attr("id") !== "pre-snap") {
    set = false
      for (var i = 0; i < team.length; i++) {
        addClass(team[i], "fa-circle-o")
        removeClass(team[i], "hike");
        removeClass(team[i], team[i].classList[1]);
      }
  }
  console.log(set)
  play = "";
  // $("#title").text("In-N-Out")
});
$( "#play-one" ).click(function() {
  $( ".pre-snap").attr("id", "in-n-out")
  play = "in-n-out";
  set = true
  $("#title").text("In-N-Out")
  goBtn.innerHTML = "Hike!";
});
$( "#play-two" ).click(function() {
  $( ".pre-snap").attr("id", "stop-and-go")
  play = "stop-and-go";
  set = true
  $("#title").text("Stop and Go")
  goBtn.innerHTML = "Hike!";
});
$( "#play-three" ).click(function() {
  $( ".pre-snap").attr("id", "cross-under")
  play = "cross-under";
  set = true
  $("#title").text("Cross Under")
  goBtn.innerHTML = "Hike!";
});

var goBtn = document.getElementById("go-btn");
goBtn.onclick = hikeBall

function hikeBall () {

  console.log(play);
  console.log("set: ", set);

  if (play == "") {
    $("#title").text("Please pick a play!");
  } else {
    if (set == true ) {

      for (var i = 0; i < team.length; i++) {
        addClass(team[i], "hike")
        if (play == "in-n-out") {
          addClass(team[i], "fa-child")
          removeClass(team[i], "fa-circle-o")
          addClass(five, "fa-shield")
          removeClass(five, "fa-child")
          addClass(qb, "fa-user")
          removeClass(qb, "fa-child")
        } else if (play == "stop-and-go") {
          addClass(team[i], "fa-child")
          removeClass(team[i], "fa-circle-o")
          addClass(qb, "fa-user")
          removeClass(qb, "fa-child")
        } else if (play == "cross-under") {
          addClass(team[i], "fa-shield")
          removeClass(team[i], "fa-circle-o")
          addClass(qb, "fa-user")
          removeClass(qb, "fa-shield")
          addClass(five, "fa-child")
          removeClass(five, "fa-shield")
        }
      }
      goBtn.innerHTML = "Reset";
      set = false

    } else if (set == false) {
      for (var i = 0; i < team.length; i++) {
        addClass(team[i], "fa-circle-o")
        removeClass(team[i], "hike");
        removeClass(team[i], team[i].classList[1])
      }
      console.log("set: ",set)
      goBtn.innerHTML = "Hike!";
      set = true
    }
  }

}
