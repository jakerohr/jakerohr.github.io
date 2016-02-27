$(document).ready (function() {

  var $players = $('.players');

  var sortSpeed = function() {
    $players.find('li').sort(function (a, b) {
        return +a.dataset.speed - +b.dataset.speed;
    })
    .appendTo( $players );
    $players.fadeIn('slow');
  };

  $("button").on("click", function() {
    $players.fadeOut('slow');
    setTimeout(function() {
      sortSpeed();
    }, 1500);
  });
});




