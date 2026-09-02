const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}

function renderTasks() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  pendingCount.textContent = `${pending.length} Pending`;
  completedCount.textContent = `${completed.length} Completed`;

  pendingEmpty.style.display = pending.length ? "none" : "block";
  completedEmpty.style.display = completed.length ? "none" : "block";

  pending.forEach(task => pendingList.appendChild(createTaskElement(task)));
  completed.forEach(task => completedList.appendChild(createTaskElement(task)));

  saveTasks();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task ${task.completed ? "completed-task" : ""}`;

  const top = document.createElement("div");
  top.className = "task-top";

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = task.completed ? "Undo" : "Complete";

  completeBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    renderTasks();
  });

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () => {
    const updated = prompt("Edit your task:", task.text);
    if (updated && updated.trim() !== "") {
      task.text = updated.trim();
      renderTasks();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    renderTasks();
  });

  actions.append(completeBtn, editBtn, deleteBtn);
  top.append(text, actions);

  const time = document.createElement("div");
  time.className = "timestamp";

  time.textContent = task.completed
    ? `Completed: ${formatDate(task.completedAt)}`
    : `Added: ${formatDate(task.createdAt)}`;

  li.append(top, time);
  return li;
}

function addTask() {
  const value = taskInput.value.trim();

  if (!value) {
    alert("Please enter a task.");
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text: value,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  taskInput.value = "";
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();