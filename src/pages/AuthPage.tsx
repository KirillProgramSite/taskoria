import { AuthForm } from "@/modules/auth"
import { Link } from "react-router-dom"

const AuthPage = () => {
    return(
        // <>
        //     <h1>Auth Page</h1>
        //     <AuthForm />
        //     <Link to="/login">No account? Create!!</Link>
        // </>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-50">
            <div className="sm:flex block justify-between">
                <div className="flex-none mr-10">
                    <h1 className="font-jersey text-amber-50 text-3xl w-100">Welcome back to <strong className="text-[#B8001F]">Taskoria</strong></h1>
                    <p className="font-tilt text-amber-50 sm:w-100 w-auto mt-10">Your quests are waiting. Jump back into the adventure, defeat bosses 👾, complete tasks ⚔️, and continue leveling up your productivity. The journey isn't over yet! ✨</p>
                </div>
                <div className="flex-1 mt-10 sm:mt-0">
                    <AuthForm />
                    <div className="mt-5">
                        <Link to="/login" className="font-tilt text-[#F8FAFC]">No account yet? Create your hero & start your quest ⚔️</Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AuthPage

