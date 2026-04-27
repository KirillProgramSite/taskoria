import { useCharacterStore } from "@/store/useCharacterStore"
import { Skeleton } from "@/components/ui/skeleton"

import { OverdueTasks, TasksToday } from "@/modules/tasks"
import { ProgressUser } from "@/modules/character"
import LootBox from "@/modules/tasks/components/LootBox"






const MainPage = () => {
  const { character } = useCharacterStore()


  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="font-jersey text-5xl">Hello</h1>
          <div className="">{character?.username ? (<span className="text-[#F7374F] font-jersey text-5xl ml-2">{character?.username}</span>) : (<Skeleton className="h-6 w-40 rounded-3xl ml-2" />)}</div>
        </div>
        <ProgressUser />
      </div>
      {/* <div className="mt-20 flex  justify-between">
        <div className="flex-1">ff</div>
        <div className="flex-[2]">
          <TasksToday />
          <OverdueTasks />
        </div>
      </div> */}


      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">График</div>
        <div className="mt-10">
          <TasksToday />
          <OverdueTasks />
          <LootBox />
        </div>

        
        <div></div>
      </div>

    </div>

  )
}

export default MainPage

