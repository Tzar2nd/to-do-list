import ToDo from './ToDo';
import Project from "./Project";
import { compareAsc, format } from 'date-fns'

function initWebsite() {
    console.log("hello, world");
    let note1 = new ToDo("firstNote", "Hello", "01/03/2021 00:00", 1, "First to-do list task");
    let note2 = new ToDo("secondNote", "Hellox2", "12/03/2021 00:00", 1, "Second to-do list task");
    let project1 = new Project("Today (Default)", "Description", "01/04/2021 00:00");

    project1.addToDo(note1);
    project1.addToDo(note2);
    console.table(project1);
}

export { initWebsite }; 