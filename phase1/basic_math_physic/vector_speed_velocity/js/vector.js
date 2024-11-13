"use strict";

export class vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static addVectors(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
  }

  static subtractVectors(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
  }

  static multiplyVector(v, scalar) {
    return { x: v.x * scalar, y: v.y * scalar };
  }

  magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  normalize(v) {
    let mag = magnitude(v);
    return { x: v.x / mag, y: v.y / mag };
  }
  
}
