import { getExpNeededForLevel } from "./expNeedForLevel"

export const expForDiff = (name: string):number => {
    const NORMAL = "normal"
    const RARE = "rare"
    const EPIC = "epic"
    const LEGENDARY = "legendary"


    switch (name) {
        case NORMAL: return 10
        case RARE: return 25
        case EPIC: return 50
        case LEGENDARY: return 100
    }
}