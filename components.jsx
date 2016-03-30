var SingleTask = React.createClass({
 render: function() {
   var t = this.props.task;
   return(
    <tr>
      <td>{t.description}</td>
      <td><input type="checkbox" /></td>
      <td>{moment(t.dueDate).fromNow()}</td>
      <td><button onClick={this.props.deleteTask}>Delete</button></td>
    </tr>
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
      <div><table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Done?</th>
          <th>Due</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody></table></div>
    );
  }
});

ReactDOM.render(<TaskList />, document.getElementById('todo-list'));