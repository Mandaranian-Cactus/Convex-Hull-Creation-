// Black dots - Points within the hull
// Red dots - Points on the hull
// Purple dot - Starting point on hull

let p;
let start;
let sorted;
let hull;

function setup() {
  createCanvas(600, 600);
  p = [createVector(450, 100), createVector(300, 100),  createVector(100, 300), createVector(200, 200), createVector(200, 300), createVector(400, 300), createVector(10, 500)];
  hull = constructHull();
}

function constructHull(){
  sortPoints();  // Sort points in relative counter-clockwise rtation
  let stack = []; // Not really sure if arrays can replicate a stack but this will do
  stack.push(sorted[0][1], sorted[1][1], sorted[2][1]);  // Note that the firs 3 points of the sorted array should form a counter-clockwise orienation (or left turn)
  
  for (let i = 3; i < sorted.length; i++){
    let p1 = stack[stack.length - 2]; // Point before the topmost point on the stack
    let p2 = stack[stack.length - 1];  // Topmost point on the stack
    let p3 = sorted[i][1];  // Current iterating point
    let z = orientation(p1, p2, p3);
    while (z <= 0){  // Clockwise (Clockwise orientation creates a convex shape in counter-clockwise rotation) and collinear orientations (Collinear points add unnecessary repetition to the hull) are to be avoided 
      stack.pop();
      p1 = stack[stack.length - 2]; // Point before the topmost point on the stack
      p2 = stack[stack.length - 1];  // Topmost point on the stack
      p3 = sorted[i][1];  // Current iterating point
      z = orientation(p1, p2, p3);
    }
    stack.push(p3);
  }
  for (let el of stack) print(el.x, el.y);
  print(stack.length)
  return stack;
}

function draw() {
  background(220);
  // ****************************************************************
  // THESE 2 LINES OF CODE CHANGES THE COORDINATE SYSTEM
  translate(0, height);  // Shift the origin to the bottom-left of the screen
  scale(1, -1)  // Inverts up and down. Now positive go up screen and negative goes down
  // ****************************************************************
  
  // Draw starting point
  fill(200, 100, 255);
  circle(start.x, start.y, 50);
  
  for (let el of p){
    if (el != start){
      fill(0);
      circle(el.x, el.y, 20);
    }
  }
  
  // Draw the convex hull
  for (let i = 0; i < hull.length - 1; i++){ // Draw lines
    let p1 = hull[i]; let p2 = hull[i + 1]
    line(p1.x, p1.y, p2.x, p2.y);
  }
  line(start.x, start.y, hull[hull.length - 1].x, hull[hull.length - 1].y);  // Starting point to the end point on hull
  for (let el of hull){  // Draw points on hull
    fill(255,0,0);
    circle(el.x, el.y, 20);
  }
  
}

function mousePressed(){
  let mx = mouseX; let my = height - mouseY;  // Do this since we flipped-coord system along x-axis
  p.push(createVector(mx, my));
  hull = constructHull();
}
