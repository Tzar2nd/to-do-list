import Project from './Project';
import ToDo from './ToDo';

export default class Projects {
    constructor() {
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }

    getProjectByName(project) {
        return this.projects.find(
            findProject => project === findProject.getName()
        );
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        const deleteProject = this.projects.find(
            findProject => project.getName() === findProject.getName()
        );

        this.projects.splice(this.projects.indexOf(deleteProject), 1);
    }
}
