import { LoginForm } from "@/modules/profile"
import { Link } from "react-router-dom"

const LoginPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:pt-50 pt-30">
            <div className="sm:flex block justify-between">
                <div className="flex-none mr-10">
                    <h1 className="font-jersey text-[#F8FAFC] text-3xl w-100">Welcome to your Gamified Task Manager - <strong className="text-[#B8001F]">Taskoria</strong></h1>
                    <p className="font-tilt text-[#F8FAFC] sm:w-100 w-auto mt-10">Ready to level up your productivity? Here, you won't just check off to-dos—you'll complete epic quests ⚔️, battle fearsome bosses 👾, and unlock awesome rewards. Let the adventure begin! ✨</p>
                </div>
                <div className="flex-1 mt-10 sm:mt-0">
                    <LoginForm />
                    <div className="mt-5">
                        <Link to="/auth" className="font-tilt text-[#F8FAFC]">Already have an account? Log in & continue your quest ⚔️</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

