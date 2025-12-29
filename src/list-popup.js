import { createTodo } from './todo.js';

let todoList = []; // store lists in an array
export { todoList };

export const newList = (onTodoAdded) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'popup-div';
    const windowDiv = document.createElement('div');
    windowDiv.className = 'list-window';

    // header
    const header = document.createElement('div');
    header.className = 'list-window-header';
    const crossButton = document.createElement('button');
    crossButton.className = 'close-btn';
    crossButton.textContent = '✕';
    crossButton.type = 'button';
    crossButton.addEventListener('click', () => {
        mainDiv.remove();
    });
    header.appendChild(crossButton);

    // form
    const form = document.createElement('form');
    form.className = 'todo-form';
    form.innerHTML = `
    <label>Title: 
        <input type="text" name="title" required>
    </label>
    <label>
        Description: <textarea name="description" rows="3"></textarea>
    </label>
    <label>
        Due Date: <input type="date" name="dueDate" required>
    </label>
    <label>Priority:
        <select name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    </label>
    `;
    
    // form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const todo = createTodo(
            formData.get('title'),
            formData.get('description'),
            formData.get('dueDate'),
            formData.get('priority')
        );
        todoList.push(todo);
        onTodoAdded(todo);
        console.log('Todo added:', todo); // Replace with UI update later
        mainDiv.remove();
    }); 
    
    // footer
    const footer = document.createElement('div');
    footer.className = 'list-window-footer';
    // submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Submit';
    footer.appendChild(submitButton);
    // cancel button
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'cancel-button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        mainDiv.remove();
    });
    footer.appendChild(cancelButton);
    
    // final appending
    windowDiv.appendChild(header);
    windowDiv.appendChild(form);
    form.appendChild(footer);
    mainDiv.appendChild(windowDiv);
    
    return mainDiv;
}