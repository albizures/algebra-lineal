//require('./index.styl');
const Matrix = require('./Matrix');

map = [
  [2, -1,  1, -4],
  [7,  2,  9, -1],
  [3, -1,  1,  1],
  [1,  1, -4, -2]
];

console.log(new Matrix(map).cramer([-32, 14, 11, -4]));