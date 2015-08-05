var React = require('react'),
    ListItem = require('./list-item');

module.exports = React.createClass({
  renderList: function(){
    if (this.props.items && Object.keys(this.props.items).length === 0) {
      return <h4>Add a todo to get started.</h4>
    } else {
      var children = [];
      for (var key in this.props.items) {
        var item = this.props.items[key];
        item.key = this.props.items[key]['.key'];
        children.push(
          <ListItem
            item={item}
            key={key}
          />
        );
      }
      return children;
    }
  },
  render: function(){
    return <div>
      {this.renderList()}
    </div>
  },
});
