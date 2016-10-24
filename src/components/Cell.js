const React = require('react');
const TextField = require('material-ui/TextField').default;
const Divider = require('material-ui/Divider').default;

const obj = {};
const style = {
  width: 100
};

obj.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  setValue: React.PropTypes.func.isRequired
};

obj.onChange = function (evt) {
  console.log(evt.target.value);
  this.props.setValue(
    this.props.x,
    this.props.y,
    Number(evt.target.value)
  );
};

obj.displayName = 'Cell';

obj.render = function () {
  return <div className='cell'>
      <TextField 
      id={this.props.x + '-' + this.props.y}
      value={this.props.value}
      style={style}
      onChange={this.onChange}
      underlineShow={false}
    />
    <Divider />
  </div>;
};

const Cell = React.createClass(obj);

module.exports = Cell;
