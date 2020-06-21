function orientation(a, b, c){ // We assume that the order is a --> b --> c
  
  let v1 = p5.Vector.sub(b, a);
  let v2 = p5.Vector.sub(c, b);
  
  // The z-component of the cross product will show orientation
  let z = v1.cross(v2).z;
  
  return z;
}
