/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DOM)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToDo */ "./src/ToDo.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Storage */ "./src/Storage.js");




class DOM {

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
        let projects = _Storage__WEBPACK_IMPORTED_MODULE_2__.default.getToDoState().getProjects();
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

        if (_Storage__WEBPACK_IMPORTED_MODULE_2__.default.getToDoState().contains(projectName)) {
            alert("ToDo already exists, please enter a new one");
            return false; 
        }

        _Storage__WEBPACK_IMPORTED_MODULE_2__.default.addProject(new _Project__WEBPACK_IMPORTED_MODULE_0__.default(projectName));
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
        _Storage__WEBPACK_IMPORTED_MODULE_2__.default.deleteProject(projectName);
        document.getElementById(`project-${projectName}`).remove();
    }

    static createToDo(projectName) {
        const toDoName = document.getElementById('input-todo-name').value;

        if (toDoName === '') { 
            alert("Please enter a task name");
            return false;
        }

        _Storage__WEBPACK_IMPORTED_MODULE_2__.default.addToDo(projectName, new _ToDo__WEBPACK_IMPORTED_MODULE_1__.default(toDoName));
        
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
        const todos = _Storage__WEBPACK_IMPORTED_MODULE_2__.default.getToDoState().getProject(projectName).getToDos();
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
        _Storage__WEBPACK_IMPORTED_MODULE_2__.default.deleteToDo(projectName, toDoName);
        document.getElementById(`todo-${toDoName}`).remove();
    }


    
}

/***/ }),

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });


class Project {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.toDos = [];
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    setToDos(toDos) {
        this.toDos = toDos; 
    }

    getToDos() {
        return this.toDos;
    }

    addToDo(todo) {
        this.toDos.push(todo);
        console.log('adding todo');
    }

    getToDos() {
        return this.toDos; 
    }

    deleteToDo(toDoName) {
        const todo = this.toDos.find(
            (todo) => { todo.getTitle() === toDoName }
        );
        this.toDos.splice(this.toDos.indexOf(todo),1);
    }

}

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToDo */ "./src/ToDo.js");
/* harmony import */ var _ToDoApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDoApp */ "./src/ToDoApp.js");




class Storage {
    static saveToDoState(data) {
        localStorage.setItem('toDoApp', JSON.stringify(data));
    }

    static getToDoState() {
        const toDoApp = Object.assign(
            new _ToDoApp__WEBPACK_IMPORTED_MODULE_2__.default(),                              // target
            JSON.parse(localStorage.getItem('toDoApp')) // source
        );

        // assign projects
        toDoApp.setProjects(
            toDoApp
                .getProjects()
                .map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_0__.default(), project))
        );

        // assign todos
        toDoApp
            .getProjects()
            .forEach((project) => 
                project.setToDos(
                    project.getToDos().map(todo => Object.assign(new _ToDo__WEBPACK_IMPORTED_MODULE_1__.default(), todo))
                )
            );

        return toDoApp;
    }

    static addProject(project) {
        const toDoApp = Storage.getToDoState();
        console.log(`adding ${project.getName()}`);
        toDoApp.addProject(project);
        Storage.saveToDoState(toDoApp);
    }

    static deleteProject(projectName) {
        const toDoApp = Storage.getToDoState();
        console.log(`deleting ${projectName}`);
        toDoApp.deleteProject(projectName);
        Storage.saveToDoState(toDoApp);
    }

    static deleteToDo(projectName, toDoName) {
        const toDoApp = Storage.getToDoState();
        console.log(`deleting todo: ${toDoName}`);
        toDoApp.getProject(projectName).deleteToDo(toDoName);
        Storage.saveToDoState(toDoApp);
    }

    static addToDo(projectName, toDo) {
        const toDoApp = Storage.getToDoState();
        toDoApp.getProject(projectName).addToDo(toDo);
        Storage.saveToDoState(toDoApp);
    }


}

/***/ }),

/***/ "./src/ToDo.js":
/*!*********************!*\
  !*** ./src/ToDo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDo)
/* harmony export */ });


class ToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
    getTitle() { return this.title; }
    getDescription() { return this.description; }
    getDueDate() { return this.dueDate; }
    getPriority() { return this.priority; }
    getNotes() { return this.notes }
}

/***/ }),

/***/ "./src/ToDoApp.js":
/*!************************!*\
  !*** ./src/ToDoApp.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoApp)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _ToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToDo */ "./src/ToDo.js");
// The ToDo list app main logic code as differentiated from the DOM updates
// It also implements initial default data




class ToDoApp {
    constructor() {
        this.projects = [];
        let defaultProject = new _Project__WEBPACK_IMPORTED_MODULE_0__.default('Default Project', 'Default Project');
        let defaultNote = new _ToDo__WEBPACK_IMPORTED_MODULE_1__.default("default note", "Hello World", "01/03/2021 00:00", 1, "First to-do list task");
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
        console.log('trying to delete' + projectDelete);
        const project = this.projects.find(project => project.getName() === projectDelete);

        console.log(`definately deleting ${project}`);
        this.projects.splice(this.projects.indexOf(project),1);
    }
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

_DOM__WEBPACK_IMPORTED_MODULE_0__.default.loadUI();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1RvRG9BcHAuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDTjtBQUNNOztBQUVqQjs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QiwwREFBb0I7QUFDM0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscURBQXFELFlBQVk7QUFDakU7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ3hCLGdEQUFVLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVG9EbyBmcm9tICcuL1RvRG8nO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NIHtcblxuICAgIHN0YXRpYyBsb2FkVUkoKSB7XG4gICAgICAgIC8vU3RvcmFnZS5kZWxldGVQcm9qZWN0KFwidGVzdDJcIik7XG4gICAgICAgIERPTS5sb2FkUHJvamVjdHMoKTtcbiAgICAgICAgRE9NLmF0dGFjaFByb2plY3RCdXR0b25MaXN0ZW5lcnMoKTtcbiAgICAgICAgRE9NLmF0dGFjaFRvRG9FdmVudExpc3RlbmVycygpO1xuICAgICAgICBET00uc2VsZWN0RGVmYXVsdFByb2plY3QoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0RGVmYXVsdFByb2plY3QoKSB7XG4gICAgICAgIERPTS5jbGVhclRvRG9zKCk7XG4gICAgICAgIERPTS5sb2FkVG9Eb3MoJ0RlZmF1bHQgUHJvamVjdCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XG4gICAgICAgIGxldCBwcm9qZWN0cyA9IFN0b3JhZ2UuZ2V0VG9Eb1N0YXRlKCkuZ2V0UHJvamVjdHMoKTtcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4gRE9NLmRpc3BsYXlQcm9qZWN0KHByb2plY3QuZ2V0TmFtZSgpKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgbGV0IHByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0cy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPSdidXR0b24tcHJvamVjdCcgaWQ9J3Byb2plY3QtJHtwcm9qZWN0TmFtZX0nPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC11bFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3Byb2plY3ROYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzIGRlbGV0ZS1wcm9qZWN0XCI+PC9pPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+YCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJykubGFzdENoaWxkLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJvamVjdCcpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IERPTS5oYW5kbGVQcm9qZWN0Q2xpY2soZSwgcHJvamVjdE5hbWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlSGlkZGVuKGVsZW1lbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnROYW1lKTtcblxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7IFxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGF0dGFjaFByb2plY3RCdXR0b25MaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNhbmNlbC1wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RTYXZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1zYXZlLXByb2plY3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5ld1Byb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gRE9NLnRvZ2dsZUhpZGRlbignLm5ldy1wcm9qZWN0LWNvbnRhaW5lcicpKTtcbiAgICAgICAgcHJvamVjdENhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBET00uY2xlYXJOZXdQcm9qZWN0SW5wdXQoKSk7XG4gICAgICAgIHByb2plY3RTYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IERPTS5jcmVhdGVBbmREaXNwbGF5UHJvamVjdCgpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXR0YWNoVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBuZXdUb0RvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1uZXctdG9kbycpO1xuICAgICAgICBjb25zdCB0b0RvU2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tc2F2ZS10b2RvJyk7XG4gICAgICAgIGNvbnN0IHRvRG9DYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNhbmNlbC10b2RvJyk7XG5cbiAgICAgICAgbmV3VG9Eb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gRE9NLnRvZ2dsZUhpZGRlbignLm5ldy10b2RvLWNvbnRhaW5lcicpKTtcbiAgICAgICAgdG9Eb1NhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IERPTS5jcmVhdGVBbmREaXNwbGF5VG9EbygpKTtcbiAgICAgICAgdG9Eb0NhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gRE9NLmNsZWFyTmV3VG9Eb0lucHV0KCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVBbmREaXNwbGF5VG9EbygpIHtcbiAgICAgICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnRleHRDb250ZW50O1xuICAgICAgICBpZiAoRE9NLmNyZWF0ZVRvRG8ocHJvamVjdE5hbWUpKSB7XG4gICAgICAgICAgICBET00uY2xlYXJOZXdUb0RvSW5wdXQoKTtcbiAgICAgICAgICAgIERPTS5jbGVhclRvRG9zKCk7XG4gICAgICAgICAgICBET00ubG9hZFRvRG9zKHByb2plY3ROYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVBbmREaXNwbGF5UHJvamVjdCgpIHtcbiAgICAgICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXByb2plY3QtbmFtZScpLnZhbHVlO1xuICAgICAgICBpZiAoRE9NLmNyZWF0ZU5ld1Byb2plY3QocHJvamVjdE5hbWUpKSB7XG4gICAgICAgICAgICBET00uZGlzcGxheVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgRE9NLmNsZWFyVG9Eb3MoKTtcbiAgICAgICAgICAgIERPTS5sb2FkVG9Eb3MocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgRE9NLmNsZWFyTmV3UHJvamVjdElucHV0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlTmV3UHJvamVjdChwcm9qZWN0TmFtZSkge1xuXG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gJycpIHsgXG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHByb2plY3QgbmFtZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdG9yYWdlLmdldFRvRG9TdGF0ZSgpLmNvbnRhaW5zKHByb2plY3ROYW1lKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJUb0RvIGFscmVhZHkgZXhpc3RzLCBwbGVhc2UgZW50ZXIgYSBuZXcgb25lXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIFN0b3JhZ2UuYWRkUHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZVByb2plY3RDbGljayhlLCBwcm9qZWN0TmFtZSkgeyBcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICAgICAgRE9NLmRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgRE9NLnNlbGVjdERlZmF1bHRQcm9qZWN0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgRE9NLmNsZWFyVG9Eb3MoKTtcbiAgICAgICAgRE9NLmxvYWRUb0Rvcyhwcm9qZWN0TmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2plY3QtJHtwcm9qZWN0TmFtZX1gKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlVG9Ebyhwcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCB0b0RvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC10b2RvLW5hbWUnKS52YWx1ZTtcblxuICAgICAgICBpZiAodG9Eb05hbWUgPT09ICcnKSB7IFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB0YXNrIG5hbWVcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBTdG9yYWdlLmFkZFRvRG8ocHJvamVjdE5hbWUsIG5ldyBUb0RvKHRvRG9OYW1lKSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyTmV3VG9Eb0lucHV0KCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZXctdG9kby1jb250YWluZXInKVswXS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dC10b2RvLW5hbWVcIikudmFsdWUgPSAnJztcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGNsZWFyTmV3UHJvamVjdElucHV0KCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmV3LXByb2plY3QtY29udGFpbmVyXCIpWzBdLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtcHJvamVjdC1uYW1lJykudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJUb0RvcygpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWJvZHknKTtcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZFRvRG9zKHByb2plY3ROYW1lKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKS5pbm5lclRleHQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgY29uc3QgdG9kb3MgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpLmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRvRG9zKCk7XG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiBET00uZGlzcGxheVRvRG8ocHJvamVjdE5hbWUsIHRvZG8pKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheVRvRG8ocHJvamVjdE5hbWUsIHRvZG8pIHtcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWJvZHknKTtcblxuICAgICAgICBkaXNwbGF5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxidXR0b24gY2xhc3M9J2J1dHRvbi10b2RvJyBpZD0ndG9kby0ke3RvZG8uZ2V0VGl0bGUoKX0nPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC11bFwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3Bhbj4keyB0b2RvLmdldFRpdGxlKCkgfSA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMgZGVsZXRlLXRvZG9cIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9idXR0b24+YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpc3BsYXkpO1xuICAgICAgICBsZXQgYnV0dG9uID0gZGlzcGxheS5sYXN0Q2hpbGQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS10b2RvJyk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gRE9NLmhhbmRsZVRvRG9DbGljayhlLCBwcm9qZWN0TmFtZSwgdG9kby5nZXRUaXRsZSgpKSk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaGFuZGxlVG9Eb0NsaWNrKGUsIHByb2plY3ROYW1lLCB0b0RvTmFtZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtdG9kbycpKSB7XG4gICAgICAgICAgICBET00uZGVsZXRlVG9Ebyhwcm9qZWN0TmFtZSwgdG9Eb05hbWUpO1xuICAgICAgICAgICAgRE9NLmNsZWFyVG9Eb3MoKTtcbiAgICAgICAgICAgIERPTS5sb2FkVG9Eb3MocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhgJHtwcm9qZWN0TmFtZX0gdG9kbydzIGNsaWNrZWRgKTsgICBcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVsZXRlVG9Ebyhwcm9qZWN0TmFtZSwgdG9Eb05hbWUpIHtcbiAgICAgICAgU3RvcmFnZS5kZWxldGVUb0RvKHByb2plY3ROYW1lLCB0b0RvTmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b2RvLSR7dG9Eb05hbWV9YCkucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICBcbn0iLCJpbXBvcnQgeyBmb3JtYXQsIHBhcnNlSVNPIH0gZnJvbSAnZGF0ZS1mbnMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy50b0RvcyA9IFtdO1xuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0VG9Eb3ModG9Eb3MpIHtcbiAgICAgICAgdGhpcy50b0RvcyA9IHRvRG9zOyBcbiAgICB9XG5cbiAgICBnZXRUb0RvcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Eb3M7XG4gICAgfVxuXG4gICAgYWRkVG9Ebyh0b2RvKSB7XG4gICAgICAgIHRoaXMudG9Eb3MucHVzaCh0b2RvKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0b2RvJyk7XG4gICAgfVxuXG4gICAgZ2V0VG9Eb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRG9zOyBcbiAgICB9XG5cbiAgICBkZWxldGVUb0RvKHRvRG9OYW1lKSB7XG4gICAgICAgIGNvbnN0IHRvZG8gPSB0aGlzLnRvRG9zLmZpbmQoXG4gICAgICAgICAgICAodG9kbykgPT4geyB0b2RvLmdldFRpdGxlKCkgPT09IHRvRG9OYW1lIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50b0Rvcy5zcGxpY2UodGhpcy50b0Rvcy5pbmRleE9mKHRvZG8pLDEpO1xuICAgIH1cblxufSIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVG9EbyBmcm9tICcuL1RvRG8nO1xuaW1wb3J0IFRvRG9BcHAgZnJvbSAnLi9Ub0RvQXBwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gICAgc3RhdGljIHNhdmVUb0RvU3RhdGUoZGF0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0FwcCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VG9Eb1N0YXRlKCkge1xuICAgICAgICBjb25zdCB0b0RvQXBwID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIG5ldyBUb0RvQXBwKCksICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0XG4gICAgICAgICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b0RvQXBwJykpIC8vIHNvdXJjZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFzc2lnbiBwcm9qZWN0c1xuICAgICAgICB0b0RvQXBwLnNldFByb2plY3RzKFxuICAgICAgICAgICAgdG9Eb0FwcFxuICAgICAgICAgICAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAgICAgICAgICAgLm1hcCgocHJvamVjdCkgPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLCBwcm9qZWN0KSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhc3NpZ24gdG9kb3NcbiAgICAgICAgdG9Eb0FwcFxuICAgICAgICAgICAgLmdldFByb2plY3RzKClcbiAgICAgICAgICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnNldFRvRG9zKFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmdldFRvRG9zKCkubWFwKHRvZG8gPT4gT2JqZWN0LmFzc2lnbihuZXcgVG9EbygpLCB0b2RvKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0b0RvQXBwO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgdG9Eb0FwcCA9IFN0b3JhZ2UuZ2V0VG9Eb1N0YXRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBhZGRpbmcgJHtwcm9qZWN0LmdldE5hbWUoKX1gKTtcbiAgICAgICAgdG9Eb0FwcC5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICBTdG9yYWdlLnNhdmVUb0RvU3RhdGUodG9Eb0FwcCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgdG9Eb0FwcCA9IFN0b3JhZ2UuZ2V0VG9Eb1N0YXRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBkZWxldGluZyAke3Byb2plY3ROYW1lfWApO1xuICAgICAgICB0b0RvQXBwLmRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBTdG9yYWdlLnNhdmVUb0RvU3RhdGUodG9Eb0FwcCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVRvRG8ocHJvamVjdE5hbWUsIHRvRG9OYW1lKSB7XG4gICAgICAgIGNvbnN0IHRvRG9BcHAgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRpbmcgdG9kbzogJHt0b0RvTmFtZX1gKTtcbiAgICAgICAgdG9Eb0FwcC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5kZWxldGVUb0RvKHRvRG9OYW1lKTtcbiAgICAgICAgU3RvcmFnZS5zYXZlVG9Eb1N0YXRlKHRvRG9BcHApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUb0RvKHByb2plY3ROYW1lLCB0b0RvKSB7XG4gICAgICAgIGNvbnN0IHRvRG9BcHAgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpO1xuICAgICAgICB0b0RvQXBwLmdldFByb2plY3QocHJvamVjdE5hbWUpLmFkZFRvRG8odG9Ebyk7XG4gICAgICAgIFN0b3JhZ2Uuc2F2ZVRvRG9TdGF0ZSh0b0RvQXBwKTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCwgcGFyc2VJU08gfSBmcm9tICdkYXRlLWZucydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9EbyB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIH1cbiAgICBnZXRUaXRsZSgpIHsgcmV0dXJuIHRoaXMudGl0bGU7IH1cbiAgICBnZXREZXNjcmlwdGlvbigpIHsgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247IH1cbiAgICBnZXREdWVEYXRlKCkgeyByZXR1cm4gdGhpcy5kdWVEYXRlOyB9XG4gICAgZ2V0UHJpb3JpdHkoKSB7IHJldHVybiB0aGlzLnByaW9yaXR5OyB9XG4gICAgZ2V0Tm90ZXMoKSB7IHJldHVybiB0aGlzLm5vdGVzIH1cbn0iLCIvLyBUaGUgVG9EbyBsaXN0IGFwcCBtYWluIGxvZ2ljIGNvZGUgYXMgZGlmZmVyZW50aWF0ZWQgZnJvbSB0aGUgRE9NIHVwZGF0ZXNcbi8vIEl0IGFsc28gaW1wbGVtZW50cyBpbml0aWFsIGRlZmF1bHQgZGF0YVxuXG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRvRG8gZnJvbSAnLi9Ub0RvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0FwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICAgICAgbGV0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQgUHJvamVjdCcsICdEZWZhdWx0IFByb2plY3QnKTtcbiAgICAgICAgbGV0IGRlZmF1bHROb3RlID0gbmV3IFRvRG8oXCJkZWZhdWx0IG5vdGVcIiwgXCJIZWxsbyBXb3JsZFwiLCBcIjAxLzAzLzIwMjEgMDA6MDBcIiwgMSwgXCJGaXJzdCB0by1kbyBsaXN0IHRhc2tcIik7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRvRG8oZGVmYXVsdE5vdGUpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xuICAgIH1cblxuICAgIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpO1xuICAgIH1cbiAgICBcbiAgICBjb250YWlucyhwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdERlbGV0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGRlbGV0ZScgKyBwcm9qZWN0RGVsZXRlKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qZWN0RGVsZXRlKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGVmaW5hdGVseSBkZWxldGluZyAke3Byb2plY3R9YCk7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwxKTtcbiAgICB9XG59XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBET00gZnJvbSBcIi4vRE9NXCI7XG5ET00ubG9hZFVJKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==