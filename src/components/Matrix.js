const React = require('react');
const Paper = require('material-ui/Paper').default;
const Divider = require('material-ui/Divider').default;
const TextField = require('material-ui/TextField').default;
const Cell = require('./Cell.js');
const classNames = require('classnames');
const MatrixType = require('../Matrix.js');
const obj = {};

obj.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

const style = {
  marginLeft: 20,
};

obj.displayName = 'Matrix';

obj.getInitialState = function () {
  this.matrix = new MatrixType(
    this.props.width,
    this.props.height
  );
  return {version: 0};
};

obj.setValue = function (x, y, value) {
  this.matrix.set(x, y, value);
  this.setState({
    version: this.state.version ++
  });
};

obj.getInputs = function () {
  let inputs = [];
  this.matrix.forEach((value, pos) => {
    console.log(value, pos);
    inputs.push(
      <Cell key={`${pos.x}-${pos.y}`} x={pos.x} y={pos.y} value={value} setValue={this.setValue}/>
    );
  });
  return inputs;
};

obj.render = function () {
  let style = {
    width: this.props.width * 100 + 30
  }
  return <Paper zDepth={2} style={style} className={classNames('row matrix', this.props.className)}>
    {this.getInputs()}
  </Paper>;
    // <div className='col-md-4'>
    //   <Cell x={0} y={0} value={10} setValue={()=> {}} />
    //   <TextField hintText="Middle name" style={style} underlineShow={false} />
    //   <Divider />
    //   <TextField hintText="Last name" style={style} underlineShow={false} />
    // </div>
    // <div className='col-md-4'>
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    // </div>
    // <div className='col-md-4'>
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    //   <TextField hintText="Email address" style={style} underlineShow={false} />
    //   <Divider />
    // </div>
};

const Matrix = React.createClass(obj);

module.exports = Matrix;