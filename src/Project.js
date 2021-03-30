import { format, parseISO } from 'date-fns'

export default class Project {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.toDos = [];
    }

    addToDo(todo) {
        this.toDos.push(todo);
    }

    getToDos() {
        return this.toDos; 
    }
}