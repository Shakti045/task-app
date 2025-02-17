import { Task } from '@/constants'
import TaskCard from './TaskCard'

const OverDueTasks = ({tasks}:{tasks:Task[]}) => {
  return (
    <div className=' w-full'>
    <div>
     <h1 className=' text-2xl font-bold p-4'>Over Due Tasks</h1>
    </div>
    {
        tasks.length === 0 ? <p className='text-center'>No Over Due Tasks</p> : (
        <>{
             tasks.map((task)=>{
              return <TaskCard key={task.id} task={task}/>
            })
           }
        </>
        )
      }
 </div>
  )
}

export default OverDueTasks