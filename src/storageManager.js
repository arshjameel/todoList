const STORAGE_KEY = 'todo_app_data';

export const saveToLocal = (data) => {
    // Converts the array of objects into one string
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocal = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    // If no data exists, return an empty array, else parse the string back into an array of objects
    return savedData ? JSON.parse(savedData) : [];
};
