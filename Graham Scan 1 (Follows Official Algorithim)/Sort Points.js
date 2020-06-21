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
  
  //Check if two or more points have the same angle. If two more points have the same angle, then remove all same angle points except the point farthest from starting point
  let sorted2 = [];
  for (let i = 0; i < sorted.length - 1; i++){
    // In case of collinear points, the array is already sorted so that the furthest point from the starting point is closer to the end of the sorted array
    if (sorted[i][0] != sorted[i + 1][0]) 
      sorted2.push(sorted[i]);  // Append either furthest collinear point or unique "angled" point
  }
  sorted2.push(sorted[sorted.length - 1]);  // The last element will either have a unique angle (not actually an angle) or will be the furthest point from the starting point among 2 or more points which lie on the same line. As a result, we always add the last element.
  sorted = sorted2;
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
