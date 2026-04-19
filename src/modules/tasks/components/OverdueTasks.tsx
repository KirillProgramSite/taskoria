import { Badge } from "@/components/ui/badge"
import { useTasksStore } from "@/store/useTasksStore"
import { format } from "date-fns"
import { Link } from "react-router-dom"


const OverdueTasks = () => {
    const {tasks} = useTasksStore()

    const overdueTasks = tasks
      .filter((task) => task.completed === false && task.dedline !== null && new Date(task.dedline) <= new Date())
      .slice(0, 3)

  return (
    <div className="mt-5 bg-[#F7374F] p-2 rounded-2xl">
        <h2 className="text-white font-tilt text-2xl mb-5">Overdue Tasks</h2>
        {overdueTasks.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {overdueTasks.map((task) => (
                        <Link to="tasks" key={task.id} className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                            <div>
                                <h3 className="font-tilt text-lg">{task.title}</h3>
                                <p className="text-sm text-red-400 mb-2">{format(new Date(task.dedline), "dd.MM.yy HH.mm")}</p>
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

export default OverdueTasks