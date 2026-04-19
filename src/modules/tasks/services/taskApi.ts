import supabase from "@/utils/superbase";
import type { ITask } from "../types/task";



export const fetch_tasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Пользователь не авторизован');
    }


    const { data, error } = await supabase
        .from('task')
        .select('*')
        .eq('user_id', user.id)

    if (error) throw error;

    return data;
}

export const add_task = async (newTask: ITask) => {
    try {
        const { data, error } = await supabase
            .from("task")
            .insert(newTask)
            .select()

        return data
    } catch (error) {
        console.error("Ошибка при загрузке");
    }
}


export const completed_task = async (idTask: string) => {

    try {
        const { data, error } = await supabase
            .from('task')
            .update({ completed: true })
            .eq('id', idTask)
            .select()

        return data
    } catch (error) {
        console.error("Ошибка при выполнение таски");
    }
}

export const delete_task = async (idTask: string) => {
    try {
        const { data, error } = await supabase
            .from('task')
            .delete()
            .eq('id', idTask)

        return data
    } catch (error) {
        console.error("Ошибка при удалении таски");
    }
}