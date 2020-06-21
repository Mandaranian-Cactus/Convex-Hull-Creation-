//*********************************************************************************************
// NOTE THAT P5.JS HAS AN INVERTED COORDINATE SYSTEM BY DEFAULT HOWEVER WE BYPASSED THIS THROUGH CHANGING COORDINATE SYSTEM PROPERTIES (Note that rectangle origins are now bottom-left and not top-right)
//*********************************************************************************************

// Given a set of points, choose a point which is the primarily the lowest in terms of y and secondarily lowest in terms of x
// Using that point, determine the order of all other revolving points in counter-clockwise rotation
// Due to the nature of choosing the lowest y-coordinate point and p5.js coordinate system, we realistically are finding revolving points going up counter-clockwise from the x-axis
// In order to calculate the order of revolving points, we don't really need to actually calculate the angles but instead calculate relative z-compnent cross products
// We do this because cross product is faster to calculate than having to do trig ratios and that cross product solution is more accurate (Less rounding)

// Cross product solution
// One issue with cross product is that the z-component of the cross product doesn't increase linearily as we traverse the whole 180 degrees
// Rather, it increases until a max at 90 degrees counter-clockwise from the x-axis before decreasing to 0 past 90 degrees 
// Note that all points will be above the x-axis due to the nature of coordinate systems in programming 

let p;
let start;
let sorted;

function setup() {
  createCanvas(600, 600);
  p = [createVector(450, 100), createVector(300, 100),  createVector(100, 300), createVector(200, 200), createVector(200, 300), createVector(400, 300), createVector(10, 500)];
  sortPoints();
}

function sortPoints(){
  // Find the lowest y-coord
  start = createVector(pow(10, 10), pow(10, 10));
  for (let el of p)
    if (el.y < start.y) start = el;

  // Then find the lowest x-coord with the lowest y-coord
  for (let el of p)
    if (el.y == start.y && el.x < start.x) start = el;
  
  // Collect the z-component cross product of each point
  // We find the cross product by comparing 2 lines being the "x-axis" and "the line seg formed from the starting point to a point in the array"  
  // Values right of the starting point will increase steadily going clockwise
  // However, in order to handle the non-increasing left side (going clockwise), we use a special formula: val = (max - val) + max
  
  let maxZ = createVector(1,0,0).cross(createVector(0,1,0)).z; // Max z-component possible from unit vector cross product
  sorted = []; // Sorted points going counter clockwise from the starting point
  for (let el of p) {
    if (el != start){
      let v1 = createVector(1, 0, 0);
      let v2 = p5.Vector.sub(el, start).normalize();  // We need to normalize since magnitude affects cross product (And we want consistence)
      let z = v1.cross(v2).z;
      if (el.x < start.x){
        z = (maxZ - z) + maxZ  // This formula bypasses the non-constant growth of the z-value going counter-clockwise
        sorted.push([z, el]);
      }
      else sorted.push([z, el]);
    }
  }
  
  sorted.sort(compare);
  
  //Check if two or more points have the same angle. If two more points have the same angle, then remove all same angle points except the point farthest from starting point
  let sorted2 = [];
  for (let i = 0; i < sorted.length - 1; i++){
    // In case of collinear points, the array is already sorted so that the furthest point from the starting point is closer to the end of the sorted array
    if (sorted[i][0] != sorted[i + 1][0]) 
      sorted2.push(sorted[i]);  // Append either furthest collinear point or unique "angled" point
  }
  sorted2.push(sorted[sorted.length - 1]);  // The last element will either have a unique angle (not actually an angle) or will be the furthest point from the starting point among 2 or more points which lie on the same line. As a result, we always add the last element.
  sorted = sorted2;
  
  for (let el of sorted) print(el[1].x, el[1].y, el[0]);

  print(sorted.length);
}

function compare(a, b) { // Sort from smallest to greatest
  if (a[0] < b[0]) return -1;
  else if (a[0] > b[0]) return 1;
  else{
    // We have 2 collinear points and must sort them so that the furthest point comes after
    let d1 = dist(start.x, start.y, a[1].x, a[1].y);
    let d2 = dist(start.x, start.y, b[1].x, b[1].y);
    if (d1 < d2) return -1;
    else return 1; // d1 > d2
  }
}

function draw() {
  // ****************************************************************
  // THESE 2 LINES OF CODE CHANGES THE COORDINATE SYSTEM
  translate(0, height);  // Shift the origin to the bottom-left of the screen
  scale(1, -1)  // Inverts up and down. Now positive go up screen and negative goes down
  // ****************************************************************
  
  background(220);
  let cnt = 0;

  // Draw starting point
  fill(200, 100, 255);
  circle(start.x, start.y, 50);
  
  for (let el of p){
    if (el != start){
      fill(0);
      circle(el.x, el.y, 20);
    }
  }
  for (let el of sorted) {
    fill(255,0,0);
    text(cnt, el[1].x, el[1].y)
    cnt++;
  }
  
}

function mousePressed(){
  my = height - mouseY; mx = mouseX;
  p.push(createVector(mx, my));
  sortPoints();
}
