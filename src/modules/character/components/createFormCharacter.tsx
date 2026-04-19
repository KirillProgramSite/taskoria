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
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { post_character, upload_avatar } from "../services/characterApi";



const CreateFormCharacter = ({ user }) => {
    const { register, handleSubmit, reset, control } = useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const createCharacter = async (data) => {
        const file = data.avatar[0]
        const url = await upload_avatar(file, user.id)
        await post_character(user, data.username, url, user.email)
        // if(!loading){
        //     navigate("/main")
        // }
    }

    return (
        <form onSubmit={handleSubmit(createCharacter)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel className="font-tilt text-[#FCFAEE]" htmlFor="email">Name Character</FieldLabel>
                        <Input {...register("username")} className="font-tilt text-[#FCFAEE]" type="text" id="email" placeholder="Enter your name" />
                        {/* <FieldError>Choose another username.</FieldError> */}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password" className="font-tilt text-[#FCFAEE]">Password</FieldLabel>
                        <Controller
                            name="avatar"        // имя поля в форме
                            control={control}    // объект из useForm()
                            defaultValue={[]}    // начальное значение
                            rules={{ required: false }} // валидация
                            render={({ field }) => (
                                <input
                                    type="file"
                                    onChange={(e) => field.onChange(e.target.files)}
                                />
                            )}
                        />
                    </Field>
                </FieldGroup>
            </FieldSet>

            {loading ? (
                <Button variant="default" className="bg-[#94A3B8]" disabled type="submit">
                    Creating your hero...
                    <Spinner />
                </Button>) : (<Button type="submit" className="bg-[#F7374F] mt-10">Create Character!</Button>)}
        </form>
    )
}

export default CreateFormCharacter