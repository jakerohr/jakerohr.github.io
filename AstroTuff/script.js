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

// Pick a play
var play = "";
$( "#play-one" ).click(function() {
  $( "#pre-snap").attr("id", "in-n-out")
  play = "in-n-out";
  $("#title").text("In-N-Out")
});

var set = true
var goBtn = document.getElementById("go-btn");
goBtn.onclick = hikeBall

function hikeBall () {
  var qb = document.getElementById("qb");
  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var four = document.getElementById("four");
  var five = document.getElementById("five");
  var team = [qb,one,two,three,four,five];
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
      console.log("qb classes: ",qb.classList)
      goBtn.innerHTML = "Hike!";
      set = true
    }
  }

}
