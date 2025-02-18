import { Task } from '@/constants'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { DeleteIcon, Edit2Icon } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import TaskInput from './TaskInput'
import { useDispatch } from 'react-redux'
import { removeTask, tooglecompleted } from '@/redux/taskSlice'

const TaskCard = ({task}:{task:Task}) => {
    const [editmode,seteditmode] = useState(false); 
    const dispatch = useDispatch();
  return (
    <div className=' w-full flex justify-between border-b-2 p-4 max-sm:flex-col max-sm:gap-2'>
        <div className=' flex gap-2 items-center '>
         <Checkbox onCheckedChange={()=>dispatch(tooglecompleted(task.id))} checked={task.completed}/>
         <Dialog>
            <DialogTrigger className='  w-[calc(100vw*0.5)]'>
                <p className=' text-start truncate'>{task.title.substring(0,100)} {
                     task.title.length>100?'...':''
                    }</p>
            </DialogTrigger>
            <DialogContent>
                <div className=' flex flex-col gap-6'>
                    <h1 className=' font-bold'>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            </DialogContent>
         </Dialog>
        </div>
        <div className=' flex gap-2 items-center'>
            <div className='p-2 rounded-md  '>
               <p>{new Date(task.duedate).toLocaleString()}</p>
            </div>
             <div className={`
                ${task.prioritylevel===1?'bg-red-500':task.prioritylevel===2?'bg-yellow-500':'bg-green-500'}  p-2 rounded-md`}>
                <p>{
                    task.prioritylevel===1?'High':task.prioritylevel===2?'Medium':'Low'
                }</p>
            </div>
            <Button onClick={()=>seteditmode(!editmode)}>
                <Edit2Icon/>
            </Button>
            <Button onClick={()=>{
                dispatch(removeTask(task.id));
            }}>
                <DeleteIcon/>
            </Button>
        </div>
        {
            editmode && (<TaskInput open={editmode} setopen={seteditmode} editmode={true} oldtask={task}/>)
        }
    </div>
  )
}

export default TaskCard