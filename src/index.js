import "./style.css";
import { addHours } from "date-fns";
import { saveToLocal, loadFromLocal } from "./storageManager.js";
import { createTodo } from "./todo.js";
import { displayTodo, displayTask } from "./domManager";
import { newList } from "./list-popup";
import { newTask } from "./task-popup";

const content = document.querySelector('#content');
const listAddButton = document.querySelector('button');
listAddButton.className = 'list-add-btn';
const todoDisplay = document.createElement('div');
todoDisplay.className = 'todo-display';
let todoList = [];

const init = () => {
    content.appendChild(todoDisplay);
    const savedData = loadFromLocal();
    
    if (savedData && savedData.length > 0) {
        todoList = savedData.map(item => {
            const listClass = new createTodo(item.title, item.description);
            listClass.id = item.id;
            listClass.subtasks = item.subtasks || [];
            return listClass;
        });
    } else {
        const defaultTodo = new createTodo(
            "My List", 
            "Press the 'Add' button to add more tasks."
        );
        const now = addHours(new Date(), 2);
        const offset = now.getTimezoneOffset() * 60 * 1000; // offset in milliseconds
        const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
        const defaultTask = new createTodo(
            "Call mom", 
            "Ask for money", 
            localISOTime, 
            "high"
        );
        defaultTodo.subtasks.push(defaultTask);
        todoList.push(defaultTodo);
        saveToLocal(todoList);
    }
    renderAll(); 
}

listAddButton.addEventListener('click', () => {
    const popup = newList((data) => {
        const newListObj = new createTodo(data.title, data.description);
        todoList.push(newListObj);
        saveToLocal(todoList);
        renderAll();
    });
    document.body.appendChild(popup);
});

const handleAddTask = (parentListId, taskData) => {
    const parentList = todoList.find(item => item.id === parentListId);
    if (parentList) {
        const newTask = new createTodo(
            taskData.title, 
            taskData.description, 
            taskData.dueDate, 
            taskData.priority
        );
        parentList.subtasks.push(newTask);
        saveToLocal(todoList);
        renderAll();
    }
};

const handleDelete = (itemId, parentListId) => {
    if (parentListId) {
        const parentList = todoList.find(item => item.id === parentListId);
        if (parentList) {
            parentList.subtasks = parentList.subtasks.filter(task => task.id !== itemId);
        }
    } else {
        todoList = todoList.filter(item => item.id !== itemId);
    }
    saveToLocal(todoList);
    renderAll();
};

const handleEdit = (item, newData) => {
    item.title = newData.title;
    item.description = newData.description;
    if (newData.dueDate) item.dueDate = newData.dueDate;
    if (newData.priority) item.priority = newData.priority;
    saveToLocal(todoList);
    renderAll();
}

const renderAll = () => {
    todoDisplay.innerHTML = '';

    todoList.forEach(list => {
        const taskDisplay = displayTodo(list, todoDisplay);
        const editButton = taskDisplay.parentElement.querySelector('.edit-todo');
        editButton.onclick = () => {
            const popup = newList(
                (data) => {
                    handleEdit(list, data);
                    popup.remove();
                },
                () => {
                    handleDelete(list.id);
                    popup.remove();
                },
                list
            );
            document.body.appendChild(popup);
        };

        const addTaskButton = taskDisplay.parentElement.querySelector('.add-task');
        addTaskButton.onclick = () => {
            const popup = newTask((data) => handleAddTask(list.id, data));
            document.body.appendChild(popup);
        };

        if (list.subtasks) {
            list.subtasks.forEach(task => {
                displayTask(task, taskDisplay);
                const taskItem = taskDisplay.lastElementChild;
                const editTaskButton = taskItem.querySelector('.edit-task');
                editTaskButton.onclick = () => {
                    const popup = newTask(
                        (data) => {
                            handleEdit(task, data);
                            popup.remove();
                        },
                        () => {
                            handleDelete(task.id, list.id);
                            popup.remove();
                        },
                        task
                    );
                    document.body.appendChild(popup);
                };
            });
        }
    });
};

const createFooter = () => {
    const footer = document.createElement('div');
    footer.className = 'footer';
    const p = document.createElement('p');
    p.textContent = `© ${new Date().getFullYear()} `;
    const link = document.createElement('a');
    link.href = 'https://github.com/arshjameel/todoList';
    link.rel = 'noopener';
    link.target = '_blank';
    link.className = 'credit';
    link.textContent = 'Arsh Jameel';
    p.appendChild(link);
    footer.appendChild(p)
    return footer;
}   

init();
let bodyDiv = document.querySelector('body');
const footer = createFooter();
bodyDiv.appendChild(footer);