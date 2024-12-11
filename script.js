// 存储数据到本地存储
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 从本地存储获取数据
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// 任务相关功能
function addTask() {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
    
    if (taskText) {
        const tasks = getFromLocalStorage('tasks');
        tasks.push({
            text: taskText,
            date: new Date().toISOString(),
            completed: false
        });
        saveToLocalStorage('tasks', tasks);
        input.value = '';
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = getFromLocalStorage('tasks');
    
    taskList.innerHTML = tasks.map((task, index) => `
        <li>
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? '撤销' : '完成'}</button>
                <button onclick="deleteTask(${index})">删除</button>
            </div>
        </li>
    `).join('');
}

function toggleTask(index) {
    const tasks = getFromLocalStorage('tasks');
    tasks[index].completed = !tasks[index].completed;
    saveToLocalStorage('tasks', tasks);
    displayTasks();
}

function deleteTask(index) {
    const tasks = getFromLocalStorage('tasks');
    tasks.splice(index, 1);
    saveToLocalStorage('tasks', tasks);
    displayTasks();
}

// 日记相关功能
function saveDiary() {
    const content = document.getElementById('diary-content').value.trim();
    if (content) {
        const diaries = getFromLocalStorage('diaries');
        diaries.push({
            content,
            date: new Date().toISOString()
        });
        saveToLocalStorage('diaries', diaries);
        document.getElementById('diary-content').value = '';
        displayDiaries();
    }
}

function displayDiaries() {
    const diaryEntries = document.getElementById('diary-entries');
    const diaries = getFromLocalStorage('diaries');
    
    diaryEntries.innerHTML = diaries.map((diary, index) => `
        <div class="diary-entry">
            <p>${diary.content}</p>
            <small>${new Date(diary.date).toLocaleString()}</small>
        </div>
    `).join('');
}

// 日程相关功能
function addSchedule() {
    const timeInput = document.getElementById('schedule-time');
    const eventInput = document.getElementById('schedule-event');
    const time = timeInput.value;
    const event = eventInput.value.trim();
    
    if (time && event) {
        const schedules = getFromLocalStorage('schedules');
        schedules.push({
            time,
            event,
            date: new Date().toISOString()
        });
        saveToLocalStorage('schedules', schedules);
        timeInput.value = '';
        eventInput.value = '';
        displaySchedules();
    }
}

function displaySchedules() {
    const scheduleList = document.getElementById('schedule-list');
    const schedules = getFromLocalStorage('schedules');
    
    scheduleList.innerHTML = schedules.map((schedule, index) => `
        <div class="schedule-item">
            <p>${schedule.event}</p>
            <small>${new Date(schedule.time).toLocaleString()}</small>
        </div>
    `).join('');
}

// 笔记相关功能
function addNote() {
    const content = document.getElementById('note-content').value.trim();
    if (content) {
        const notes = getFromLocalStorage('notes');
        notes.push({
            content,
            date: new Date().toISOString()
        });
        saveToLocalStorage('notes', notes);
        document.getElementById('note-content').value = '';
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    const notes = getFromLocalStorage('notes');
    
    notesList.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            <p>${note.content}</p>
            <small>${new Date(note.date).toLocaleString()}</small>
        </div>
    `).join('');
}

// 页面加载时显示所有数据
window.onload = function() {
    displayTasks();
    displayDiaries();
    displaySchedules();
    displayNotes();
}; 