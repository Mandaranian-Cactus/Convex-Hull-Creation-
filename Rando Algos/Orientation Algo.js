let a;
let b;
let c;

function setup() {
  createCanvas(400, 400);
  a = new Point(1, 1);
  b = new Point(3, 2);
  c = new Point(2, 3);
  print(orientation(a, b, c));
}

function draw() {
  background(220);
  circle(a.x,a.y, 20)
}

function orientation(a, b, c){  // Assumes that the segments are arranged in a --> b --> c
  // Find slope ab
  let dx = a.x - b.x; let dy = a.y - b.y;
  let ab = dy / dx;
  
  // Find slope bc;
  dx = b.x - c.x; dy = b.y - c.y;
  let bc = dy / dx;
  
  print(ab, bc)
  
  if (bc > ab) return "counter-clockwise";
  else return "clockwise";
}

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}
