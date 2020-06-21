// Sketch file

// Left clicking will change v1
// Right clicking will change v2
// The cross product vector (v3) is produced through "v1 X v2"
// Since v1 and v2 are 2D vectors that are transformed into 3D vectors (by adding a 0 to the z-compnent), v3 will look like (0,0,z)
// Only the z-component is useful
// We can use the z-component to determine "the orienation of v1 and v2" (Clockwise or counterclockwise orienation) or "whether v1 or v2 is most clockwise/counter-clockwise" 

let v1;
let v2;
let v3;

function setup() {
  v1 = createVector(60, -60, 0);
  v2 = createVector(200, 10, 0);
  createCanvas(400, 400);
}

function draw() {
  translate(0, height);
  scale(1, -1);
  background(220);
  fill(255, 150, 200);
  circle(0, 0, 10);
  fill(255);
  line(0, 0, v1.x,  v1.y);
  circle(v1.x, v1.y, 10);
  line(0, 0, v2.x,  v2.y);
  circle(v2.x, v2.y, 10);
  
  let cross = crossProduct(v1, v2);
  v3 = createVector(cross[0], cross[1], cross[2]);
  // print(v3.z)
  
}

function crossProduct(v1, v2){
  let x = v1.y * v2.z - v1.z * v2.y;
  let y = v1.z * v2.x - v1.x * v2.z;
  let z = v1.x * v2.y - v1.y * v2.x;
  return [x, y, z];
}

function mousePressed(){
  let mx = mouseX; let my = height - mouseY;
  
  if (mouseButton == LEFT){ v1.x = mx; v1.y = my;} 
  else if (mouseButton == RIGHT){ v2.x = mx; v2.y = my;}
  
  let cross = crossProduct(v1, v2);
  v3 = createVector(cross[0], cross[1], cross[2]);
  print(v3.z)

}
