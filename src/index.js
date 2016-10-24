require('./index.styl');

const injectTapEventPlugin = require('react-tap-event-plugin');
const React = require('react');
const ReactDOM = require('react-dom');
const {deepOrange500} = require('material-ui/styles/colors');
const {Tabs, Tab} = require('material-ui');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

const Matrix = require('./components/Matrix.js');

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


injectTapEventPlugin();
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const obj = {};
obj.displayName = 'App';

obj.getInitialState = function () {
  return {
    value: 'a',
  };
}

obj.handleChange = function (value) {
  this.setState({
    value: value,
  });
};

obj.render = function () {
  return <Tabs value={this.state.value} onChange={this.handleChange}>
    <Tab label="Tab A" value="a" >
      <div className='container-fluid'>
        <div className='row'>
          <h2 style={styles.headline}>Controllable Tab A</h2>
          <p>
            Tabs are also controllable if you want to programmatically pass them their values.
            This allows for more functionality in Tabs such as not
            having any Tab selected or assigning them different values.
          </p>
          <Matrix width={5} height={5} className='col-md-4'/>
        </div>
      </div>
    </Tab>
    <Tab label="Tab B" value="b">
      <div className='row'>
        <h2 style={styles.headline}>Controllable Tab B</h2>
        <p>
          This is another example of a controllable tab. Remember, if you
          use controllable Tabs, you need to give all of your tabs values or else
          you wont be able to select them.
        </p>

      </div>
    </Tab>
  </Tabs>;
};



const App = React.createClass(obj);

console.log(muiTheme);

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
  ), document.getElementById('root')
);