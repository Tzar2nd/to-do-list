import Project from './Project';
import ToDo from './ToDo';
import ToDoApp from './ToDoApp';

export default class Storage {
    static saveToDoState(data) {
        localStorage.setItem('toDoApp', JSON.stringify(data));
    }

    static getToDoState() {
        const toDoApp = Object.assign(
            new ToDoApp(),                              // target
            JSON.parse(localStorage.getItem('toDoApp')) // source
        );

        return toDoApp;
    }

}