import "./style.css";
import { newList, todoList } from "./list-popup.js";
import { newTask } from "./task-popup.js";

let bodyDiv = document.querySelector('body');

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

document.addEventListener('DOMContentLoaded', () => {
    let content = document.querySelector('#content');
    const listAddButton = document.querySelector('button');
    let taskDiv = document.querySelector('.taskDiv');
    const taskAddButton = document.querySelector('.taskAddButton');

    const todoDisplay = document.createElement('div');
    todoDisplay.className = 'todo-display';
    content.appendChild(todoDisplay);
    
    listAddButton.addEventListener('click', () => {
        content.appendChild(newList((newTodo) => {
            displayTodo(newTodo, todoDisplay);
        }));
    });
    
    taskAddButton.addEventListener('click', () => {
        // open task-popup window
        // set info
        // if submit -> taskDiv.appendChild(newTask());
        //else close window without changing anything
    });
    
});

function displayTodo(todo, container) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item priority-${todo.priority}`;
    
    todoItem.innerHTML = `
        <h3>${todo.title}</h3>
        <p>Due: ${todo.dueDate}</p>
        <p>${todo.description || 'No description'}</p>
        <button class="delete-todo" data-id="${todo.id}">Delete</button>
    `;
    
    todoItem.querySelector('.delete-todo').addEventListener('click', () => {
        todoItem.remove();
    });
    
    container.appendChild(todoItem);
}

const footer = createFooter();
bodyDiv.appendChild(footer);