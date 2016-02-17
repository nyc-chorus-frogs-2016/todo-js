/*
   For this morning we are not going to worry about
   namespacing or separate files or any of that shizzle.
   Normally we would of course.
*/
function View() {
  this.displayElement = document.getElementById('todo-list');
  this.button = document.getElementById('save-todo');
  this.input = document.getElementById('description');
  this.setupEventHandling();
}

View.prototype.setupEventHandling = function() {
  this.button.addEventListener('click', function() {
    console.log('click');
    console.log(this);
    this.ctrl.addTask(this.input.value);
  }.bind(this));

  $(document).on('click', '.delete', function(event){
    var id = event.target.dataset.id;
    this.ctrl.deleteTask(id);
  }.bind(this));
};

View.prototype.drawTodoList = function(todoList) {
  var html = '<ul>';
  todoList.tasks.forEach(function(task){
    html += '<li>' + task.description ;
    html += '<input type="checkbox" '   + (task.done ? ' checked ' : '') +  ' /> ';
    html += 'due at  ' + moment(task.dueDate).fromNow();
    html += '<button class="delete" data-id="' + task.id + '"' + ' data-blah="x">Delete</button>';
    html += ' </li>';
  });
  html += '</ul>';
  this.displayElement.innerHTML = html;
};

function Controller(todoList, view) {
   this.todoList = todoList;
   this.view = view;
}

Controller.prototype.addTask = function(description) {
  console.log('controller add task called');
  var inFiveHours = new Date( new Date().getTime() + 5 * 60 * 60 * 1000  );
  var newTask = new Task({description: description, dueDate: inFiveHours.toISOString()});
  var dfd = Task.create(newTask);
  dfd.then(function(savedTask) {
    this.todoList.addTask(savedTask);
    console.log('saved', savedTask);
    this.view.drawTodoList(this.todoList);
  }.bind(this));
};

Controller.prototype.deleteTask = function(id) {
  console.log('deleting', id);
  var task = this.todoList.findTaskById(id);
  console.log('task', task);
  if (task) {
    console.log(task);
    task.destroy().then(function(){
      this.todoList.removeTask(task);
      this.view.drawTodoList(this.todoList);
    }.bind(this));
  }
};

Controller.prototype.index = function() {
  Task.all().then(function(arrayOfTasks) {
    console.log(this);
    this.todoList.tasks = arrayOfTasks;
    this.view.drawTodoList(this.todoList);
  }.bind());
};

// Our document ready just sets up our components
document.addEventListener('DOMContentLoaded', function(){
  todoList = new TodoList();
  view = new View();
  ctrl = new Controller(todoList, view);
  view.ctrl = ctrl;
  ctrl.index();
});


