export const nameToIdDiff = (name: string) => {
    const NORMAL = "normal"
    const RARE = "rare"
    const EPIC = "epic"
    const LEGENDARY = "legendary"


    switch (name) {
        case NORMAL: return 1;
        case RARE: return 2;
        case EPIC: return 3;
        case LEGENDARY: return 4;
    }
}