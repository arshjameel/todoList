import "./style.css";
import { addHours } from "date-fns";
import { createTodo } from "./todo.js";
import { displayTodo, displayTask } from "./domManager";
import { newList } from "./list-popup";

let bodyDiv = document.querySelector('body');
const content = document.querySelector('#content');
const listAddButton = document.querySelector('button');
listAddButton.className = 'list-add-btn';
const todoDisplay = document.createElement('div');
todoDisplay.className = 'todo-display';

const init = () => {
    content.appendChild(todoDisplay);

    const defaultTodo = new createTodo(
        "My List", 
        "Press the 'Add' button to add more tasks."
    );
    const taskContainer = displayTodo(defaultTodo, todoDisplay);

    const now = addHours(new Date(), 2);
    const twoHoursFromNow = now.toLocaleString().slice(0, 16);
    
    const defaultTask = new createTodo(
        "Call mom", 
        "Ask for money", 
        twoHoursFromNow, 
        "high"
    );

    displayTask(defaultTask, taskContainer);
}

listAddButton.addEventListener('click', () => {
    document.body.appendChild(newList((data) => displayTodo(data, todoDisplay)));
});


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
const footer = createFooter();
bodyDiv.appendChild(footer);