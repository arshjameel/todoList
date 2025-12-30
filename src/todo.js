export class createTodo {
    constructor(title, description, dueDate, priority = 'low') {
        this.id = Date.now(), // Unique ID -> ms since 01-01-1970 UTC
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.createdAt = new Date().toISOString(),  // creation timestamp
        this.completed = false,
        this.subtasks = []
    }
    
    toggleComplete() {
        this.completed = !this.completed;
    }
    
    setPriority(newPriority) {
        this.priority = newPriority;
    }

    update(newData) {
        Object.assign(this, newData);
    }
};
