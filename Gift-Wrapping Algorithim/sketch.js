// NOTE THAT THE SCRIPT HAS A LIMITATION WHERE IT CAN'T FULLY HANDLE CASES WHERE SEVERAL POINT LIE ON THE SAME LINE
// MAY BE THE FAULT OF MY CODING OR A LIMITATION OF THE GIFT-WRAPPING ALGORITHIM
// ANOTHER THING TO NOTE IS THAT P5.JS IS WEIRD IN THAT GOING DOWN IS ACTUALLY POSTIVE AND NOT NEGATIVE
// AS A RESULT OF THIS, THE ORDER OF CROSS PRODUCT NEEDS TO BE CHANGED

let p = [];
let hull = [];

function setup() {
  createCanvas(400, 400);
  
  p = [createVector(50, 50), createVector(100, 20), createVector(50, 100), createVector(100, 100), createVector(150, 50)];
  
  constructHull();
}

function leftMost(){  // Find the left most point on the screen
  let v = createVector(100000000000, 100000000000, 100000000000);
  for (let v2 of p){
    if (v.x > v2.x) v = v2;
  }
  return v;
}

function constructHull(){
  let start = leftMost();  // I'm pretty sure choosing the left most point is only a convention and that the algorithim works with any existing starting point
  let endPoint = start;  // Represents current ending point on the Hull
  
  while (true){
    hull.push(endPoint);
    let nextPoint = p[0];  // Represents a potential point that could be pushed into the hull
    for (let i = 0; i < p.length; i++){
       
      
      let d1 = p5.Vector.sub(nextPoint, endPoint);
      let d2 = p5.Vector.sub(p[i], endPoint);
      
      
      if (nextPoint == endPoint){  
        // We don't want "nextPoint == endPoint" since it creates a 0 Vector
        // This vector would result in all future cross products to be (0,0,0)
        nextPoint = p[i];
      }
      else if (crossProduct(d2, d1).z > 0){  // Note that we have to swap the d2 and d1 since p5.js doesn't follow cartesian plane rules. Specifically, going down is postive and not negative
        // Whether it is "< 0" or "> 0" would just change a clockwise rotation for finding the angle to a counter-clockwise roation
        // If the condition is met, it means that the 1st vector forms a larger clockwise angle
        nextPoint = p[i];  
      }
        
    }
    endPoint = nextPoint;
    
    if (endPoint == start) break;  // Break when we have make a wrap-around and completed the hull
  }
  for (let el of hull) print(el.x, el.y, el.z)
}

function crossProduct(v1, v2){
  let x = v1.y * v2.z - v1.z * v2.y;
  let y = v1.z * v2.x - v1.x * v2.z;
  let z = v1.x * v2.y - v1.y * v2.x;
  return createVector(x, y, z);
}

function drawHull(hull){
  for (let i = 0; i < hull.length - 1; i++){
    line(hull[i].x, hull[i].y, hull[i + 1].x, hull[i + 1].y);
  }
  line(hull[hull.length - 1].x, hull[hull.length - 1].y, hull[0].x, hull[0].y);
}

function mousePressed(){
  p.push(createVector(mouseX, mouseY));
  hull = [];
  constructHull();
}

function draw() {
  background(255)
  for (let el of p){
    circle(el.x, el.y, 10);
  }
  drawHull(hull);

}
