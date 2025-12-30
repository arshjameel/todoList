import { createTodo } from './todo.js';

let todoList = [];
export { todoList };

export const newTask = (onTodoAdded, onDelete, existingData = null) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'popup-div';
    const windowDiv = document.createElement('div');
    windowDiv.className = 'task-window';

    // header
    const header = document.createElement('div');
    header.className = 'task-window-header';
    const headerText = document.createElement('h1');
    headerText.textContent = 'Create Form'
    const closeButtonContainer = document.createElement('div');
    closeButtonContainer.className = 'close-btn-container'
    const crossButton = document.createElement('button');
    crossButton.className = 'close-btn';
    crossButton.textContent = '✕';
    crossButton.type = 'button';
    crossButton.addEventListener('click', () => {
        mainDiv.remove();
    });
    closeButtonContainer.appendChild(crossButton);
    header.appendChild(headerText);
    header.appendChild(closeButtonContainer);

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
        Due Date: <input type="datetime-local" name="dueDate" required>
    </label>
    <label>Priority:
        <select name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    </label>
    `;

    if (existingData) {
        form.querySelector('input[name="title"]').value = existingData.title;
        form.querySelector('textarea[name="description"]').value = existingData.description;
        
        const date = new Date(existingData.dueDate);
        const dateVal = existingData.dueDate ? date.toISOString().slice(0, 16) : '';
        form.querySelector('input[name="dueDate"]').value = dateVal;

        form.querySelector('select[name="priority"]').value = existingData.priority || 'low';
        //submitButton.textContent = 'Update';
    }
    
    // form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        if (existingData) {
            existingData.title = formData.get('title');
            existingData.description = formData.get('description');
            existingData.dueDate = formData.get('dueDate');
            existingData.priority = formData.get('priority');
            onTodoAdded(existingData);
        } else {
            const todo = new createTodo(
                formData.get('title'), 
                formData.get('description'),
                formData.get('dueDate'),
                formData.get('priority')
            );
            todoList.push(todo);
            onTodoAdded(todo);
        }
        mainDiv.remove()
    }); 
    
    // footer
    const footer = document.createElement('div');
    footer.className = 'task-window-footer';
    // submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Submit';
    footer.appendChild(submitButton);
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        if (onDelete) onDelete(existingData);  // Call delete callback
        mainDiv.remove();
    });
    footer.appendChild(deleteButton);
    form.appendChild(footer);
    
    // final appending
    windowDiv.appendChild(header);
    windowDiv.appendChild(form);
    mainDiv.appendChild(windowDiv);
    
    return mainDiv;
}