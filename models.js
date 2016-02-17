function Task(args) {
  args = args || {};
  Object.assign(this, args);
}

Task.prototype.minutesTillDue = function() {
  if (this.dueDate) {
    var dueMs = this.dueDate.getTime();
    var nowMs = new Date().getTime();
    var diff = dueMs - nowMs;
    return diff / 1000 / 60;
  } else {
    return 0;
  }
};

Task.all = function() {
  return $.ajax({
    url: 'http://localhost:3000/tasks'
  }).then(function(response) {
    return response.map(function(item){
      return new Task(item);
    });
  });
};

Task.create = function(task) {
  return $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'POST',
    data: {
      description: task.description,
      dueDate: task.dueDate,
      done: task.done || false
    },
    dataType: 'json'
  }).then(function(response){
     return new Task(response);
  });
};

Task.delete = function(id) {
  return $.ajax({
    url: 'http://localhost:3000/tasks/' + id,
    method: 'DELETE'
  });

}

Task.prototype.destroy = function() {
  return Task.delete(this.id);
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

TodoList.prototype.findTaskById = function(id) {
  var matches = this.tasks.filter(function(task){
    return task.id == id;
  });
  return matches.length ? matches[0] : undefined;
};
