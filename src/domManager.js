import { format } from "date-fns";
import { newList } from "./list-popup.js";
import { newTask } from "./task-popup.js";

const timeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return 'over due date';

    const diffSeconds = Math.floor(diff / 1000);
    const days = Math.floor(diffSeconds / 86400);
    const hours = Math.floor((diffSeconds % 86400) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);

    let parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) {  // Only show if relevant
        parts.push(hours === 1 ? `${hours}hr` : `${hours}hrs`);
    }
    if (minutes > 0 || (hours === 0 && days === 0)) {  // Fallback for minutes
        parts.push(minutes === 1 ? `${minutes}min` : `${minutes}mins`);
    }
    
    return `⧗ ${parts.join(', ')} left`
};

export const displayTask = (task, taskContainer) => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item priority-${task.priority}`;
    
    const contentArea = document.createElement('div');
    contentArea.className = 'task-content'

    const dateObj = new Date(task.dueDate);
    let due = "Invalid Date";
    if (!isNaN(dateObj)) {
        due = format(dateObj, "MM-dd-yyyy hh:mm a");
    }
    contentArea.innerHTML = `
        <h4>${task.title}</h4>
        <p>⏱ ${due}</p>
        <p>${timeUntilDue(task.dueDate)}</p>
    `;
        
    const footer = document.createElement('div');
    footer.className = 'task-item-footer';
    footer.innerHTML = `
        <div class="todo-btn-container">
            <button class="edit-task">Edit</button>
        </div>
    `;
        
    taskItem.appendChild(contentArea);
        
    const descriptionArea = document.createElement('div');
    descriptionArea.className = 'todo-display';
    descriptionArea.innerHTML = `      
        <p>${task.description || ''}</p>
    `;
    taskItem.appendChild(descriptionArea);
    
    taskItem.appendChild(footer);
    
    footer.querySelector('.edit-task').addEventListener('click', () => {
        const taskPopup = newTask(
            (updatedTask) => editTask(updatedTask, contentArea, descriptionArea),
            () => taskItem.remove(),
            task
        )
        content.appendChild(taskPopup)
    })
    
    taskContainer.appendChild(taskItem);
};

export const displayTodo = (todo, container) => {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item`;
    
    const contentArea = document.createElement('div');
    contentArea.className = 'todo-content';

    let timestamp = format(new Date(todo.createdAt), "MM-dd-yyyy hh:mm a");
    
    contentArea.innerHTML = `
        <h3>${todo.title}</h3>
        <p>⏱ ${timestamp}</p>
        <p>${todo.description || 'No description'}</p>
    `;
        
    const footer = document.createElement('div');
    footer.className = 'todo-item-footer';
    footer.innerHTML = `
        <div class="todo-btn-container">
            <button class="add-task">Add</button>
        </div>
        <div class="todo-btn-container">
            <button class="edit-todo">Edit</button>          
        </div>
    `;
    
    todoItem.appendChild(contentArea);
    
    const taskDisplay = document.createElement('div');
    taskDisplay.className = 'todo-display';
    todoItem.appendChild(taskDisplay);
    
    todoItem.appendChild(footer);     
    
    footer.querySelector('.add-task').addEventListener('click', () => {
        const taskPopup = newTask((newTaskItem) => {
            displayTask(newTaskItem, taskDisplay);
        });
        content.appendChild(taskPopup);
    });
    
    footer.querySelector('.edit-todo').addEventListener('click', () => {
        const taskPopup = newList(
            (updatedTodo) => editList(updatedTodo, todoItem),
            () => todoItem.remove(),
            todo
        )
        content.appendChild(taskPopup);
    });
  
    container.appendChild(todoItem);
    return taskDisplay
};

export const editList = (todo, todoItem) => {
    const contentArea = todoItem.querySelector('.todo-content');
    contentArea.innerHTML = `
        <h3>${todo.title}</h3>
        <p>⏱ ${format(new Date(todo.createdAt), "MM-dd-yyyy hh:mm a")}</p>
        <p>${todo.description || 'No description'}</p>
    `;
};

export const editTask = (task, contentArea, descriptionArea) => {

    let due = format(new Date(task.dueDate), "MM-dd-yyyy hh:mm a");

    contentArea.innerHTML = `
        <h4>${task.title}</h4>
        <p>⏱ ${due}</p>
        <p>${timeUntilDue(task.dueDate)}</p>
    `;
            
    descriptionArea.innerHTML = `<p>${task.description || 'No description'}</p>`;
};