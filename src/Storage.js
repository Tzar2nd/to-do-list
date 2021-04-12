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
        toDoApp.addProject(project);
        Storage.saveToDoState(toDoApp);
    }

    static deleteProject(projectName) {
        const toDoApp = Storage.getToDoState();
        toDoApp.deleteProject(projectName);
        Storage.saveToDoState(toDoApp);
    }

    
}