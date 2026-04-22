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
import {loginProfile} from "../services/profileApi";
import { Button } from "@/components/ui/button";
import type { IUserLogin } from "../types/profileTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";


const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
});




const LoginForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: zodResolver(loginSchema)});
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const loginUser = async (email:string, password:string) => {
        setLoading(true)

        try {
            const profileData = await loginProfile(email, password);
        } catch (error) {
            console.error(error);
            alert('не удалось создать юзера')
        }
        finally {
            setLoading(false)
        }
    }


    const onAddProfile = async (data: IUserLogin) => {
        await loginUser(data.email, data.password);
        console.log("создался юзер")
        if (!loading) {
            navigate('/email-confim')
        }
    }

    return (
        <form onSubmit={handleSubmit(onAddProfile)}>
            <FieldSet>
                <FieldLegend className="font-tilt text-xl text-[#FCFAEE]">Create account</FieldLegend>
                <FieldDescription className="font-tilt text-[#94A3B8] text-md">Join the adventure and start your first quest ⚔️</FieldDescription>
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
                    Creating your hero...
                    <Spinner />
                </Button>) : (<Button type="submit" className="bg-[#F7374F] mt-10">Create Hero!</Button>)}
        </form>
    )
}

export default LoginForm