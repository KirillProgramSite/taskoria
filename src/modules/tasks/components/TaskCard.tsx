import { format } from "date-fns"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import type { ITask } from "../types/task"
import { idToName } from "@/utils/idToName"
import { Button } from "@/components/ui/button"
import { useTasksStore } from "@/store/useTasksStore"
import { useCharacterStore } from "@/store/useCharacterStore"


const colorBadge = (id: number) => {
    switch (id) {
        case 1: return "bg-gray-600"
        case 2: return "bg-emerald-600"
        case 3: return "bg-purple-600"
        case 4: return "bg-amber-500"
    }
}


const colorBg = (id: number) => {
    switch (id) {
        case 1: return "border-2 border-gray-700"
        case 2: return "border-2 border-emerald-800"
        case 3: return "border-2 border-purple-800"
        case 4: return "border-2 border-amber-700"
    }
}

const TaskCard = (task: ITask) => {
    const { completedTask , deleteTask} = useTasksStore()
    const { addExpCharacter } = useCharacterStore()
    const audio = new Audio('../../public/sound/exp.mp3')

    const onClaimReward = async (id_task: string, xp: number) => {
        try {
            completedTask(id_task)
            addExpCharacter(xp)
            audio.currentTime = 0
            audio.play()
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Card key={task.id} className={`${colorBg(task.difficult)} bg-gray-800 mb-5 text-white`}>
            <CardHeader>
                <CardTitle className="flex justify-between items-center font-jersey text-4xl">{task.title} {task.completed ? (<Badge className={`bg-gray-700 font-tilt text-white`}>Completed</Badge>) : (<Badge className={`${colorBadge(task.difficult)} font-tilt text-white`}>{idToName(task.difficult)}</Badge>)}</CardTitle>
                <CardDescription className="font-tilt text-white text-xl mt-2 mb-5">
                    <i>Description:</i> {task.decs}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                {task.dedline === null ? (<div></div>) : (<p>Dedline: {format(new Date(task.dedline), "EEE dd.MM.yy HH.mm")}</p>)}
                <div className="">
                    <Button disabled={task.completed} onClick={() => onClaimReward(task.id, task.xpReward)} className="bg-[#22C55E] hover:bg-[#16A34A] mr-3">{task.completed ? "Award received" : `Claim reward +${task.xpReward}XP`}</Button>
                    <Button onClick={() => deleteTask(task.id)} variant="destructive">Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}


export default TaskCard