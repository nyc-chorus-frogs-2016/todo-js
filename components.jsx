var SingleTask = React.createClass({
 render: function() {
   var t = this.props.task;
   return(
    <li>
      {t.description}
      <input type="checkbox" />
      {moment(t.dueDate).fromNow()}
      <button onClick={this.props.deleteTask}>Delete</button>
    </li>
    );
 }
});

var TaskList = React.createClass({
  loadCurrentTasks: function(){
    Task.all().then(function(response){
      this.setState({tasks: response});
    }.bind(this));
  },
  delTask: function(id) {
    console.log('del task called with', arguments);
    Task.delete(id).then(function() {
      this.loadCurrentTasks();
    }.bind(this));
  },
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentWillMount: function() {
    this.loadCurrentTasks();
  },
  render: function(){
    var rows = [];
    this.state.tasks.forEach(function(task){
      rows.push(<SingleTask deleteTask={this.delTask.bind(this, task.id)} task={task} key={task.id} />);
    }.bind(this));
    this.state
    return (
      <div>{rows}</div>
    );
  }
});

ReactDOM.render(<TaskList />, document.getElementById('todo-list'));