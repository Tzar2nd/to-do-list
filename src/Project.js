import { format, parseISO } from 'date-fns'

export default class Project {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.toDos = [];
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getToDos() {
        return this.toDos;
    }

    addToDo(todo) {
        this.toDos.push(todo);
    }

    getToDos() {
        return this.toDos; 
    }
}