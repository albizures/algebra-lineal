//const Big = require('big.js');
//console.log(Big(2000));
/**
 * Matrix 
 * @desc crea una matriz
 * @param {Number} width numero de columnas
 * @param {Number} height numero de filas
 * @param {Array} map matriz por defecto
 */
function Matrix(width, height) {
  let map;
  if (Array.isArray(width)) {
    map = width;
    height = map.length;
    width = map[0].length;
  } else if (!height) {
    width = height;
  }
  this.width = width;
  this.height = height;
  if (map) {
    this.map = map;
  } else {
    this.map = [];
    for (var y = 0; y < width; y++) {
      this.map[y] = [];
      for (var x = 0; x < height; x++) {
        this.map[y][x] = null;
      }
    }
  }
}

/**
 * getDet
 * @desc retorna el determinante si es cuadrada la matriz
 * @param {Boolean} steps determina si el proceso se hace por pasos
 */
Matrix.prototype.getDet = function (steps = false) {
  if (!this.isSquare()) throw 'Matrix is not NxN';

  if (this.width === 2) {
    return this.getDet2();
  }
  if (this.width === 3) {
    return this.getDet3();
  }
  let det = 0;
  let i = 1;
  this.map[0].forEach((item, index) => {
    let newDet = (item * i) * this.getMinor(index, 0).print().getDet();
    det += newDet
    i = -i;
  });
  return det;
};

/**
 * getDet2
 * @desc retorna el determinante de funciones de 2x2
 */
Matrix.prototype.getDet2 = function () {
  return (
    this.get(0, 0) * this.get(1, 1)
  ) - (
    this.get(0, 1) * this.get(1, 0)
  );
};

/**
 * getDet3
 * @desc retorna el determinante de funciones de 3x3
 */
Matrix.prototype.getDet3 = function () {
  console.log('(',(this.get(0, 0) * this.get(1, 1) * this.get(2, 2)) , '+',
    (this.get(1, 0) * this.get(2, 1) * this.get(0, 2)), '+',
    (this.get(2, 0) * this.get(0, 1) * this.get(1, 2)), ') - (',
     (this.get(0, 2) * this.get(1, 1) * this.get(2, 0)), '+',
    (this.get(1, 2) * this.get(2, 1) * this.get(0, 0)), '+',
    (this.get(2, 2) * this.get(0, 1) * this.get(1, 0)), ')'
  );
  return (
    (this.get(0, 0) * this.get(1, 1) * this.get(2, 2)) +
    (this.get(1, 0) * this.get(2, 1) * this.get(0, 2)) +
    (this.get(2, 0) * this.get(0, 1) * this.get(1, 2))
  ) - (
    (this.get(0, 2) * this.get(1, 1) * this.get(2, 0)) +
    (this.get(1, 2) * this.get(2, 1) * this.get(0, 0)) +
    (this.get(2, 2) * this.get(0, 1) * this.get(1, 0))
  );
};

/**
 * getMinor
 * @desc retorna retorna un menorXY
 * @param {Number} x posicion en x
 * @param {Number} y posicion en y
 * @return {Matrix}
 */
Matrix.prototype.getMinor = function (x, y) {
  let minor = new Matrix(this.width - 1, this.height - 1);
  let xMinor = 0;
  let yMinor = 0;
  this.forEach(function (item, pos) {
    xMinor = pos.x;
    yMinor = pos.y;

    if (pos.x > x) {
      xMinor--;
    }
    if (pos.y > y) {
      yMinor--;
    }
    if (pos.x !== x && pos.y !== y) {
      minor.set(xMinor, yMinor, this.get(pos.x, pos.y));
    }
  });
  return minor;
}

/**
 * forEach
 * @desc recorre la matriz
 * @callback Matrix
 */
Matrix.prototype.forEach = function (each) {
  for (let x = 0; x < this.width; x++) {
    for (let y  = 0; y < this.height; y++) {
      each.call(this, this.get(x, y), {x, y});
    }
  }
}

/**
 * print
 * @desc imprime en la consola la matriz
 * @return {Matrix} retorna la funcion impresa
 */
Matrix.prototype.print = function () {
  for (var y = 0; y < this.height; y++) {
    console.log(this.map[y]);
  }
  console.log('');
  return this;
};

/**
 * get
 * @desc retorna la posiciones dada
 * @param {Number} x posicion en x
 * @param {Number} y posicion en y
 */
Matrix.prototype.get = function (x, y) {
  return this.map[y][x];
};

/**
 * set
 * @desc se settea el valor en la posicion data
 * @param {Number} x posicion en x
 * @param {Number} y posicion en y
 */
Matrix.prototype.set = function (x, y, value) {
  return this.map[y][x] = value;
};

/**
 * isSquare
 * @desc retorna verdadero si la matriz es cuadrada
 */
Matrix.prototype.isSquare = function () {
  return this.width === this.height;
};

/**
 * @desc retorna la columna indicada
 * @param {Number} x posicion de la columna
 * @return {Array} la columna indicada
 */
Matrix.prototype.getCol = function (x) {
  return this.map.map(item => item[x]);
};

/**
 * @desc retorna la fila indicada
 * @param {Number} y posicion de la fila
 * @return {Array} la fila indicada
 */
Matrix.prototype.getRow = function (y) {
  return this.map[y].map(item => item);
};

/**
 * clone
 * @desc clona la matriz actual
 * @return {Matrix} retorna la funcion impresa
 */
Matrix.prototype.clone = function () {
  map = this.map.map(row => row.map(item => item));
  return new Matrix(map);
};


/**
 * toggleCol
 * @desc cambia una columna por otra indicada
 * @param {Number} x posicion de la columna
 * @param {Array} col la nueva columna
 * @param {Boolean} isClone indicada si el cambio se hace en una matriz clonada
 * @return {Matrix} retorna la funcion impresa
 */
Matrix.prototype.toggleCol = function (x, col, isClone = true) {
  let m = isClone? this.clone() : this;
  for (var y = 0; y < this.map.length; y++) {
    m.map[y][x] = col[y];
  }
  return m;
};


Matrix.prototype.cramer = function (col) {
  if (!this.isSquare()) throw 'Matrix is not NxN';
  const D = this.getDet();
  const dets = [];

  for (var x = 0; x < this.width; x++) {
    console.log('-------------------------');
    dets.push(this.toggleCol(x, col).getDet());
  }

  return {
    D,
    d: dets,
    x: dets.map(item => item / D)
  };
};


module.exports = Matrix;