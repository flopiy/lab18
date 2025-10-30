const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const DEFAULT_TODOS = [
  { id: 1, text: 'Вивчити HTML',        done: true },
  { id: 2, text: 'Вивчити CSS',         done: true },
  { id: 3, text: 'Вивчити JavaScript',  done: false }
];

function saveTodos() {
  localStorage.setItem('todoApp', JSON.stringify(todos));
}
function loadTodos() {
  try {
    const raw = localStorage.getItem('todoApp');
    if (!raw) {
      localStorage.setItem('todoApp', JSON.stringify(DEFAULT_TODOS));
      return DEFAULT_TODOS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_TODOS;
  }
}

let todos = loadTodos();


function renderTodo({ id, text, done }) {
  const checked = done ? 'checked' : '';
  const spanClass = done ? 'text-success text-decoration-line-through' : '';
  return `
    <li class="list-group-item" data-id="${id}">
      <input type="checkbox" class="form-check-input me-2" ${checked}
             onchange="toggleTodo(${id})">
      <label><span class="${spanClass}">${text}</span></label>
      <button class="btn btn-danger btn-sm float-end"
              onclick="deleteTodo(${id})">delete</button>
    </li>`;
}

function render(arr) {
  list.innerHTML = arr.map(renderTodo).join('');
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(t => !t.done).length;
}

function newTodo() {
  const text = prompt('Нове завдання:');
  if (!text || !text.trim()) return;
  todos.push({ id: Date.now(), text: text.trim(), done: false });
  saveTodos(); render(todos); updateCounter();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos(); render(todos); updateCounter();
}

function toggleTodo(id) {
  const task = todos.find(t => t.id === id);
  if (task) task.done = !task.done;
  saveTodos(); render(todos); updateCounter();
}

document.addEventListener('DOMContentLoaded', () => {
  render(todos);
  updateCounter();
});