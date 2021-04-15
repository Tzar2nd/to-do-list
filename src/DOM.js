import Project from './Project';
import ToDo from './ToDo';
import Storage from './Storage';
import { format } from 'date-fns';

export default class DOM {

    static loadUI() {
        DOM.loadProjects();
        DOM.attachProjectButtonListeners();
        DOM.attachToDoEventListeners();
        DOM.displaySpecificProjectsToDos('Default Project');
        document.addEventListener('keydown', e => { if (e.key === 'Escape') DOM.closeAllDialogues() });
    }

    static closeAllDialogues() {
        const projectDialogue = document.querySelector('.new-project-container');
        const toDoDialogue = document.querySelector('.new-todo-container');

        if (!toDoDialogue.classList.contains('hidden')) { 
            DOM.toggleToDoInput() 
            return; 
        };
        if (!projectDialogue.classList.contains('hidden')) { DOM.toggleProjectInput() };

    }

    static displaySpecificProjectsToDos(projectName) {
        DOM.clearToDos();
        DOM.loadToDos(projectName);
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
        let element = document.getElementsByClassName(elementName)[0];

        console.log('toggling');
        console.log(element);
        console.log("classlist:" + element.classList);

        if (element.classList.contains('hidden')) { 
            console.log('removing hidden');
            element.classList.remove('hidden');
        } else {
            console.log('adding hidden');
            element.classList.add('hidden');
        }
    }

    static toggleProjectInput() {
        const projectButton = document.querySelector('.chevron-icon-project');

        if (projectButton.classList.contains('fa-chevron-down')) {
            projectButton.classList.remove('fa-chevron-down');
            projectButton.classList.add('fa-chevron-up');
        } else {
            projectButton.classList.remove('fa-chevron-up');
            projectButton.classList.add('fa-chevron-down');
        }

        DOM.toggleHidden('new-project-container');
    }

    static toggleToDoInput() {
        const toDoButton = document.querySelector('.chevron-icon-todo');

        console.log(toDoButton);

        if (toDoButton.classList.contains('fa-chevron-right')) {
            toDoButton.classList.remove('fa-chevron-right');
            toDoButton.classList.add('fa-chevron-left');
        } else {
            toDoButton.classList.remove('fa-chevron-left');
            toDoButton.classList.add('fa-chevron-right');
        }

        DOM.toggleHidden('new-todo-container');
    }
    
    static attachProjectButtonListeners() {
        const newProjectButton = document.getElementById('new-project-button');
        const projectCancelButton = document.getElementById('button-cancel-project');
        const projectSaveButton = document.getElementById('button-save-project');
        
        newProjectButton.addEventListener("click", e => DOM.toggleProjectInput());
        projectCancelButton.addEventListener("click", e => DOM.clearNewProjectInput());
        projectSaveButton.addEventListener("click", e => DOM.createAndDisplayProject());
    }

    static attachToDoEventListeners() {
        const newToDoButton = document.getElementById('button-new-todo');
        const toDoSaveButton = document.getElementById('button-save-todo');
        const toDoCancelButton = document.getElementById('button-cancel-todo');

        newToDoButton.addEventListener('click', e => DOM.toggleToDoInput());
        toDoCancelButton.addEventListener('click', e => DOM.clearNewToDoInput());
        toDoSaveButton.addEventListener('click', e => DOM.createAndDisplayToDo());
    }

    static createAndDisplayToDo() {
        let projectName = document.getElementById('project-name').textContent;
        if (DOM.createToDo(projectName)) {
            DOM.clearToDos();
            DOM.loadToDos(projectName);
            DOM.clearNewToDoInput();
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
            alert("Please enter a unique project name");
            return false; 
        }

        Storage.addProject(new Project(projectName));
        return true; 
    }

    static handleProjectClick(e, projectName) { 
        if (e.target.classList.contains('delete-project')) {
            DOM.deleteProject(projectName);
            DOM.displaySpecificProjectsToDos('Default Project');
            return;
        }
        DOM.clearToDos();
        DOM.loadToDos(projectName);
    }

    static deleteProject(projectName) {
        if(projectName === 'Default Project') { 
            alert('You can not delete the default project');
            return; 
        }

        Storage.deleteProject(projectName);
        document.getElementById(`project-${projectName}`).remove();
    }

