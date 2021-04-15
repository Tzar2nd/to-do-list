import Project from './Project';
import ToDo from './ToDo';

export default class ToDoApp {
    constructor() {
        this.projects = [];
        this.addDefaultProject();
    }

    addDefaultProject() {
        let defaultProject = new Project('Default Project', 'Default Project');
        let defaultNote = new ToDo("default note");
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
    
    contains(projectName) {
        return this.projects.some(project => project.getName() === projectName);
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(projectDelete) {
        const project = this.projects.find(project => project.getName() === projectDelete);

        this.projects.splice(this.projects.indexOf(project),1);
    }
}
