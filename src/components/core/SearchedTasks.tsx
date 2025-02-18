import { Task } from '@/constants'
import TaskCard from './TaskCard'

const SearchedTasks = ({tasks}:{tasks:Task[]}) => {
  return (
    <div>
        {
            tasks.length === 0 ? <h1 className="text-center mt-6 text-2xl">No tasks found</h1> : tasks.map((task, index) => (
                <TaskCard key={task.id} task={task}/>
            ))
        }
    </div>
  )
}

export default SearchedTasks