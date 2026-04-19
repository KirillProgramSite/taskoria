import { Badge } from "@/components/ui/badge"
import { useTasksStore } from "@/store/useTasksStore"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import type { ITask } from "../types/task"



const TasksToday = () => {
    const { tasks } = useTasksStore()
    
    const taskToday:ITask[] = tasks
          .filter((task) => {
            const taskDate = new Date(task.created_at)
            const today = new Date()

            return taskDate.toDateString() === today.toDateString() && task.completed === false
          })
          .slice(0, 3)
    return(
        <div className="mb-20">
            <h2 className="font-tilt text-2xl mb-5">Tasks Today</h2>

            {taskToday.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {taskToday.map((task) => (
                        <Link to={`/tasks/${task.id}`} key={task.id} className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                            <div>
                                <h3 className="font-tilt text-lg">{task.title}</h3> 
                                <p className="text-sm text-gray-400">{format(new Date(task.created_at), "HH:mm")}</p>
                            </div>
                            <Badge  className="text-sm bg-green-500">{task.xpReward} XP</Badge>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No tasks for today. Enjoy your day!</p>
            )}
        </div>
    )
}

export default TasksToday