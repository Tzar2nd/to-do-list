import { compareAsc, format, parseISO } from 'date-fns'

export default class ToDo {
    constructor(title) {
        this.title = title;
        this.dueDate = format(new Date(Date.now()), "yyyy-MM-dd");
        this.priority = 2;
    }
    getTitle() { return this.title; }
    getDueDate() { return this.dueDate; }
    getPriority() { return this.priority; }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    getFormattedDate() { 
        return `${this.dueDate.split('/')[0]}-${this.dueDate.split('/')[1]}-${this.dueDate.split('/')[2]}`;
    }
}