import { Button } from "@/components/ui/button"
import lootbox_close from "../../../../public/img/close_box.png"
import lootbox_open from "../../../../public/img/open_box.png"
import { useTasksStore } from "@/store/useTasksStore"
import { useState } from "react"
import { useCharacterStore } from "@/store/useCharacterStore"

const LootBox = () => {
    const { tasks } = useTasksStore()
    const { addExpCharacter } = useCharacterStore()

    const today = new Date().toDateString()

    const completedToday =
        tasks.some(
            task =>
                task.completed &&
                new Date(task.created_at).toDateString() === today
        )

    const [openedToday, setOpenedToday] = useState(
        localStorage.getItem("lootboxDate") === today
    )

    const openLootBox = () => {
        if (!completedToday || openedToday) return

        addExpCharacter(30)
        setOpenedToday(true)
        localStorage.setItem("lootboxDate", today)
    }


    return (
        <div className="mt-5 flex justify-center items-center bg-[#1E293B] p-5 rounded-lg">
            <img
                className="w-80"
                src={openedToday ? lootbox_open : lootbox_close}
                alt="Loot Box"
            />
            <div className="ml-4">
                <h1 className="font-jersey text-5xl mb-5">Daily Lootbox</h1>
                <p className="font-tilt text-lg mb-8">Open your daily lootbox and claim a random reward: gold, XP boost, rare item, or special bonus. One chance every day.</p>
                <Button
                    disabled={!completedToday || openedToday}
                    onClick={openLootBox}
                >
                    {openedToday ? "Lootbox Opened" : "Open Lootbox"}
                </Button>
            </div>
        </div>
    )
}


export default LootBox