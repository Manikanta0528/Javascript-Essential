// Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = [];

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // <-- value, not ariaValueMax
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false }); // ensure completed exists
        taskInput.value = "";
        displayTasks();
    }
}

// Render tasks
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Use template literal properly and set checked if completed
        li.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}/>
            <label for="task-${index}" class="${task.completed ? "completed" : ""}">${escapeHtml(task.text)}</label>
            <button data-index="${index}" class="delete-btn" title="Delete">✕</button>
        `;

        // checkbox toggle
        const checkbox = li.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => toggleTask(index));

        // delete button
        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            const i = Number(e.currentTarget.dataset.index);
            deleteTask(i);
        });

        taskList.appendChild(li);
    });
}

// Toggle completed state
function toggleTask(index) {
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
    }
}

// Delete single task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

// Simple HTML escape for safety (optional)
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

// Allow Enter key to add task
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// initial render
displayTasks();
