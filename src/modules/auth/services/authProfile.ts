import supabase from "@/utils/superbase"


export const authProfile = async (email:string, password:string) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if(error){
        console.error("Ошибка входа:", error.message)
        return null
    }

    return data
}