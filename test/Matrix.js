const test = require('ava');
const Matrix = require('../src/Matrix.js');

test('cramer', t => {
  const matriz = new Matrix([
    [1, 1,-1],
    [4, -1, 5],
    [2, 2, -3]
  ]);

  const result = matriz.cramer([7, 4, 0]);

  t.deepEqual(
    result,
    {D: 5, d: [-45, 150, 70], x: [-9, 30, 14]}
  )
});

test('toggle a column', t => {
  const map = [
    [3, 5, 2],
    [4, 2, 3],
    [-1, 2, 4],
  ];
  const m = new Matrix(map);

  t.deepEqual([
    [3, 5, 4],
    [4, 2, 7],
    [-1, 2, 9],
  ], m.toggleCol(2, [4, 7, 9]).map);

  t.deepEqual(map, m.map);

  t.deepEqual([
    [3, 5, 4],
    [4, 2, 7],
    [-1, 2, 9],
  ], m.toggleCol(2, [4, 7, 9], false).map);

  t.deepEqual([
    [3, 5, 4],
    [4, 2, 7],
    [-1, 2, 9],
  ], m.map);
});

test('get a row', t => {
  const map = [
    [3, 5, 2],
    [4, 2, 3],
    [-1, 2, 4],
  ];
  const row = new Matrix(map).getRow(0);
  t.deepEqual([3, 5, 2], row);
});

test('get a column', t => {
  const map = [
    [3, 5, 2],
    [4, 2, 3],
    [-1, 2, 4],
  ];
  const col = new Matrix(map).getCol(0);
  t.deepEqual([3, 4, -1], col);
});

test('get matrix\'s determinant of 2x2', t => {
  const map = [
    [2, 1],
    [1, 2],
  ];
  
  const det = new Matrix(map).getDet();
  t.is(3, det);
});

test('clone a matrix', t => {
  const map = [
    [2, 1, 4],
    [1, 2, 5],
    [1, 2, 6],
  ];
  let original = new Matrix(map);
  let clone = original.clone();

  t.deepEqual(original.map, clone.map);
  t.deepEqual(map, clone.map);
});

test('get matrix\'s minor of 3x3', t => {
  const map = [
    [2, 1, 4],
    [1, 2, 5],
    [1, 2, 6],
  ];
  
  let minus = new Matrix(map).getMinor(0, 0);
  t.deepEqual([[2, 5], [2, 6]], minus.map);

  minus = new Matrix(map).getMinor(2, 2);
  t.deepEqual([[2, 1], [1, 2]], minus.map);

  minus = new Matrix(map).getMinor(1, 1);
  t.deepEqual([[2, 4], [1, 6]], minus.map);
});

test('get matrix\'s determinant of 3x3', t => {
  const map = [
    [3, 5, 2],
    [4, 2, 3],
    [-1, 2, 4],
  ];
   const det = new Matrix(map).getDet();
  t.is(-69, det);
});

test('get matrix\'s minor of 4x4', t => {
  const map = [
    [2, 1, 4, 7],
    [1, 2, 5, 8],
    [1, 2, 6, 9],
    [1, 2, 6, 3],
  ];
  
  let minus = new Matrix(map).getMinor(0, 0);
  t.deepEqual([
    [2, 5, 8],
    [2, 6, 9],
    [2, 6, 3]
  ], minus.map);

  minus = new Matrix(map).getMinor(1, 1);
  t.deepEqual([
    [2, 4, 7],
    [1, 6, 9],
    [1, 6, 3],
  ], minus.map);

  minus = new Matrix(map).getMinor(2, 2);
  t.deepEqual([
    [2, 1, 7],
    [1, 2, 8],
    [1, 2, 3]
  ], minus.map);

  minus = new Matrix(map).getMinor(3, 3);
  t.deepEqual([
    [2, 1, 4],
    [1, 2, 5],
    [1, 2, 6],
  ], minus.map);
});

test('get matrix\'s determinant of 4x4',t => {
 const map = [
    [2, 1, 4, 7],
    [1, 2, 5, 8],
    [1, 2, 6, 9],
    [1, 2, 6, 3],
  ];
   const det = new Matrix(map).getDet();
  t.is(-18, det);
});
