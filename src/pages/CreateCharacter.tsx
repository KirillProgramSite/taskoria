import { CreateFormCharacter } from "@/modules/character"
import supabase from "@/utils/superbase"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const CreateCharacter = () => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        }
        fetchUser()
    }, [])


    return (
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-50">
            <h1 className="font-jersey text-amber-50 text-2xl w-100 mb-5">Choose your character name and avatar</h1>
            <p className="font-tilt text-amber-50 text-xl w-100 mb-10">This is how other users will see you. You can change it later.</p>
            <CreateFormCharacter user={user} />
        </div>
    )
}

export default CreateCharacter

