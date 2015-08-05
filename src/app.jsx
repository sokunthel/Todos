var React = require('react'),
    ReactFire = require('reactfire'), // is for communicating between React and data we receive back from Firebase
    Firebase = require('firebase'), // is to communicate with online data store, make the request and get the data back to the browser
    Header = require('./header'),
    List = require('./list');
var rootUrl = 'https://reactjs-todos.firebaseio.com/';

var App = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    // Whenever Firebase successfully loads data or detects a change in data, it will re-render this component "App" again
    // By using bindAsObject as the following, you can get the data by using:
    // 1. this.firebaseRefs.items
    // 2. Object "this.state.items"
    // this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
    fb = new Firebase(rootUrl + 'items/');
    this.bindAsArray(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    // this bindAsObject, this.firebaseRefs are built-in methods provided by "reactfire" plugin.
    // itemsStore={this.firebaseRefs.items} is a direct reference to Firebase object so then the Header can create new items
    // items={this.state.items} is just a plain object (data) so then List wont be able to create or modify items (data)
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded': '')}>
          <List items={this.state.items} />
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function(){
    this.setState({
      loaded: true
    })
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
