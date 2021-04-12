// The ToDo list app main logic code as differentiated from the DOM updates
// It also implements initial default data

import Project from './Project';
import ToDo from './ToDo';

export default class ToDoApp {
    constructor() {
        this.projects = [];
        let defaultProject = new Project('Default Project', 'Default Project');
        let defaultNote = new ToDo("default note", "Hello World", "01/03/2021 00:00", 1, "First to-do list task");
        defaultProject.addToDo(defaultNote);
        this.projects.push(defaultProject);
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName);
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(projectDelete) {
        const project = this.projects.find(
            (project) => { project.getName() === projectDelete }
        );
        this.projects.splice(this.projects.indexOf(project),1);
    }
}



