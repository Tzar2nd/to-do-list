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

    setToDos(toDos) {
        this.toDos = toDos; 
    }

    getToDos() {
        return this.toDos;
    }

    addToDo(todo) {
        this.toDos.push(todo);
        console.log('adding todo');
    }

    getToDos() {
        return this.toDos; 
    }

    deleteToDo(toDoName) {
        const todo = this.toDos.find(
            (todo) => { todo.getTitle() === toDoName }
        );
        this.toDos.splice(this.toDos.indexOf(todo),1);
    }

}