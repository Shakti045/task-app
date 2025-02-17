import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react'
import { Task } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { addTask, updateTask } from '@/redux/taskSlice'

const TaskInput = ({open,setopen,editmode,oldtask}:{open:boolean,setopen:(value:boolean)=>void,editmode?:boolean,oldtask?:Task}) => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const  [task,setTask] = useState({
        title:'',
        description:'',
        prioritylevel:-1,
        duedate:Date.now() + 24 * 60 * 60 * 1000
    });

    const changeTaskvalue = (key:string,value:string|number)=>{
        setTask((prev)=>({
            ...prev,
            [key]:value
        }))
    }

    const submitehandler = ()=>{
        if(
            task.title.trim()===''||
            task.description.trim()===''||
            task.prioritylevel===-1
        ){
            return toast({
                title: "Invalid Task",
                description: "Please Fill All The Fields",
              })
        }   
        const newTask:Task = {
            id:editmode?oldtask?.id!:crypto.randomUUID(),
            title:task.title,
            description:task.description,
            prioritylevel:task.prioritylevel,
            duedate:task.duedate,
            completed:false
        }
        setTask({
            title:'',
            description:'',
            prioritylevel:-1,
            duedate:Date.now() + 24 * 60 * 60 * 1000
        })
        if(!editmode){
            dispatch(addTask(newTask));
        }else{
            dispatch(updateTask(newTask));
        }
        setopen(false);
        toast({
            title: `${editmode?'Task Updated Successfully':'Task Created Successfully'}`,
            description: `Task ${newTask.title} ${editmode?'updated':'created'} Successfully`,
          })
    }

   
    useEffect(()=>{
        if(editmode && oldtask){
            setTask(oldtask);
        }
    },[oldtask,editmode]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
    <DialogContent>
        <DialogTitle>
            {editmode?'Edit Your Task':'Create A New Task'}
        </DialogTitle>
        <DialogDescription>
            <div className=' mt-6 flex flex-col gap-3'>
               <Input value={task.title} onChange={(e)=>changeTaskvalue('title',e.target.value)} placeholder='Enter Task Title'/>
               <Textarea value={task.description} onChange={(e)=>changeTaskvalue('description',e.target.value)} rows={7} placeholder='Enter Task Description'/>
               <div className=' w-full flex justify-between'>
                <div className=' flex flex-col gap-2'>
                  <p>Choose Priority Of Task</p>
                  <div className=' flex gap-3 items-center'>
                    <Button className={`${task.prioritylevel==1?'opacity-100':'opacity-40'}`} onClick={()=>changeTaskvalue('prioritylevel',1)} >High</Button>
                    <Button className={`${task.prioritylevel==2?'opacity-100':'opacity-40'}`} onClick={()=>changeTaskvalue('prioritylevel',2)}>Medium</Button>
                    <Button className={`${task.prioritylevel==3?'opacity-100':'opacity-40'}`} onClick={()=>changeTaskvalue('prioritylevel',3)}>Low</Button>
                  </div>
                </div>
                    <div className=' flex flex-col gap-2'>
                        <p>Choose Due Date</p>
                        <DatePicker
                           selected={new Date(task.duedate)}
                           onChange={(date) => changeTaskvalue('duedate',date?.getTime() as number)}
                           showTimeSelect
                           dateFormat="Pp"
                           customInput={<Input />}
                          />
                    </div>
               </div>
            </div>
        </DialogDescription>
        <DialogFooter>
            <div className='w-full flex justify-center items-center mt-5'>
              <Button onClick={submitehandler}>
                    {editmode?'Edit Task':'Create Task'}
              </Button>
            </div>
       </DialogFooter>
    </DialogContent>
    
  </Dialog>
  )
}

export default TaskInput