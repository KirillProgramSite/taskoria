export const idToName = (id: number) => {
    const NORMAL = "Normal"
    const RARE = "Rare"
    const EPIC = "Epic"
    const LEGENDARY = "Legendary"


    switch (id) {
        case 1: return NORMAL;
        case 2: return RARE;
        case 3: return EPIC;
        case 4: return LEGENDARY;
    }
}