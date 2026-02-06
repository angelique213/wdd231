// storage.js
let tasks = [];

// localStorage helpers
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return [];
}

// UI templates + rendering
function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`;
}

function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  const html = tasks.map(taskTemplate).join("");
  listElement.innerHTML = html;
}

// task actions
function newTask() {
  const task = document.querySelector("#todo").value;

  // optional: prevent blank tasks
  if (!task.trim()) return;

  tasks.push({ detail: task, completed: false });

  // save + render
  setLocalStorage("todos", tasks);
  renderTasks(tasks);

  // optional: clear input
  document.querySelector("#todo").value = "";
}

function removeTask(taskElement) {
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector("p").innerText
  );
  taskElement.remove();
  setLocalStorage("todos", tasks);
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector("p").innerText
  );

  if (taskIndex === -1) return;

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  taskElement.classList.toggle("strike");

  setLocalStorage("todos", tasks);
}

function manageTasks(e) {
  const parent = e.target.closest("li");
  if (!parent) return;

  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  }
  if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}

// username handling
function setUserName() {
  const name = localStorage.getItem("todo-user");
  if (name) {
    document.querySelector(".user").innerText = name;
    document.querySelector("#user").value = name; // optional: show it in input too
  }
}

function userNameHandler() {
  const name = document.querySelector("#user").value;
  localStorage.setItem("todo-user", name);
  setUserName();
}

// init
function init() {
  tasks = getLocalStorage("todos");
  renderTasks(tasks);
  setUserName();
}

// event listeners
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document
  .querySelector("#userNameButton")
  .addEventListener("click", userNameHandler);

init();
