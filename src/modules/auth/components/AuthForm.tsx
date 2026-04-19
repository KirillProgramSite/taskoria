import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { authProfile } from "../services/authProfile";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import supabase from "@/utils/superbase";
import { useNavigate } from "react-router-dom";



const AuthForm = () => {



    useEffect(() => {
        supabase.auth.getUser().then((response) => {
            const user = response.data.user
            if (user) {
                setEmail(user?.email)
            }
        })
    }, [])

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string | undefined>('anon')
    const navigate = useNavigate()

    const authUser = async (email, password) => {
        setLoading(true)

        try {
            const profileData = await authProfile(email, password);
            console.log("Успешный вход:", profileData?.user)

        } catch (error) {
            console.error(error);
            alert('не удалось войти')
        }
        finally {
            setLoading(false)
        }
    }


    const onAuthProfile = async (data) => {
        console.log("Данные из формы:", data)
        await authUser(data.email, data.password); // 👈 другая переменная
        if(!loading){
            navigate("/main")
        }
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onAuthProfile)}>
            <FieldSet>
                <FieldLegend className="font-tilt text-xl text-[#FCFAEE]">Log in</FieldLegend>
                <FieldDescription className="font-tilt text-[#FCFAEE] text-md">Return to the game & continue your quests ⚔️</FieldDescription>
                <FieldGroup>
                    <Field>
                        <FieldLabel className="font-tilt text-[#FCFAEE]" htmlFor="email">Email</FieldLabel>
                        <Input {...register("email")} className="font-tilt text-[#FCFAEE]" type="email" id="email" placeholder="Enter your email" />
                        {/* <FieldError>Choose another username.</FieldError> */}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password" className="font-tilt text-[#FCFAEE]">Password</FieldLabel>
                        <Input id="password" type="password" className="font-tilt text-[#FCFAEE]" {...register("password")} autoComplete="off" placeholder="Enter your password" />
                    </Field>
                </FieldGroup>
            </FieldSet>
            {loading ? (
                <Button variant="default" className="bg-[#94A3B8]" disabled type="submit">
                    Loading your quests...
                    <Spinner />
                </Button>) : (<Button type="submit" className="bg-[#F7374F] mt-10">Back to the Game</Button>)}


        </form>
    )
}

export default AuthForm