// Simple to-do list app.
// Tasks are stored in localStorage so they survive a page reload.

const STORAGE_KEY = "todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedBtn = document.getElementById("clear-completed");

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  const todos = loadTodos();
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.addEventListener("click", () => toggleTodo(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  emptyMessage.style.display = todos.length === 0 ? "block" : "none";
  clearCompletedBtn.style.display = todos.some((t) => t.done) ? "block" : "none";
}

function addTodo(text) {
  const todos = loadTodos();
  todos.push({ text, done: false });
  saveTodos(todos);
  render();
}

function toggleTodo(index) {
  const todos = loadTodos();
  todos[index].done = !todos[index].done;
  saveTodos(todos);
  render();
}

function deleteTodo(index) {
  const todos = loadTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  render();
}

function clearCompleted() {
  const todos = loadTodos().filter((t) => !t.done);
  saveTodos(todos);
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  addTodo(text);
  input.value = "";
});

clearCompletedBtn.addEventListener("click", clearCompleted);

render();
