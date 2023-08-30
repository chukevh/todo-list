const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("add-item");


// Initialise list
getTasks();

todoList.addEventListener("click", function(event) {
  const target = event.target;
  if (target.classList.contains("complete-button")) {
    const listItem = target.parentNode;
    listItem.style.textDecoration = "line-through";
  } else if (target.classList.contains("remove-button")) {
    const listItem = target.parentNode;
    alert(target.parentElement.parentElement.textContent);
    //removeTasks(listItem.value);
    todoList.removeChild(listItem);
  }
});

addButton.addEventListener("click", function() {
  const task = taskInput.value.trim();
  if (task !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${task}</span>
      <button class="complete-button">Complete</button>
      <button class="remove-button">Remove</button>
      `;
      todoList.appendChild(listItem);
      storeTasks(task);
      taskInput.value = "";
      
  };
});

function storeTasks(newTask) {
  let tasks;
  const todoL = localStorage.getItem("todos")
  if(todoL === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(todoL);
  }
  tasks.push(newTask);
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function removeTasks(newTask) {
  let tasks;
  const todoL = localStorage.getItem("todos")
  if(todoL === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(todoL);
  }
  const index = tasks.indexOf(newTask);
  tasks.splice(index,1);
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  const todoL = localStorage.getItem("todos");
  if (todoL === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(todoL);
    tasks.forEach(function(task) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${task}</span>
        <button class="complete-button">Complete</button>
        <button class="remove-button">Remove</button>
        `;
        todoList.appendChild(listItem);
    });
  }
}