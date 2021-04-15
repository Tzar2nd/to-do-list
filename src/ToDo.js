import { format, parseISO } from 'date-fns'

export default class ToDo {
    constructor(title) {
        this.title = title;
        this.dueDate = format(new Date(Date.now()), "yyyy-MM-dd");
        this.priority = 2;
        this.status = 'active';
    }

    getTitle() { return this.title; }
    getDueDate() { return this.dueDate; }
    getPriority() { return this.priority; }
    getStatus() { return this.status; }

    setStatus(status) { this.status = status; }
    setPriority(priority) { this.priority = priority; }
    setDueDate(dueDate) { this.dueDate = dueDate; }
}