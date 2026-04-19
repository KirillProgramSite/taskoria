import { TaskForm } from "@/modules/tasks"
import { useTasksStore } from "@/store/useTasksStore"
import { useEffect } from "react"
import TaskCard from "@/modules/tasks/components/TaskCard"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"







const TasksPage = () => {
  const { tasks } = useTasksStore()
  const tasks_completed_arr = tasks.filter((task) => task.completed === true)
  const tasks_no_completed = tasks.filter((task) => task.completed === false)



  return (
    <div className=" justify-between">
      <div className="flex mb-10">
        <h1 className="font-jersey text-5xl mr-10">Your Quests!</h1>
        <TaskForm />
      </div>


      {/* {tasks.map((task) => <TaskCard {...task} />)} */}


      <Tabs defaultValue="tasks" className="">
        <TabsList className="bg-[#1E293B]">
          <TabsTrigger value="tasks" className="font-tilt text-white">All Tasks</TabsTrigger>
          <TabsTrigger value="tasks_completed" className="font-tilt text-white">Completed Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          {tasks.length === 0 ? (<p className="font-tilt text-2xl">Your quest log is empty… Create your mission ⚔️</p>) : tasks.map((task) => <TaskCard {...task} />) }
        </TabsContent>
        <TabsContent value="tasks_completed">
          {tasks_completed_arr.length === 0 ? (<p className="font-tilt text-2xl">No completed quests yet. Glory awaits 🏆</p>) : tasks_completed_arr.map((task) => <TaskCard {...task} />) }
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TasksPage

