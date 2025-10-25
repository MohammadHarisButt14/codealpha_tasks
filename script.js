   document.addEventListener('DOMContentLoaded', loadTasks);

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            saveTask(task);
            renderTask(task);
            taskInput.value = '';
        }

        function renderTask(task) {
            const taskList = document.getElementById('taskList');
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
            taskItem.setAttribute('data-id', task.id);

            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span>${task.text}</span>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            `;

            taskList.appendChild(taskItem);
        }

        function saveTask(task) {
            let tasks = getTasks();
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function getTasks() {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }

        function loadTasks() {
            const tasks = getTasks();
            tasks.forEach(task => renderTask(task));
        }

        function toggleTask(id) {
            let tasks = getTasks();
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            localStorage.setItem('tasks', JSON.stringify(tasks));
            refreshTaskList();
        }

        function deleteTask(id) {
            let tasks = getTasks();
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            refreshTaskList();
        }

        function editTask(id) {
            let tasks = getTasks();
            const task = tasks.find(task => task.id === id);
            const newText = prompt('Edit your task:', task.text);
            
            if (newText !== null && newText.trim() !== '') {
                tasks = tasks.map(task => 
                    task.id === id ? { ...task, text: newText.trim() } : task
                );
                localStorage.setItem('tasks', JSON.stringify(tasks));
                refreshTaskList();
            }
        }

        function refreshTaskList() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            loadTasks();
        }