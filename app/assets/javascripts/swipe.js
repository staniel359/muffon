document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
    if ( xDiff > 0 ) {
      $('#sidebar').css('width', '0px')
    } else {
      $('#sidebar').css('width', '240px')
    }
  }
  xDown = null;
  yDown = null;
};