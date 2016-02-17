var Task = React.createClass({
   render: function() {
   	  var t = this.props.task;
   	  return(
   	  	<li>{t.description}
   	  	<input type="checkbox" />
   	  	{moment(t.dueDate).fromNow()}
   	  	</li>
   	  	);
   }
});

var TaskList = React.createClass({
  getInitialState: function() {
      return {
        tasks: []  
      };
  },
  componentWillMount: function() {
  	$.get('http://localhost:3000/tasks').then(function(response){
  		this.setState({tasks: response});
  	}.bind(this));      
  },
  render: function(){
  	var rows = [];
  	this.state.tasks.forEach(function(task){
  		rows.push(<Task task={task} key={task.id} />);
  	})
  	this.state
  	return(
  		<div>{rows}</div>
  		);
  }
});


ReactDOM.render(<TaskList />, document.getElementById('todo-list'));