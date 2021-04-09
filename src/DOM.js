import Projects from './Projects';
import Project from './Project';
import ToDo from './ToDo';
import ToDoApp from './ToDo';

export default class DOM {

    static loadUI() {
        DOM.loadProjects();
        DOM.displayProjects();
        DOM.attachListeners();
    }

    static loadProjects() {
        let projects = Storage.getToDoState().getProjects()

        projects.forEach((project) => { DOM.createProject(project.getName()) })
    }

    static displayProjects() {
        const projects = document.getElementById('projects');

        this.projects.getProjects().forEach((project) => {
            projects.innerHTML += `
            <div>
            <button class='button-project'>
                <i class="fas fa-list-ul"></i>
                    <span>${project.getName()}</span>
                <i class="fas fa-times"></i>
            </button>
            </div>`;
        });
    }

    static displayProject(projectName) {
        let projects = document.getElementById('projects');
        
        projects.insertAdjacentHTML('beforeend', `<div>
        <button class='button-project'>
            <i class="fas fa-list-ul"></i>
                <span>${projectName}</span>
            <i class="fas fa-times"></i>
        </button>
        </div>`);
        
        // add button event listener
        let button = document.getElementById('projects').lastChild.getElementsByClassName('button-project')[0];
        button.addEventListener("click", e => DOM.displayProject(button));
    }

    static attachListeners() {
        let projectButtons = document.getElementsByClassName('button-project');
        Array.from(projectButtons).forEach((projectButton) => {
            projectButton.addEventListener("click", e => DOM.displayProject(projectButton));
        });

        let newProjectButton = document.getElementById('new-project-button');
        newProjectButton.addEventListener("click", e => {
            document.getElementsByClassName("new-project-container")[0].classList.remove('hidden');
        });

        let projectCancelButton = document.getElementById('button-cancel-project');
        projectCancelButton.addEventListener("click", e => {
            DOM.clearNewProjectInput();
        });

        let projectSaveButton = document.getElementById('button-save-project');
        projectSaveButton.addEventListener("click", e => {
            let newProject = DOM.createProject();
            if (newProject) {
                DOM.clearNewProjectInput();
                DOM.displayProject(newProject.getName());
            }
        });

        let newToDoButton = document.getElementById('button-new-todo');
        newToDoButton.addEventListener("click", e => {
            document.getElementsByClassName("new-todo-container")[0].classList.remove('hidden');
        });

        let toDoSaveButton = document.getElementById('button-save-todo');
        toDoSaveButton.addEventListener("click", e => {
            if (DOM.createToDo()) {
                DOM.clearNewToDoInput();
                DOM.clearToDos();
                let projectName = document.getElementById('project-name').textContent;
                DOM.displayToDos(projectName);
            }
        });
        
        let toDoCancelButton = document.getElementById('button-cancel-todo');
        toDoCancelButton.addEventListener("click", e => {
            DOM.clearNewToDoInput();
        })
    }

    static displayProject(projectButton) { 
        let projectText = projectButton.querySelector('span').innerText;
        DOM.clearToDos();
        DOM.displayToDos(projectText);
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
        let projectName = document.getElementById('input-project-name').value;

        if (projectName === '') {
            alert("Please enter a project name");
            return false; 
        }

        let project = new Project(projectName, "");
        this.projects.addProject(project);
        return project; 
    }

    static clearToDos() {
        const content = document.getElementById('content-body');
        content.innerHTML = '';
    }

    static displayToDos(projectName) {
        document.getElementById('project-name').innerText = projectName;
        const display = document.getElementById('content-body');
        let project = this.projects.getProjectByName(projectName);
        let todos = project.getToDos();

        todos.forEach(todo => { 
            display.innerHTML += `
            <button class='button-todo'>
                <i class="fas fa-list-ul"></i>
                    <span>${todo.getTitle()} </span>
                <i class="fas fa-times"></i>
            </button>`;
        })

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
    
    static loadDefaultData() {
        let note1 = new ToDo("firstNote", "Hello", "01/03/2021 00:00", 1, "First to-do list task");
        let note2 = new ToDo("secondNote", "Hellox2", "12/03/2021 00:00", 1, "Second to-do list task");
        let note3 = new ToDo("firstNote2ndProject", "Hi", "02/03/2021 00:00", 1, "Another task");
        
        let project1 = new Project("First Project", "1st Description");
        let project2 = new Project("Second Project", "1st Description");
    
        project1.addToDo(note1);
        project1.addToDo(note2);
        project2.addToDo(note3);
        this.projects.addProject(project1);
        this.projects.addProject(project2);
    }

}