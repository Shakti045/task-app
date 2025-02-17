import { Task } from '@/constants'
import TaskCard from './TaskCard'

const UpcomingTasks = ({tasks}:{tasks:Task[]}) => {
  return (
    <div className=' w-full'>
    <div>
     <h1 className=' text-2xl font-bold p-4'>Upcoming Tasks</h1>
    </div>
      {
        tasks.length === 0 ? <p className='text-center'>No Upcoming Tasks</p> : (
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

export default UpcomingTasks