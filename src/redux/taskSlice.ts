import { Task } from '@/constants';
import {createSlice} from '@reduxjs/toolkit'

//giving name as tasks-shakti-app so that it will not conflict with other apps or from other submissions
const localstoragekey = "tasks-shakti-app";


interface TaskState{
    tasks:Task[];
}

const initialState:TaskState = {
    tasks: localStorage.getItem(localstoragekey) ? JSON.parse(localStorage.getItem(localstoragekey)!) : [],
}

export const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask:(state,action)=>{
            state.tasks.push(action.payload);
            localStorage.setItem(localstoragekey,JSON.stringify(state.tasks));
        },
        removeTask:(state,action)=>{
            state.tasks=state.tasks.filter((task)=>task.id!==action.payload);
            localStorage.setItem(localstoragekey,JSON.stringify(state.tasks));
        },
        updateTask:(state,action)=>{
            state.tasks=state.tasks.map((task)=>task.id===action.payload.id?action.payload:task);
            localStorage.setItem(localstoragekey,JSON.stringify(state.tasks));
        },
        tooglecompleted:(state,action)=>{
            state.tasks=state.tasks.map((task)=>task.id===action.payload?{...task,completed:!task.completed}:task);
            localStorage.setItem(localstoragekey,JSON.stringify(state.tasks));
        }
    }
})

export const {addTask,removeTask,updateTask,tooglecompleted}=taskSlice.actions;
export default taskSlice.reducer;