import Project from './Project';
import ToDo from './ToDo';

export default class Projects {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Default', 'Default Inbox'));
        this.projects.push(new Project('Today', 'Due today'));
        this.projects.push(new Project('This week', 'due this week'));
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
