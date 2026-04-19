//TODO: Добавить отрисовку тасков


import type { ITask } from "@/modules/tasks";
import { add_task, completed_task, delete_task, fetch_tasks } from "@/modules/tasks/services/taskApi";
import { expForDiff } from "@/utils/expForDiff";
import { nameToIdDiff } from "@/utils/nameToIdDiff";
import supabase from "@/utils/superbase";
import { create } from "zustand";


interface TasksStore {
    tasks: ITask[]
    fetchTasks: () => void;
    createTask: (title: string, decs: string, dedline: string, difficult: string) => void
    deleteTask: (id_task: string) => void
    updateTask: (id_task: string, updateData: ITask) => void
    completedTask: (id_task: string) => void
}

const user = (await supabase.auth.getUser()).data.user



export const useTasksStore = create<TasksStore>()((set, get) => ({
    tasks: [],
    fetchTasks: async () => {
        try {
            const currentTasks: ITask = await fetch_tasks()
            if (currentTasks) {
                set(state => ({ tasks: currentTasks }))
            }
        } catch (error) {
            console.error("Ошибка при получения пользователя");
        }
    },


    createTask: async (title: string, decs: string, dedline: string, difficult: string) => {
        try {
            const newTask: ITask = {
                user_id: user?.id,
                title,
                decs,
                xpReward: expForDiff(difficult),
                dedline,
                difficult: nameToIdDiff(difficult),
            }

            const updateTask: ITask = await add_task(newTask)
            if (updateTask) {
                get().fetchTasks()
            }
        } catch (error) {
            console.error("Не удалось добавить задачу", error);

        }
    },
    deleteTask: async (id_task: string) => {
        try {
            const deleted: ITask = await delete_task(id_task)
            get().fetchTasks()

        } catch (error) {
            console.error(error);
        }

    },
    updateTask: (id_task: string, updateData: ITask) => { },
    completedTask: async (id_task: string) => {
        try {
            const completed: ITask = await completed_task(id_task)
            if (completed) {
                get().fetchTasks()
            }
        } catch (error) {
            console.error(error);
        }

    },
}))