import Projects from './Projects';
import Project from './Project';
import ToDo from './ToDo';
import ToDoApp from './ToDo';
import Storage from './Storage';

export default class DOM {

    static loadUI() {
        //Storage.deleteProject("test2");
        DOM.loadProjects();
        DOM.attachProjectButtonListeners();
    }

    static loadProjects() {
        let projects = Storage.getToDoState().getProjects();
        console.table(projects);
        projects.forEach((project) => DOM.displayProject(project.getName()))
    }

    // Display HTML
    static displayProject(projectName) {
        let projects = document.getElementById('projects');
        
        projects.insertAdjacentHTML('beforeend', `<div>
        <button class='button-project'>
            <i class="fas fa-list-ul"></i>
                <span>${projectName}</span>
            <i class="fas fa-times"></i>
        </button>
        </div>`);
        
        let button = document.getElementById('projects').lastChild.querySelector('.button-project');
        button.addEventListener('click', e => DOM.displayProjectToDos(projectName));
    }

    static toggleHidden(elementName) {
        const element = document.querySelector(elementName);

        if (element.classList.contains('hidden')) { 
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
    
    static attachProjectButtonListeners() {
        const newProjectButton = document.getElementById('new-project-button');
        const projectCancelButton = document.getElementById('button-cancel-project');
        const projectSaveButton = document.getElementById('button-save-project');
        const newToDoButton = document.getElementById('button-new-todo');
        const toDoSaveButton = document.getElementById('button-save-todo');
        const toDoCancelButton = document.getElementById('button-cancel-todo');
        
        newProjectButton.addEventListener("click", e => DOM.toggleHidden('.new-project-container'));
        projectCancelButton.addEventListener("click", e => DOM.clearNewProjectInput());
        projectSaveButton.addEventListener("click", e => DOM.createAndDisplayProject());

        newToDoButton.addEventListener("click", e => DOM.toggleHidden('.new-todo-container'));
        toDoSaveButton.addEventListener("click", e => {
            if (DOM.createToDo()) {
                DOM.clearNewToDoInput();
                DOM.clearToDos();
                let projectName = document.getElementById('project-name').textContent;
                DOM.displayToDos(projectName);
            }
        });
        
        toDoCancelButton.addEventListener("click", e => DOM.clearNewToDoInput())
    }

    static createAndDisplayProject() {
        let projectName = document.getElementById('input-project-name').value;
        if (DOM.createNewProject(projectName)) {
            DOM.displayProject(projectName);
            DOM.displayProjectToDos(projectName);
            DOM.clearNewProjectInput();
        }
    }
    static createNewProject(projectName) {

        if (projectName === '') { 
            alert("Please enter a project name");
            return; 
        }

        Storage.addProject(new Project(projectName));
    }

    static displayProjectToDos(projectName) { 
        DOM.clearToDos();
        DOM.displayToDos(projectName);
    }

    static createToDo() {
        let toDoName = document.getElementById('input-todo-name').value;
        let projectName = document.getElementById('project-name').textContent;
        let project = this.projects.getProjectByName(projectName);

        if (toDoName === '') { 
            alert("Please enter a task name");
            return false;
        }

        let todo = new ToDo(toDoName);
        project.addToDo(todo);
        return true; 
    }

    static clearNewToDoInput() {
        document.getElementsByClassName('new-todo-container')[0].classList.add('hidden');
        document.getElementById("input-todo-name").value = '';
    }

    static clearNewProjectInput() {
        document.getElementsByClassName("new-project-container")[0].classList.add('hidden');
        document.getElementById('input-project-name').value = '';
    }

    static createProject() {

    }

    static clearToDos() {
        const content = document.getElementById('content-body');
        content.innerHTML = '';
    }

    static displayToDos(projectName) {
        document.getElementById('project-name').innerText = projectName;
        const display = document.getElementById('content-body');
        const project = Storage.getToDoState().getProject(projectName);
        console.log(project);
        const todos = project.getToDos();
        console.log(todos);

        todos.forEach(todo => { 
            console.log(todo);
        });

        todos.forEach(todo => { 
            display.innerHTML += `
            <button class='button-todo'>
                <i class="fas fa-list-ul"></i>
                    <span>${ todo.getTitle() } </span>
                <i class="fas fa-times"></i>
            </button>`;
        });

        DOM.attachToDoListeners(); 
    }

    static attachToDoListeners() {
        let toDoButtons = document.getElementsByClassName('button-todo');
        Array.from(toDoButtons).forEach((toDoButton) => {
            toDoButton.addEventListener("click", e => { 
                console.log('clicked'); 
            });
        });
    }
    
}