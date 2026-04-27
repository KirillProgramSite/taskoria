import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { weekly_tasks } from "../services/taskApi"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"


type ChartItem = {
    day: string
    tasks: number
}


export const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#F7374F",
  },
} satisfies ChartConfig



const ChartTasks = () => {
    useEffect(() => {
        getWeeklyStats()
    }, [])

    const [chartData, setChartData] = useState<ChartItem[]>([])
    const [loading, setLoading] = useState(true)

    const getWeeklyStats = async () => {

        setLoading(true)


       
        const { data, error } = await weekly_tasks()

        if (error) {
            console.log(error)
            return
        }

        const stats: Record<string, number> = {
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            Sun: 0,
        }

        // считаем задачи по дням
        data.forEach((task) => {
            const day = new Date(task.completed_at).toLocaleDateString("en-US", {
                weekday: "short",
            })

            stats[day]++
        })

        const result = Object.entries(stats).map(([day, tasks]) => ({
            day,
            tasks,
        }))

        setChartData(result)
        setLoading(false)
    }

    if (loading) return <p>Загрузка...</p>

    return (
        <div className="w-full rounded-2xl bg-zinc-900 p-4 text-tilt">
            <h2 className="text-white font-jersey text-5xl mb-4">Hero Activity Log</h2>

            <ChartContainer config={chartConfig} className="w-full h-100">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ChartContainer>
        </div>
    )

}

export default ChartTasks