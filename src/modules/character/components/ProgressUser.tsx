import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { getExpNeededForLevel } from "@/utils/expNeedForLevel"
import { useCharacterStore } from "@/store/useCharacterStore"



const ProgressUser = () => {
    const { character } = useCharacterStore()

    return (<div className="">
        <div className="flex items-center gap-2 justify-end bg-[#1E293B] p-5 rounded-2xl">
            <Avatar size="lg">
                <AvatarImage src={character?.avatar} />
            </Avatar>

            <div className="gap-4">
                <Field className="w-70">
                    <FieldLabel htmlFor="progress-upload">
                        <span className="text-xl font-tilt">{character?.level} LVL</span>
                        <span className="text-xl font-tilt ml-auto">{character?.xp} XP / {getExpNeededForLevel(character?.level)} XP</span>
                    </FieldLabel>
                    <Progress value={character?.xp} id="progress-upload" className="w-80" max={getExpNeededForLevel(character?.level)} />
                </Field>
            </div>

        </div>
    </div>)
}


export default ProgressUser