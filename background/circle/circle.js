// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
function circle(){
  var circle = two.makeCircle(72, 100, 50);
  circle.fill = 'rgba(0,0,0,0)';
  two.update();
}

function rect(){
  var rect = two.makeRectangle(72, 100, 100, 100);
  rect.fill = 'rgba(0,0,0,0)';
  two.update();
}

function star(){
  var star = two.makeStar(72, 100, 25, 50, 5);
  star.fill = 'rgba(0,0,0,0)';
  two.update();
}

function line(){
  var line = two.makeLine(72, 100, 144, 200);
  two.update();
}

$('.dropright .dropdown-item.star').on('click', function(){
  star();
});

$('.dropright .dropdown-item.square').on('click', function(){
  rect();
});

$('.dropright .dropdown-item.circle').on('click', function(){
  circle();
});

$('.dropright .dropdown-item.bookmark').on('click', function(){
  line();
});

// circle();
// star();
// rect();
// line();

// The object returned has many stylable properties:
// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;

// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();

// star.stroke = 'rgb(0,0,0)';
// star.fill = 'rgba(0,0,0,0)';
// Don't forget to tell two to render everything
// to the screen
