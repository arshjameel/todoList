export const createTodo = (title, description, dueDate, priority = 'low') => {
    return {
        id: Date.now(), // Unique ID
        title,
        description,
        dueDate,
        priority,
        completed: false,
        
        // Methods
        toggleComplete() { this.completed = !this.completed; },
        setPriority(newPriority) { this.priority = newPriority; }
    };
};
