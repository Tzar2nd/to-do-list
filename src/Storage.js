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

        // assign projects
        toDoApp.setProjects(
            toDoApp
                .getProjects()
                .map((project) => Object.assign(new Project(), project))
        );

        // assign todos
        toDoApp
            .getProjects()
            .forEach((project) => 
                project.setToDos(
                    project.getToDos().map(todo => Object.assign(new ToDo(), todo))
                )
            );

        return toDoApp;
    }

    static addProject(project) {
        const toDoApp = Storage.getToDoState();
        console.log(`adding ${project.getName()}`);
        toDoApp.addProject(project);
        Storage.saveToDoState(toDoApp);
    }

    static deleteProject(projectName) {
        const toDoApp = Storage.getToDoState();
        console.log(`deleting ${projectName}`);
        toDoApp.deleteProject(projectName);
        Storage.saveToDoState(toDoApp);
    }

    static deleteToDo(projectName, toDoName) {
        const toDoApp = Storage.getToDoState();
        console.log(`deleting todo: ${toDoName}`);
        toDoApp.getProject(projectName).deleteToDo(toDoName);
        Storage.saveToDoState(toDoApp);
    }

    static addToDo(projectName, toDo) {
        const toDoApp = Storage.getToDoState();
        toDoApp.getProject(projectName).addToDo(toDo);
        Storage.saveToDoState(toDoApp);
    }


}