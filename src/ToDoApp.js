// The ToDo list app main logic code as differentiated from the DOM updates
// It also implements initial default data

import Project from './Project';
import ToDo from './ToDo';

export default class ToDoApp {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Default'));
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

    deleteProject(project) {
        const projectDelete = this.projects.find(
            (project) => { project.getName() === projectName }
        );
        this.projects.splice(this.projects.indexOf(projectDelete),1);
    }
}



