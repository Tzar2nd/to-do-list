import Project from './Project';
import ToDo from './ToDo';
import Storage from './Storage';

export default class DOM {

    static loadUI() {
        //Storage.deleteProject("test2");
        DOM.loadProjects();
        DOM.attachProjectButtonListeners();
        DOM.attachToDoEventListeners();
        DOM.selectDefaultProject();
    }

    static selectDefaultProject() {
        DOM.clearToDos();
        DOM.loadToDos('Default Project');
    }

    static loadProjects() {
        let projects = Storage.getToDoState().getProjects();
        projects.forEach((project) => DOM.displayProject(project.getName()))
    }

    static displayProject(projectName) {
        let projects = document.getElementById('projects');
        
        projects.insertAdjacentHTML('beforeend', `<div>
        <button class='button-project' id='project-${projectName}'>
            <i class="fas fa-list-ul"></i>
                <span>${projectName}</span>
            <i class="fas fa-times delete-project"></i>
        </button>
        </div>`);
        
        let button = document.getElementById('projects').lastChild.querySelector('.button-project');
        button.addEventListener('click', e => DOM.handleProjectClick(e, projectName));
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
        
        newProjectButton.addEventListener("click", e => DOM.toggleHidden('.new-project-container'));
        projectCancelButton.addEventListener("click", e => DOM.clearNewProjectInput());
        projectSaveButton.addEventListener("click", e => DOM.createAndDisplayProject());
    }

    static attachToDoEventListeners() {
        const newToDoButton = document.getElementById('button-new-todo');
        const toDoSaveButton = document.getElementById('button-save-todo');
        const toDoCancelButton = document.getElementById('button-cancel-todo');

        newToDoButton.addEventListener('click', e => DOM.toggleHidden('.new-todo-container'));
        toDoSaveButton.addEventListener('click', e => DOM.createAndDisplayToDo());
        toDoCancelButton.addEventListener('click', e => DOM.clearNewToDoInput());
    }

    static createAndDisplayToDo() {
        let projectName = document.getElementById('project-name').textContent;
        if (DOM.createToDo(projectName)) {
            DOM.clearNewToDoInput();
            DOM.clearToDos();
            DOM.loadToDos(projectName);
        }
    }

    static createAndDisplayProject() {
        let projectName = document.getElementById('input-project-name').value;
        if (DOM.createNewProject(projectName)) {
            DOM.displayProject(projectName);
            DOM.clearToDos();
            DOM.loadToDos(projectName);
            DOM.clearNewProjectInput();
        }
    }

    static createNewProject(projectName) {

        if (projectName === '') { 
            alert("Please enter a project name");
            return false;
        }

        if (Storage.getToDoState().contains(projectName)) {
            alert("ToDo already exists, please enter a new one");
            return false; 
        }

        Storage.addProject(new Project(projectName));
        return true; 
    }

    static handleProjectClick(e, projectName) { 
        if (e.target.classList.contains('delete-project')) {
            DOM.deleteProject(projectName);
            DOM.selectDefaultProject();
            return;
        }
        DOM.clearToDos();
        DOM.loadToDos(projectName);
    }

    static deleteProject(projectName) {
        Storage.deleteProject(projectName);
        document.getElementById(`project-${projectName}`).remove();
    }

    static createToDo(projectName) {
        const toDoName = document.getElementById('input-todo-name').value;

        if (toDoName === '') { 
            alert("Please enter a task name");
            return false;
        }

        Storage.addToDo(projectName, new ToDo(toDoName));
        
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

    static clearToDos() {
        const content = document.getElementById('content-body');
        content.innerHTML = '';
    }

    static loadToDos(projectName) {
        document.getElementById('project-name').innerText = projectName;
        const todos = Storage.getToDoState().getProject(projectName).getToDos();
        todos.forEach(todo => DOM.displayToDo(projectName, todo));
    }

    static displayToDo(projectName, todo) {
        const display = document.getElementById('content-body');

        display.insertAdjacentHTML('beforeend',
        `<button class='button-todo' id='todo-${todo.getTitle()}'>
        <div>
            <i class="fas fa-list-ul"></i>
        </div>
        <div>
            <span>${ todo.getTitle() } </span>
        </div>
        <div>
            <i class="fas fa-times delete-todo"></i>
            </div>
        </button>`);
        console.log(display);
        let button = display.lastChild.querySelector('.delete-todo');
        button.addEventListener('click', e => DOM.handleToDoClick(e, projectName, todo.getTitle()));

    }

    static handleToDoClick(e, projectName, toDoName) {
        if (e.target.classList.contains('delete-todo')) {
            DOM.deleteToDo(projectName, toDoName);
            DOM.clearToDos();
            DOM.loadToDos(projectName);
            return;
        }
        
        console.log(`${projectName} todo's clicked`);   
    }

    static deleteToDo(projectName, toDoName) {
        Storage.deleteToDo(projectName, toDoName);
        document.getElementById(`todo-${toDoName}`).remove();
    }


    
}