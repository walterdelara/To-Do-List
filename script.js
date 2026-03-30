// Disable right-click context menu
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

// Disable keyboard shortcuts for developer tools and other common shortcuts
document.addEventListener("keydown", function (e) {
  // Disable F12 (Developer Tools)
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }
  // Disable Ctrl+Shift+I (Developer Tools)
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
    return false;
  }
  // Disable Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
    return false;
  }
  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    return false;
  }
  // Disable Ctrl+S (Save)
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    return false;
  }
});

// State
let tasks = [];
let draggedItem = null;

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const statsSection = document.getElementById("statsSection");
const taskStats = document.getElementById("taskStats");
const clearCompleted = document.getElementById("clearCompleted");
const themeToggle = document.getElementById("themeToggle");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadTasks();
  render();
});

// Theme
function loadTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
});

// Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  tasks = saved ? JSON.parse(saved) : [];
}

// CRUD
function addTask(text) {
  tasks.unshift({
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) {
    el.classList.add("fade-exit");
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
    }, 200);
  }
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  saveTasks();
  render();
}

function updateTask(id, text) {
  if (text.trim()) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, text: text.trim() } : t));
    saveTasks();
  }
  render();
}

// Render
function render() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.classList.remove("hidden");
    statsSection.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  statsSection.classList.remove("hidden");

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  taskStats.textContent = `${completed} of ${total} completed`;

  clearCompleted.classList.toggle("hidden", completed === 0);

  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = `task-item fade-enter group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm`;
  div.draggable = true;
  div.dataset.id = task.id;

  div.innerHTML = `
                <div class="drag-handle cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="9" cy="6" r="1.5"/>
                        <circle cx="9" cy="12" r="1.5"/>
                        <circle cx="9" cy="18" r="1.5"/>
                        <circle cx="15" cy="6" r="1.5"/>
                        <circle cx="15" cy="12" r="1.5"/>
                        <circle cx="15" cy="18" r="1.5"/>
                    </svg>
                </div>
                
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" ${task.completed ? "checked" : ""}>
                    <div class="checkbox-ring w-5 h-5 border-2 border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center hover:border-gray-500 dark:hover:border-gray-400 transition-colors">
                        <svg class="w-3 h-3 text-white opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                </label>
                
                <span class="task-text flex-1 text-gray-700 dark:text-gray-200 ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : ""} break-words cursor-default">
                    ${escapeHtml(task.text)}
                </span>
                
                <div class="flex items-center gap-1">
                    <button class="action-btn edit-btn p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all" aria-label="Edit">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button class="action-btn delete-btn p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all" aria-label="Delete">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            `;

  // Events
  const checkbox = div.querySelector('input[type="checkbox"]');
  const editBtn = div.querySelector(".edit-btn");
  const deleteBtn = div.querySelector(".delete-btn");
  const taskText = div.querySelector(".task-text");

  checkbox.addEventListener("change", () => toggleTask(task.id));
  editBtn.addEventListener("click", () => startEdit(div, task));
  deleteBtn.addEventListener("click", () => deleteTask(task.id));
  taskText.addEventListener("dblclick", () => startEdit(div, task));

  // Drag events
  div.addEventListener("dragstart", handleDragStart);
  div.addEventListener("dragend", handleDragEnd);
  div.addEventListener("dragover", handleDragOver);
  div.addEventListener("dragleave", handleDragLeave);
  div.addEventListener("drop", handleDrop);

  return div;
}

function startEdit(element, task) {
  const textSpan = element.querySelector(".task-text");
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className =
    "flex-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border-2 border-blue-500 dark:border-blue-400 rounded-lg text-gray-800 dark:text-gray-100 focus:outline-none";
  input.maxLength = 150;

  textSpan.replaceWith(input);
  input.focus();
  input.select();

  const save = () => updateTask(task.id, input.value);

  input.addEventListener("blur", save);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      input.value = task.text;
      input.blur();
    }
  });
}

// Drag and Drop
function handleDragStart(e) {
  draggedItem = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd() {
  this.classList.remove("dragging");
  document.querySelectorAll(".task-item").forEach((item) => {
    item.classList.remove("drag-over");
  });
  draggedItem = null;
}

function handleDragOver(e) {
  e.preventDefault();
  if (this !== draggedItem) {
    this.classList.add("drag-over");
  }
}

function handleDragLeave() {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");

  if (draggedItem && draggedItem !== this) {
    const draggedId = draggedItem.dataset.id;
    const targetId = this.dataset.id;
    const draggedIdx = tasks.findIndex((t) => t.id === draggedId);
    const targetIdx = tasks.findIndex((t) => t.id === targetId);

    const [removed] = tasks.splice(draggedIdx, 1);
    tasks.splice(targetIdx, 0, removed);

    saveTasks();
    render();
  }
}

// Form
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = "";
  }
});

// Clear completed
clearCompleted.addEventListener("click", () => {
  const completedEls = Array.from(
    document.querySelectorAll(".task-item"),
  ).filter((el) => {
    const task = tasks.find((t) => t.id === el.dataset.id);
    return task && task.completed;
  });

  completedEls.forEach((el) => el.classList.add("fade-exit"));

  setTimeout(() => {
    tasks = tasks.filter((t) => !t.completed);
    saveTasks();
    render();
  }, 200);
});

// Helpers
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
