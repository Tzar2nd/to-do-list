/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/parseISO/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/parseISO/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (isNaN(date) || !date) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time) || time === null) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: null
  };
  var year = captures[1] && parseInt(captures[1]);
  var century = captures[2] && parseInt(captures[2]);
  return {
    year: century == null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return null;
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return null;
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return null; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),

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
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseISO/index.js");





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

        console.log((0,date_fns__WEBPACK_IMPORTED_MODULE_3__.default)(todo.getDueDate()));
        // let formattedDate = format(parseISO(todo.getFormattedDate()), "dd/MM/yyyy");
        // console.log(formattedDate);

        display.insertAdjacentHTML('beforeend',
        `<button class='button-todo' id='todo-${todo.getTitle()}'>
        <div>
            <i class="fas fa-list-ul"></i>
        </div>
        <div>
            <span>${ todo.getTitle() } </span>
        </div>
        <div>
            <p class="due-date" id="due-date"></p>
            <input type="date" class="input-date" value='2021-05-01'>
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
    getFormattedDate() { 
        //return `${this.dueDate.split('/')[0]} / ${this.dueDate.split('/')[1]} / ${this.dueDate.split('/')[2]}`;
    }
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
        let defaultNote = new _ToDo__WEBPACK_IMPORTED_MODULE_1__.default("default note", "Hello World", "01/03/2021", 1, "First to-do list task");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3RvSW50ZWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9wYXJzZUlTTy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1RvRG9BcHAuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7O0FDSmU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ptRDtBQUNNO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7QUFDeEUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsd0JBQXdCLEVBQUU7QUFDMUUsZ0NBQWdDLEVBQUUsVUFBVSxFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLGFBQWEsS0FBSztBQUNsQixZQUFZLFVBQVU7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxzQkFBc0I7QUFDN0Q7QUFDQTs7QUFFZTtBQUNmLEVBQUUsbUVBQVk7QUFDZDtBQUNBLHdGQUF3RixnRUFBUzs7QUFFakc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxFQUFFLFNBQVMsK0JBQStCLE9BQU8sRUFBRSxTQUFTLCtCQUErQjtBQUM5SCx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFNnQztBQUNOO0FBQ007QUFDWTs7QUFFN0I7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMERBQW9CO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRCxZQUFZO0FBQ2pFO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksMERBQW9CO0FBQ2hDO0FBQ0EseUI7QUFDQTs7QUFFQSxRQUFRLHdEQUFrQixLQUFLLDZDQUFPO0FBQ3RDLG9CO0FBQ0E7O0FBRUEsK0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSwyREFBcUI7QUFDN0IsMkNBQTJDLFlBQVk7QUFDdkQ7O0FBRUE7QUFDQTs7QUFFQSw4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHFEQUFlLGtCQUFrQiwwQ0FBSTs7QUFFN0Msb0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDBEQUFvQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLGlEQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsZ0JBQWdCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsWUFBWSxrQjtBQUNuQzs7QUFFQTtBQUNBLFFBQVEsd0RBQWtCO0FBQzFCLHdDQUF3QyxTQUFTO0FBQ2pEOzs7O0FBSUEsQzs7Ozs7Ozs7Ozs7Ozs7QUN2TTJDOztBQUU1QjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlDZ0M7QUFDTjtBQUNNOztBQUVqQjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLDZDQUFPO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsNkNBQU87QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSwwQ0FBSTtBQUN6RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxDOzs7Ozs7Ozs7Ozs7OztBQzlEdUQ7O0FBRXhDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DLHNCQUFzQix5QkFBeUI7QUFDL0Msa0JBQWtCLHFCQUFxQjtBQUN2QyxtQkFBbUIsc0JBQXNCO0FBQ3pDLGdCQUFnQjtBQUNoQix3QjtBQUNBLG9CQUFvQiwyQkFBMkIsS0FBSywyQkFBMkIsS0FBSywyQkFBMkI7QUFDL0c7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7O0FBRWdDO0FBQ047QUFDaUI7O0FBRTVCO0FBQ2Y7QUFDQTtBQUNBLGlDQUFpQyw2Q0FBTztBQUN4Qyw4QkFBOEIsMENBQUk7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJDQUEyQyxRQUFRO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ053QjtBQUN4QixnREFBVSxHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsImltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMDtcbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDA7XG52YXIgREVGQVVMVF9BRERJVElPTkFMX0RJR0lUUyA9IDI7XG52YXIgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1pdGVyOiAvW1QgXS8sXG4gIHRpbWVab25lRGVsaW1pdGVyOiAvW1ogXS9pLFxuICB0aW1lem9uZTogLyhbWistXS4qKSQvXG59O1xudmFyIGRhdGVSZWdleCA9IC9eLT8oPzooXFxkezN9KXwoXFxkezJ9KSg/Oi0/KFxcZHsyfSkpP3xXKFxcZHsyfSkoPzotPyhcXGR7MX0pKT98KSQvO1xudmFyIHRpbWVSZWdleCA9IC9eKFxcZHsyfSg/OlsuLF1cXGQqKT8pKD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8kLztcbnZhciB0aW1lem9uZVJlZ2V4ID0gL14oWystXSkoXFxkezJ9KSg/Ojo/KFxcZHsyfSkpPyQvO1xuLyoqXG4gKiBAbmFtZSBwYXJzZUlTT1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBQYXJzZSBJU08gc3RyaW5nXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gc3RyaW5nIGluIElTTyA4NjAxIGZvcm1hdCBhbmQgcmV0dXJuIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpc24ndCBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIGNhbm5vdCBwYXJzZSB0aGUgc3RyaW5nIG9yXG4gKiB0aGUgdmFsdWVzIGFyZSBpbnZhbGlkLCBpdCByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIC0gVGhlIHByZXZpb3VzIGBwYXJzZWAgaW1wbGVtZW50YXRpb24gd2FzIHJlbmFtZWQgdG8gYHBhcnNlSVNPYC5cbiAqXG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgLy8gQmVmb3JlIHYyLjAuMFxuICogICBwYXJzZSgnMjAxNi0wMS0wMScpXG4gKlxuICogICAvLyB2Mi4wLjAgb253YXJkXG4gKiAgIHBhcnNlSVNPKCcyMDE2LTAxLTAxJylcbiAqICAgYGBgXG4gKlxuICogLSBgcGFyc2VJU09gIG5vdyB2YWxpZGF0ZXMgc2VwYXJhdGUgZGF0ZSBhbmQgdGltZSB2YWx1ZXMgaW4gSVNPLTg2MDEgc3RyaW5nc1xuICogICBhbmQgcmV0dXJucyBgSW52YWxpZCBEYXRlYCBpZiB0aGUgZGF0ZSBpcyBpbnZhbGlkLlxuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICBwYXJzZUlTTygnMjAxOC0xMy0zMicpXG4gKiAgIC8vPT4gSW52YWxpZCBEYXRlXG4gKiAgIGBgYFxuICpcbiAqIC0gYHBhcnNlSVNPYCBub3cgZG9lc24ndCBmYWxsIGJhY2sgdG8gYG5ldyBEYXRlYCBjb25zdHJ1Y3RvclxuICogICBpZiBpdCBmYWlscyB0byBwYXJzZSBhIHN0cmluZyBhcmd1bWVudC4gSW5zdGVhZCwgaXQgcmV0dXJucyBgSW52YWxpZCBEYXRlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZUlTTygnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnKzAyMDE0MTAxJyB0byBkYXRlLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZUlTTygnKzAyMDE0MTAxJywgeyBhZGRpdGlvbmFsRGlnaXRzOiAxIH0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSVNPKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyA9PSBudWxsID8gREVGQVVMVF9BRERJVElPTkFMX0RJR0lUUyA6IHRvSW50ZWdlcihvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMpO1xuXG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzICE9PSAyICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDEgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdhZGRpdGlvbmFsRGlnaXRzIG11c3QgYmUgMCwgMSBvciAyJyk7XG4gIH1cblxuICBpZiAoISh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCkgPT09ICdbb2JqZWN0IFN0cmluZ10nKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgdmFyIGRhdGVTdHJpbmdzID0gc3BsaXREYXRlU3RyaW5nKGFyZ3VtZW50KTtcbiAgdmFyIGRhdGU7XG5cbiAgaWYgKGRhdGVTdHJpbmdzLmRhdGUpIHtcbiAgICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpO1xuICAgIGRhdGUgPSBwYXJzZURhdGUocGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nLCBwYXJzZVllYXJSZXN1bHQueWVhcik7XG4gIH1cblxuICBpZiAoaXNOYU4oZGF0ZSkgfHwgIWRhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIHRpbWUgPSAwO1xuICB2YXIgb2Zmc2V0O1xuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lKSB7XG4gICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcblxuICAgIGlmIChpc05hTih0aW1lKSB8fCB0aW1lID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0ZVN0cmluZ3MudGltZXpvbmUpIHtcbiAgICBvZmZzZXQgPSBwYXJzZVRpbWV6b25lKGRhdGVTdHJpbmdzLnRpbWV6b25lKTtcblxuICAgIGlmIChpc05hTihvZmZzZXQpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRpcnR5RGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUpOyAvLyBqcyBwYXJzZWQgc3RyaW5nIGFzc3VtaW5nIGl0J3MgaW4gVVRDIHRpbWV6b25lXG4gICAgLy8gYnV0IHdlIG5lZWQgaXQgdG8gYmUgcGFyc2VkIGluIG91ciB0aW1lem9uZVxuICAgIC8vIHNvIHdlIHVzZSB1dGMgdmFsdWVzIHRvIGJ1aWxkIGRhdGUgaW4gb3VyIHRpbWV6b25lLlxuICAgIC8vIFllYXIgdmFsdWVzIGZyb20gMCB0byA5OSBtYXAgdG8gdGhlIHllYXJzIDE5MDAgdG8gMTk5OVxuICAgIC8vIHNvIHNldCB5ZWFyIGV4cGxpY2l0bHkgd2l0aCBzZXRGdWxsWWVhci5cblxuICAgIHZhciByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0RnVsbFllYXIoZGlydHlEYXRlLmdldFVUQ0Z1bGxZZWFyKCksIGRpcnR5RGF0ZS5nZXRVVENNb250aCgpLCBkaXJ0eURhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICByZXN1bHQuc2V0SG91cnMoZGlydHlEYXRlLmdldFVUQ0hvdXJzKCksIGRpcnR5RGF0ZS5nZXRVVENNaW51dGVzKCksIGRpcnR5RGF0ZS5nZXRVVENTZWNvbmRzKCksIGRpcnR5RGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0KTtcbn1cblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge307XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMuZGF0ZVRpbWVEZWxpbWl0ZXIpO1xuICB2YXIgdGltZVN0cmluZzsgLy8gVGhlIHJlZ2V4IG1hdGNoIHNob3VsZCBvbmx5IHJldHVybiBhdCBtYXhpbXVtIHR3byBhcnJheSBlbGVtZW50cy5cbiAgLy8gW2RhdGVdLCBbdGltZV0sIG9yIFtkYXRlLCB0aW1lXS5cblxuICBpZiAoYXJyYXkubGVuZ3RoID4gMikge1xuICAgIHJldHVybiBkYXRlU3RyaW5ncztcbiAgfVxuXG4gIGlmICgvOi8udGVzdChhcnJheVswXSkpIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gbnVsbDtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF07XG4gIH0gZWxzZSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGFycmF5WzBdO1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXTtcblxuICAgIGlmIChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlci50ZXN0KGRhdGVTdHJpbmdzLmRhdGUpKSB7XG4gICAgICBkYXRlU3RyaW5ncy5kYXRlID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlcilbMF07XG4gICAgICB0aW1lU3RyaW5nID0gZGF0ZVN0cmluZy5zdWJzdHIoZGF0ZVN0cmluZ3MuZGF0ZS5sZW5ndGgsIGRhdGVTdHJpbmcubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGltZVN0cmluZykge1xuICAgIHZhciB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lLmV4ZWModGltZVN0cmluZyk7XG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nLnJlcGxhY2UodG9rZW5bMV0sICcnKTtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWV6b25lID0gdG9rZW5bMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5ncztcbn1cblxuZnVuY3Rpb24gcGFyc2VZZWFyKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXig/OihcXFxcZHs0fXxbKy1dXFxcXGR7JyArICg0ICsgYWRkaXRpb25hbERpZ2l0cykgKyAnfSl8KFxcXFxkezJ9fFsrLV1cXFxcZHsnICsgKDIgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KSQpJyk7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2gocmVnZXgpOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiB7XG4gICAgeWVhcjogbnVsbFxuICB9O1xuICB2YXIgeWVhciA9IGNhcHR1cmVzWzFdICYmIHBhcnNlSW50KGNhcHR1cmVzWzFdKTtcbiAgdmFyIGNlbnR1cnkgPSBjYXB0dXJlc1syXSAmJiBwYXJzZUludChjYXB0dXJlc1syXSk7XG4gIHJldHVybiB7XG4gICAgeWVhcjogY2VudHVyeSA9PSBudWxsID8geWVhciA6IGNlbnR1cnkgKiAxMDAsXG4gICAgcmVzdERhdGVTdHJpbmc6IGRhdGVTdHJpbmcuc2xpY2UoKGNhcHR1cmVzWzFdIHx8IGNhcHR1cmVzWzJdKS5sZW5ndGgpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlU3RyaW5nLCB5ZWFyKSB7XG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIGlmICh5ZWFyID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChkYXRlUmVnZXgpOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgc3RyaW5nXG5cbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIG51bGw7XG4gIHZhciBpc1dlZWtEYXRlID0gISFjYXB0dXJlc1s0XTtcbiAgdmFyIGRheU9mWWVhciA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbW9udGggPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzJdKSAtIDE7XG4gIHZhciBkYXkgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzNdKTtcbiAgdmFyIHdlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzRdKTtcbiAgdmFyIGRheU9mV2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNV0pIC0gMTtcblxuICBpZiAoaXNXZWVrRGF0ZSkge1xuICAgIGlmICghdmFsaWRhdGVXZWVrRGF0ZSh5ZWFyLCB3ZWVrLCBkYXlPZldlZWspKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF5T2ZJU09XZWVrWWVhcih5ZWFyLCB3ZWVrLCBkYXlPZldlZWspO1xuICB9IGVsc2Uge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMCk7XG5cbiAgICBpZiAoIXZhbGlkYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSB8fCAhdmFsaWRhdGVEYXlPZlllYXJEYXRlKHllYXIsIGRheU9mWWVhcikpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cblxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIE1hdGgubWF4KGRheU9mWWVhciwgZGF5KSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPyBwYXJzZUludCh2YWx1ZSkgOiAxO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWUodGltZVN0cmluZykge1xuICB2YXIgY2FwdHVyZXMgPSB0aW1lU3RyaW5nLm1hdGNoKHRpbWVSZWdleCk7XG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuXG4gIHZhciBob3VycyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbWludXRlcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMl0pO1xuICB2YXIgc2Vjb25kcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbM10pO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gaG91cnMgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUiArIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFICsgc2Vjb25kcyAqIDEwMDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgnLCcsICcuJykpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUodGltZXpvbmVTdHJpbmcpIHtcbiAgaWYgKHRpbWV6b25lU3RyaW5nID09PSAnWicpIHJldHVybiAwO1xuICB2YXIgY2FwdHVyZXMgPSB0aW1lem9uZVN0cmluZy5tYXRjaCh0aW1lem9uZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIDA7XG4gIHZhciBzaWduID0gY2FwdHVyZXNbMV0gPT09ICcrJyA/IC0xIDogMTtcbiAgdmFyIGhvdXJzID0gcGFyc2VJbnQoY2FwdHVyZXNbMl0pO1xuICB2YXIgbWludXRlcyA9IGNhcHR1cmVzWzNdICYmIHBhcnNlSW50KGNhcHR1cmVzWzNdKSB8fCAwO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lem9uZShob3VycywgbWludXRlcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKiAoaG91cnMgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUiArIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKTtcbn1cblxuZnVuY3Rpb24gZGF5T2ZJU09XZWVrWWVhcihpc29XZWVrWWVhciwgd2VlaywgZGF5KSB7XG4gIHZhciBkYXRlID0gbmV3IERhdGUoMCk7XG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvV2Vla1llYXIsIDAsIDQpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5RGF5ID0gZGF0ZS5nZXRVVENEYXkoKSB8fCA3O1xuICB2YXIgZGlmZiA9ICh3ZWVrIC0gMSkgKiA3ICsgZGF5ICsgMSAtIGZvdXJ0aE9mSmFudWFyeURheTtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgZGlmZik7XG4gIHJldHVybiBkYXRlO1xufSAvLyBWYWxpZGF0aW9uIGZ1bmN0aW9uc1xuLy8gRmVicnVhcnkgaXMgbnVsbCB0byBoYW5kbGUgdGhlIGxlYXAgeWVhciAodXNpbmcgfHwpXG5cblxudmFyIGRheXNJbk1vbnRocyA9IFszMSwgbnVsbCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuXG5mdW5jdGlvbiBpc0xlYXBZZWFySW5kZXgoeWVhcikge1xuICByZXR1cm4geWVhciAlIDQwMCA9PT0gMCB8fCB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpIHtcbiAgcmV0dXJuIG1vbnRoID49IDAgJiYgbW9udGggPD0gMTEgJiYgZGF0ZSA+PSAxICYmIGRhdGUgPD0gKGRheXNJbk1vbnRoc1ttb250aF0gfHwgKGlzTGVhcFllYXJJbmRleCh5ZWFyKSA/IDI5IDogMjgpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXlPZlllYXJEYXRlKHllYXIsIGRheU9mWWVhcikge1xuICByZXR1cm4gZGF5T2ZZZWFyID49IDEgJiYgZGF5T2ZZZWFyIDw9IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAzNjYgOiAzNjUpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlZWtEYXRlKF95ZWFyLCB3ZWVrLCBkYXkpIHtcbiAgcmV0dXJuIHdlZWsgPj0gMSAmJiB3ZWVrIDw9IDUzICYmIGRheSA+PSAwICYmIGRheSA8PSA2O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWUoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpIHtcbiAgaWYgKGhvdXJzID09PSAyNCkge1xuICAgIHJldHVybiBtaW51dGVzID09PSAwICYmIHNlY29uZHMgPT09IDA7XG4gIH1cblxuICByZXR1cm4gc2Vjb25kcyA+PSAwICYmIHNlY29uZHMgPCA2MCAmJiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8IDYwICYmIGhvdXJzID49IDAgJiYgaG91cnMgPCAyNTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lem9uZShfaG91cnMsIG1pbnV0ZXMpIHtcbiAgcmV0dXJuIG1pbnV0ZXMgPj0gMCAmJiBtaW51dGVzIDw9IDU5O1xufSIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVG9EbyBmcm9tICcuL1RvRG8nO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcbmltcG9ydCB7IGZvcm1hdCwgcGFyc2VJU08gfSBmcm9tICdkYXRlLWZucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTSB7XG5cbiAgICBzdGF0aWMgbG9hZFVJKCkge1xuICAgICAgICAvL1N0b3JhZ2UuZGVsZXRlUHJvamVjdChcInRlc3QyXCIpO1xuICAgICAgICBET00ubG9hZFByb2plY3RzKCk7XG4gICAgICAgIERPTS5hdHRhY2hQcm9qZWN0QnV0dG9uTGlzdGVuZXJzKCk7XG4gICAgICAgIERPTS5hdHRhY2hUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgRE9NLnNlbGVjdERlZmF1bHRQcm9qZWN0KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdERlZmF1bHRQcm9qZWN0KCkge1xuICAgICAgICBET00uY2xlYXJUb0RvcygpO1xuICAgICAgICBET00ubG9hZFRvRG9zKCdEZWZhdWx0IFByb2plY3QnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgICAgICBsZXQgcHJvamVjdHMgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpLmdldFByb2plY3RzKCk7XG4gICAgICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IERPTS5kaXNwbGF5UHJvamVjdChwcm9qZWN0LmdldE5hbWUoKSkpXG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdHMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nYnV0dG9uLXByb2plY3QnIGlkPSdwcm9qZWN0LSR7cHJvamVjdE5hbWV9Jz5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpc3QtdWxcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4+JHtwcm9qZWN0TmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lcyBkZWxldGUtcHJvamVjdFwiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PmApO1xuICAgICAgICBcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpLmxhc3RDaGlsZC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByb2plY3QnKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiBET00uaGFuZGxlUHJvamVjdENsaWNrKGUsIHByb2plY3ROYW1lKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZUhpZGRlbihlbGVtZW50TmFtZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkgeyBcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBhdHRhY2hQcm9qZWN0QnV0dG9uTGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBwcm9qZWN0Q2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jYW5jZWwtcHJvamVjdCcpO1xuICAgICAgICBjb25zdCBwcm9qZWN0U2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tc2F2ZS1wcm9qZWN0Jyk7XG4gICAgICAgIFxuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IERPTS50b2dnbGVIaWRkZW4oJy5uZXctcHJvamVjdC1jb250YWluZXInKSk7XG4gICAgICAgIHByb2plY3RDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gRE9NLmNsZWFyTmV3UHJvamVjdElucHV0KCkpO1xuICAgICAgICBwcm9qZWN0U2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBET00uY3JlYXRlQW5kRGlzcGxheVByb2plY3QoKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGF0dGFjaFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbmV3VG9Eb0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tbmV3LXRvZG8nKTtcbiAgICAgICAgY29uc3QgdG9Eb1NhdmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLXNhdmUtdG9kbycpO1xuICAgICAgICBjb25zdCB0b0RvQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jYW5jZWwtdG9kbycpO1xuXG4gICAgICAgIG5ld1RvRG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IERPTS50b2dnbGVIaWRkZW4oJy5uZXctdG9kby1jb250YWluZXInKSk7XG4gICAgICAgIHRvRG9TYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiBET00uY3JlYXRlQW5kRGlzcGxheVRvRG8oKSk7XG4gICAgICAgIHRvRG9DYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IERPTS5jbGVhck5ld1RvRG9JbnB1dCgpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQW5kRGlzcGxheVRvRG8oKSB7XG4gICAgICAgIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKERPTS5jcmVhdGVUb0RvKHByb2plY3ROYW1lKSkge1xuICAgICAgICAgICAgRE9NLmNsZWFyTmV3VG9Eb0lucHV0KCk7XG4gICAgICAgICAgICBET00uY2xlYXJUb0RvcygpO1xuICAgICAgICAgICAgRE9NLmxvYWRUb0Rvcyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQW5kRGlzcGxheVByb2plY3QoKSB7XG4gICAgICAgIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1wcm9qZWN0LW5hbWUnKS52YWx1ZTtcbiAgICAgICAgaWYgKERPTS5jcmVhdGVOZXdQcm9qZWN0KHByb2plY3ROYW1lKSkge1xuICAgICAgICAgICAgRE9NLmRpc3BsYXlQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIERPTS5jbGVhclRvRG9zKCk7XG4gICAgICAgICAgICBET00ubG9hZFRvRG9zKHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIERPTS5jbGVhck5ld1Byb2plY3RJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZU5ld1Byb2plY3QocHJvamVjdE5hbWUpIHtcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUgPT09ICcnKSB7IFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSBwcm9qZWN0IG5hbWVcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU3RvcmFnZS5nZXRUb0RvU3RhdGUoKS5jb250YWlucyhwcm9qZWN0TmFtZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiVG9EbyBhbHJlYWR5IGV4aXN0cywgcGxlYXNlIGVudGVyIGEgbmV3IG9uZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH1cblxuICAgICAgICBTdG9yYWdlLmFkZFByb2plY3QobmV3IFByb2plY3QocHJvamVjdE5hbWUpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgIH1cblxuICAgIHN0YXRpYyBoYW5kbGVQcm9qZWN0Q2xpY2soZSwgcHJvamVjdE5hbWUpIHsgXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgICAgIERPTS5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIERPTS5zZWxlY3REZWZhdWx0UHJvamVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIERPTS5jbGVhclRvRG9zKCk7XG4gICAgICAgIERPTS5sb2FkVG9Eb3MocHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9qZWN0LSR7cHJvamVjdE5hbWV9YCkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVRvRG8ocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgdG9Eb05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdG9kby1uYW1lJykudmFsdWU7XG5cbiAgICAgICAgaWYgKHRvRG9OYW1lID09PSAnJykgeyBcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdGFzayBuYW1lXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgU3RvcmFnZS5hZGRUb0RvKHByb2plY3ROYW1lLCBuZXcgVG9Ebyh0b0RvTmFtZSkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhck5ld1RvRG9JbnB1dCgpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV3LXRvZG8tY29udGFpbmVyJylbMF0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtdG9kby1uYW1lXCIpLnZhbHVlID0gJyc7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBjbGVhck5ld1Byb2plY3RJbnB1dCgpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5ldy1wcm9qZWN0LWNvbnRhaW5lclwiKVswXS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LXByb2plY3QtbmFtZScpLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyVG9Eb3MoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1ib2R5Jyk7XG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWRUb0Rvcyhwcm9qZWN0TmFtZSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJykuaW5uZXJUZXh0ID0gcHJvamVjdE5hbWU7XG4gICAgICAgIGNvbnN0IHRvZG9zID0gU3RvcmFnZS5nZXRUb0RvU3RhdGUoKS5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb0RvcygpO1xuICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4gRE9NLmRpc3BsYXlUb0RvKHByb2plY3ROYW1lLCB0b2RvKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlUb0RvKHByb2plY3ROYW1lLCB0b2RvKSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1ib2R5Jyk7XG5cbiAgICAgICAgY29uc29sZS5sb2cocGFyc2VJU08odG9kby5nZXREdWVEYXRlKCkpKTtcbiAgICAgICAgLy8gbGV0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXQocGFyc2VJU08odG9kby5nZXRGb3JtYXR0ZWREYXRlKCkpLCBcImRkL01NL3l5eXlcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZvcm1hdHRlZERhdGUpO1xuXG4gICAgICAgIGRpc3BsYXkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPGJ1dHRvbiBjbGFzcz0nYnV0dG9uLXRvZG8nIGlkPSd0b2RvLSR7dG9kby5nZXRUaXRsZSgpfSc+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saXN0LXVsXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuPiR7IHRvZG8uZ2V0VGl0bGUoKSB9IDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiPjwvcD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGNsYXNzPVwiaW5wdXQtZGF0ZVwiIHZhbHVlPScyMDIxLTA1LTAxJz5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzIGRlbGV0ZS10b2RvXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYnV0dG9uPmApO1xuICAgICAgICBjb25zb2xlLmxvZyhkaXNwbGF5KTtcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRpc3BsYXkubGFzdENoaWxkLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtdG9kbycpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IERPTS5oYW5kbGVUb0RvQ2xpY2soZSwgcHJvamVjdE5hbWUsIHRvZG8uZ2V0VGl0bGUoKSkpO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZVRvRG9DbGljayhlLCBwcm9qZWN0TmFtZSwgdG9Eb05hbWUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRvZG8nKSkge1xuICAgICAgICAgICAgRE9NLmRlbGV0ZVRvRG8ocHJvamVjdE5hbWUsIHRvRG9OYW1lKTtcbiAgICAgICAgICAgIERPTS5jbGVhclRvRG9zKCk7XG4gICAgICAgICAgICBET00ubG9hZFRvRG9zKHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coYCR7cHJvamVjdE5hbWV9IHRvZG8ncyBjbGlja2VkYCk7ICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVRvRG8ocHJvamVjdE5hbWUsIHRvRG9OYW1lKSB7XG4gICAgICAgIFN0b3JhZ2UuZGVsZXRlVG9Ebyhwcm9qZWN0TmFtZSwgdG9Eb05hbWUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9kby0ke3RvRG9OYW1lfWApLnJlbW92ZSgpO1xuICAgIH1cblxuXG4gICAgXG59IiwiaW1wb3J0IHsgZm9ybWF0LCBwYXJzZUlTTyB9IGZyb20gJ2RhdGUtZm5zJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMudG9Eb3MgPSBbXTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXREdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICAgIH1cblxuICAgIHNldFRvRG9zKHRvRG9zKSB7XG4gICAgICAgIHRoaXMudG9Eb3MgPSB0b0RvczsgXG4gICAgfVxuXG4gICAgZ2V0VG9Eb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRG9zO1xuICAgIH1cblxuICAgIGFkZFRvRG8odG9kbykge1xuICAgICAgICB0aGlzLnRvRG9zLnB1c2godG9kbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdG9kbycpO1xuICAgIH1cblxuICAgIGdldFRvRG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0RvczsgXG4gICAgfVxuXG4gICAgZGVsZXRlVG9Ebyh0b0RvTmFtZSkge1xuICAgICAgICBjb25zdCB0b2RvID0gdGhpcy50b0Rvcy5maW5kKFxuICAgICAgICAgICAgKHRvZG8pID0+IHsgdG9kby5nZXRUaXRsZSgpID09PSB0b0RvTmFtZSB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudG9Eb3Muc3BsaWNlKHRoaXMudG9Eb3MuaW5kZXhPZih0b2RvKSwxKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRvRG8gZnJvbSAnLi9Ub0RvJztcbmltcG9ydCBUb0RvQXBwIGZyb20gJy4vVG9Eb0FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIHN0YXRpYyBzYXZlVG9Eb1N0YXRlKGRhdGEpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvRG9BcHAnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRvRG9TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgdG9Eb0FwcCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICBuZXcgVG9Eb0FwcCgpLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldFxuICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9Eb0FwcCcpKSAvLyBzb3VyY2VcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhc3NpZ24gcHJvamVjdHNcbiAgICAgICAgdG9Eb0FwcC5zZXRQcm9qZWN0cyhcbiAgICAgICAgICAgIHRvRG9BcHBcbiAgICAgICAgICAgICAgICAuZ2V0UHJvamVjdHMoKVxuICAgICAgICAgICAgICAgIC5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gYXNzaWduIHRvZG9zXG4gICAgICAgIHRvRG9BcHBcbiAgICAgICAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAgICAgICAuZm9yRWFjaCgocHJvamVjdCkgPT4gXG4gICAgICAgICAgICAgICAgcHJvamVjdC5zZXRUb0RvcyhcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5nZXRUb0RvcygpLm1hcCh0b2RvID0+IE9iamVjdC5hc3NpZ24obmV3IFRvRG8oKSwgdG9kbykpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdG9Eb0FwcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHRvRG9BcHAgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgYWRkaW5nICR7cHJvamVjdC5nZXROYW1lKCl9YCk7XG4gICAgICAgIHRvRG9BcHAuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgU3RvcmFnZS5zYXZlVG9Eb1N0YXRlKHRvRG9BcHApO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHRvRG9BcHAgPSBTdG9yYWdlLmdldFRvRG9TdGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRpbmcgJHtwcm9qZWN0TmFtZX1gKTtcbiAgICAgICAgdG9Eb0FwcC5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgU3RvcmFnZS5zYXZlVG9Eb1N0YXRlKHRvRG9BcHApO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGVUb0RvKHByb2plY3ROYW1lLCB0b0RvTmFtZSkge1xuICAgICAgICBjb25zdCB0b0RvQXBwID0gU3RvcmFnZS5nZXRUb0RvU3RhdGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYGRlbGV0aW5nIHRvZG86ICR7dG9Eb05hbWV9YCk7XG4gICAgICAgIHRvRG9BcHAuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZGVsZXRlVG9Ebyh0b0RvTmFtZSk7XG4gICAgICAgIFN0b3JhZ2Uuc2F2ZVRvRG9TdGF0ZSh0b0RvQXBwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG9Ebyhwcm9qZWN0TmFtZSwgdG9Ebykge1xuICAgICAgICBjb25zdCB0b0RvQXBwID0gU3RvcmFnZS5nZXRUb0RvU3RhdGUoKTtcbiAgICAgICAgdG9Eb0FwcC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5hZGRUb0RvKHRvRG8pO1xuICAgICAgICBTdG9yYWdlLnNhdmVUb0RvU3RhdGUodG9Eb0FwcCk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBjb21wYXJlQXNjLCBmb3JtYXQsIHBhcnNlSVNPIH0gZnJvbSAnZGF0ZS1mbnMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG8ge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB9XG4gICAgZ2V0VGl0bGUoKSB7IHJldHVybiB0aGlzLnRpdGxlOyB9XG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7IHJldHVybiB0aGlzLmRlc2NyaXB0aW9uOyB9XG4gICAgZ2V0RHVlRGF0ZSgpIHsgcmV0dXJuIHRoaXMuZHVlRGF0ZTsgfVxuICAgIGdldFByaW9yaXR5KCkgeyByZXR1cm4gdGhpcy5wcmlvcml0eTsgfVxuICAgIGdldE5vdGVzKCkgeyByZXR1cm4gdGhpcy5ub3RlcyB9XG4gICAgZ2V0Rm9ybWF0dGVkRGF0ZSgpIHsgXG4gICAgICAgIC8vcmV0dXJuIGAke3RoaXMuZHVlRGF0ZS5zcGxpdCgnLycpWzBdfSAvICR7dGhpcy5kdWVEYXRlLnNwbGl0KCcvJylbMV19IC8gJHt0aGlzLmR1ZURhdGUuc3BsaXQoJy8nKVsyXX1gO1xuICAgIH1cbn0iLCIvLyBUaGUgVG9EbyBsaXN0IGFwcCBtYWluIGxvZ2ljIGNvZGUgYXMgZGlmZmVyZW50aWF0ZWQgZnJvbSB0aGUgRE9NIHVwZGF0ZXNcbi8vIEl0IGFsc28gaW1wbGVtZW50cyBpbml0aWFsIGRlZmF1bHQgZGF0YVxuXG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRvRG8gZnJvbSAnLi9Ub0RvJztcbmltcG9ydCB7IGZvcm1hdCwgcGFyc2VJU08gfSBmcm9tICdkYXRlLWZucydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0FwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICAgICAgbGV0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQgUHJvamVjdCcsICdEZWZhdWx0IFByb2plY3QnKTtcbiAgICAgICAgbGV0IGRlZmF1bHROb3RlID0gbmV3IFRvRG8oXCJkZWZhdWx0IG5vdGVcIiwgXCJIZWxsbyBXb3JsZFwiLCBcIjAxLzAzLzIwMjFcIiwgMSwgXCJGaXJzdCB0by1kbyBsaXN0IHRhc2tcIik7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRvRG8oZGVmYXVsdE5vdGUpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xuICAgIH1cblxuICAgIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpO1xuICAgIH1cbiAgICBcbiAgICBjb250YWlucyhwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdERlbGV0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGRlbGV0ZScgKyBwcm9qZWN0RGVsZXRlKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qZWN0RGVsZXRlKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGVmaW5hdGVseSBkZWxldGluZyAke3Byb2plY3R9YCk7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwxKTtcbiAgICB9XG59XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBET00gZnJvbSBcIi4vRE9NXCI7XG5ET00ubG9hZFVJKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==