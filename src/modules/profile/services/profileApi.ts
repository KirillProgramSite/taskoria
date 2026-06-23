import supabase from "@/utils/superbase"
import type { AuthResponse } from '@supabase/supabase-js'


export const loginProfile = async (email: string, password: string) => {
    const { error }: AuthResponse = await supabase.auth.signUp(({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:5173/create-character'
        }
    }))

    if (error) throw new Error(`Auth error: ${error.message}`)
}


export const handleLogout = async (redirect: void | Promise<void>) => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Ошибка при выходе:', error.message)
    } else {
      redirect('/auth') // явный редирект после выхода
    }
  }
