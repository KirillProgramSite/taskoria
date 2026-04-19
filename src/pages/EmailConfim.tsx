import { Link } from "react-router-dom"

const EmailConfimPage = () => {
    return(
        <div className="flex justify-center mt-50">
            <div className="">
                <h1 className="font-tilt text-amber-50 text-3xl w-100 text-center mb-15">Confirm your email</h1>
                <p className="font-jersey text-amber-50 text-3xl w-100 text-center">We've sent you an email. Please verify your address to get started!</p>
                <img className="w-100 mt-10" src="../public/img/email.gif" />
                <Link to="/login">To back</Link>
            </div>
        </div>
    )
}

export default EmailConfimPage