    static createToDo(projectName) {
        const toDoName = document.getElementById('input-todo-name').value;

        if (toDoName === '') { 
            alert("Please enter a task name");
            return false;
        }

        if (Storage.getToDoState().getProject(projectName).contains(toDoName)) {
            alert("Please enter a unique task name");
            return false; 
        }

        Storage.addToDo(projectName, new ToDo(toDoName));
        return true; 
    }

    static clearNewToDoInput() {
        document.getElementById("input-todo-name").value = '';
        DOM.toggleToDoInput();
    }
    
    static clearNewProjectInput() {
        document.getElementById('input-project-name').value = '';
        DOM.toggleProjectInput();
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
        const dueDate = todo.getDueDate();
        const todoTitle = todo.getTitle();
        let checkBoxStatus = '';
        let activeStatus = '';

        (todo.getStatus() === 'active') ? checkBoxStatus = 'fa-square' : checkBoxStatus = 'fa-check-square';
        (todo.getStatus() === 'active') ? activeStatus = '' : activeStatus = 'inactive';

        display.insertAdjacentHTML('beforeend',
        `<button class='button-todo ${activeStatus}' id='todo-${todo.getTitle()}'>
        <div>
            <i class="far ${checkBoxStatus} todo-checkbox"></i>
        </div>
        <div>
            <span>${ todoTitle }</span>
        </div>
        <div class='todo-buttons-right'>
            <p class='todo-priority'>${ todo.getPriority() }</p>
            <p class="due-date" id="due-date"></p>
            <input type="date" class="input-date" value='${dueDate}'>
            <i class="fas fa-times delete-todo"></i>
        </div>
        </button>`);

        DOM.colorToDoPriority(display.lastChild.querySelector('.todo-priority'), todo.getPriority());

        let checkBox = display.lastChild.querySelector('.todo-checkbox');
        checkBox.addEventListener('click', e => DOM.toggleCompleteToDo(e, projectName, todoTitle));

        let priorityButton = display.lastChild.querySelector('.todo-priority');
        priorityButton.addEventListener('click', e => DOM.togglePriority(e, projectName, todoTitle));

        let deleteButton = display.lastChild.querySelector('.delete-todo');
        deleteButton.addEventListener('click', e => DOM.handleToDoClick(e, projectName, todoTitle));

        let dateInput = display.lastChild.querySelector('.input-date');
        dateInput.addEventListener('change', e => DOM.setToDoDate(e, projectName, todoTitle));
    }

    static handleToDoClick(e, projectName, toDoName) {
        if (e.target.classList.contains('delete-todo')) {
            DOM.deleteToDo(projectName, toDoName);
            DOM.clearToDos();
            DOM.loadToDos(projectName);
        }  
    }

    static toggleCompleteToDo(e, projectName, toDoName) {
        const classList = e.target.classList; 
        let todoDiv = e.target.parentNode.parentNode; // todo container
        let status = '';

        if (classList.contains('fa-check-square')) {
            classList.remove('fa-check-square');
            classList.add('fa-square');
            todoDiv.classList.remove('inactive');
            status = 'active'
        } else if (classList.contains('fa-square')) {
            classList.remove('fa-square');
            classList.add('fa-check-square');
            todoDiv.classList.add('inactive');
            status = 'inactive';
        }

        Storage.setToDoStatus(projectName, toDoName, status);
    }

    static togglePriority(e, projectName, toDoName) {
        let priority = Number(e.target.textContent);

        (priority < 3) ? priority++ : priority = 1;
        e.target.textContent = priority; 
        Storage.setPriority(projectName, toDoName, priority);

        DOM.colorToDoPriority(e.target, priority);
    }

    static colorToDoPriority(priorityDiv, priority) {
        priorityDiv.classList.remove('priority-1');
        priorityDiv.classList.remove('priority-2');
        priorityDiv.classList.remove('priority-3');

        switch (priority) {
            case 1:
                priorityDiv.classList.add('priority-1')
                break;
            case 2:
                priorityDiv.classList.add('priority-2')
                break;
            case 3:
                priorityDiv.classList.add('priority-3')
                break;
        }
    }

    static deleteToDo(projectName, toDoName) {
        Storage.deleteToDo(projectName, toDoName);
        document.getElementById(`todo-${toDoName}`).remove();
    }

    static setToDoDate(e, projectName, toDoName) {
        const dueDate = format(new Date(e.target.value), 'yyyy-MM-dd'); 
        Storage.setToDoDate(projectName, toDoName, dueDate);
        DOM.displaySpecificProjectsToDos(projectName);
    }
}