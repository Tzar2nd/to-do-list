import Project from './Project';
import ToDo from './Project';

export default class DOM {
        
    static loadUI() {
        DOM.loadDefaultData();
        let content = document.getElementById('content');
            
        content.innerHTML = `<div>TEST</div>`
    }
    
    static loadDefaultData() {
        let note1 = new ToDo("firstNote", "Hello", "01/03/2021 00:00", 1, "First to-do list task");
        let note2 = new ToDo("secondNote", "Hellox2", "12/03/2021 00:00", 1, "Second to-do list task");
        let project1 = new Project("Today (Default)", "Description", "01/04/2021 00:00");
    
        projects.push(project1);
        project1.addToDo(note1);
        project1.addToDo(note2);
    }

    static loadProjects() {

    }

    static loadToDos() {

    }
}