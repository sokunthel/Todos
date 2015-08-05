var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      todoText: ''
    }
  },
  render: function() {
    return <div className="input-group">
      <input
        value={this.state.todoText}
        onChange={this.handleInputChange}
        type="text"
        className="form-control" />
      <span className="input-group-btn">
        <button
          onClick={this.handleClick}
          className="btn btn-default"
          type="button">
          Add
        </button>
      </span>
    </div>
  },
  handleClick: function() {
    this.props.itemsStore.push({
      text: this.state.todoText,
      done: false
    });

    this.setState({todoText: ''});
  },
  handleInputChange: function(event) {
    this.setState({todoText: event.target.value});
  }
});