import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type { ITask } from "../types/task"
import { useTasksStore } from "@/store/useTasksStore"
import { nameToIdDiff } from "@/utils/nameToIdDiff"

import { Checkbox } from "@/components/ui/checkbox"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DiamondPlus } from "lucide-react"



interface TaskFormData {
    title: string
    decs: string
    dedline: string
    difficult: string
}



const TaskForm = () => {
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState<boolean>(false)

    const { register, handleSubmit, reset, control, watch } = useForm();
    const { createTask, tasks } = useTasksStore()
    const hasDeadline = watch("hasDeadline")


    const submitAddTask = async (data: TaskFormData) => {
        const { title, decs, dedline, difficult } = data


        const normalizedDedline = hasDeadline && dedline ? dedline : null
        await createTask(title, decs, normalizedDedline, difficult)
        reset()
        setOpen(false)

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><Button size="lg" className="font-tilt bg-[#F7374F]">Create Quest <DiamondPlus /></Button></DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(submitAddTask)}>
                    <Field className="">
                        <FieldLegend>Create your quest!</FieldLegend>
                        <FieldDescription>This appears on invoices and emails.</FieldDescription>
                        <FieldGroup>
                            <FieldLabel htmlFor="title-quest">
                                Title your quest
                            </FieldLabel>
                            <Input
                                id="title-quest"
                                placeholder="To do homework"
                                {...register("title")}
                            />

                            <FieldLabel htmlFor="desc-quest">
                                Description your quest
                            </FieldLabel>
                            <Input
                                id="desc-quest"
                                placeholder="It's hard, but i can to do"
                                {...register("decs")}
                            />

                            {hasDeadline && (<>
                                <FieldLabel htmlFor="dedline-quest">
                                    Dedline
                                </FieldLabel>

                                <Input
                                    id="dedline-quest"
                                    placeholder="It's hard, but i can to do"
                                    type="datetime-local"
                                    {...register("dedline")}
                                /></>)}



                            <FieldLabel htmlFor="difficult-quest">
                                Difficult for quest
                            </FieldLabel>

                            <Controller
                                control={control}
                                name="difficult"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Select difficult" />
                                        </SelectTrigger>

                                        <SelectContent className="w-80">
                                            <SelectGroup>
                                                <SelectLabel>EXP for Quest</SelectLabel>
                                                <SelectItem value="normal">Normal — <span className="text-muted-foreground">Quick tasks (5–15 min)</span></SelectItem>
                                                <SelectItem className="text-emerald-500" value="rare">
                                                    Rare — <span className="text-muted-foreground">Requires focus (30–60 min)</span>
                                                </SelectItem>
                                                <SelectItem className="text-fuchsia-700" value="epic">
                                                    Epic — <span className="text-muted-foreground">Deep work (1–3 hours)</span>
                                                </SelectItem>
                                                <SelectItem className="text-amber-300" value="legendary">
                                                    Legendary — <span className="text-muted-foreground">Big goal or milestone</span>
                                                </SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FieldGroup>
                                <Field orientation="horizontal">
                                    <Controller
                                        control={control}
                                        name="hasDeadline"
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    id="has-deadline"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                                />
                                                <FieldLabel htmlFor="has-deadline">
                                                    Add deadline for quest
                                                </FieldLabel>
                                            </>
                                        )}
                                    />
                                </Field>
                            </FieldGroup>
                            <Button type="submit" >Create Quest!</Button>
                        </FieldGroup>
                    </Field>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskForm