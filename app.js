/*
   For this morning we are not going to worry about 
   namespacing or separate files or any of that shizzle.
   Normally we would of course.
*/
function Task(args) {
  args = args || {};
  this.description = args.description;
  this.done = args.done;
  this.dueDate = args.dueDate;
}

Task.prototype.minutesTillDue = function() {
  var dueMs = this.dueDate.getTime();
  var nowMs = new Date().getTime();
  var diff = dueMs - nowMs;
  return diff / 1000 / 60;
};

function TodoList(tasks) {
  this.tasks = tasks || [];
}

TodoList.prototype.addTask = function(task) {
  this.tasks.push(task);
};

TodoList.prototype.removeTask = function(task) {
  this.tasks = this.tasks.filter(function(item) {
    return item != task;
  });
};

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
};

View.prototype.drawTodoList = function(todoList) {
  var html = '<ul>';
  todoList.tasks.forEach(function(task){
    html += '<li>' + task.description ;
    html += '<input type="checkbox" '   + (task.done ? ' checked ' : '') +  ' /> ';
    html += 'due at  ' + moment(task.dueDate).fromNow();
    html += '</li>';
  });
  html += '</ul>';
  this.displayElement.innerHTML = html;
};

function Controller(todoList, view) {
   this.todoList = todoList;
   this.view = view;
}

Controller.prototype.addTask = function(description) {
  var newTask = new Task({description: description});
  this.todoList.addTask(newTask);
  this.view.drawTodoList(this.todoList);
};

// Our document ready just sets up our components
document.addEventListener('DOMContentLoaded', function(){
  todoList = new TodoList();
  view = new View();
  ctrl = new Controller(todoList, view);
  view.ctrl = ctrl;
  view.drawTodoList(todoList);
});


