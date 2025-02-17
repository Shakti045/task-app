export const prioritylevels = {
    LOW: 1,
    MEDIUM: 2,
    HIGH:3
}

export interface Task{
    id:string;
    title:string;
    description:string;
    duedate:number;
    prioritylevel:number;
    completed:boolean;
}
