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
  sorted.splice(0,0,["start",start]);  // Add the starting point as being the 1st to come in the sorted array
}

function compare(a, b) { // Sort from smallest to greatest
  if (a[0] < b[0]) return -1;
  else if (a[0] > b[0]) return 1;
  else return 0;
}
