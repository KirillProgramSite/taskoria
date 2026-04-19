//TODO: сделать стор для персонажа. Чтобы мгновенно обнавлялся уровень и exp персонажа

import { addExp, type ICharacter } from "@/modules/character";
import { fetch_user_character } from "@/modules/character/services/characterApi";
import { create } from "zustand";

interface CharacterStore {
    character: ICharacter;
    fetchCharacter: () => void
    addExpCharacter: (addExp: number) => void
}


export const useCharacterStore = create<CharacterStore>()((set, get) => ({
    character: {},

    fetchCharacter: async () => {
        try {
            const currentCharacter = await fetch_user_character()
            if (currentCharacter) {
                set({ character: currentCharacter })
            }
        } catch (error) {
            console.error("Ошибка при получения пользователя");
        }
    },
    addExpCharacter: async (addExpVal: number) => {
        try {
            const updatedCharacter: ICharacter = await addExp(addExpVal)
            if (updatedCharacter) {
                set({ character: { ...updatedCharacter } })
            }
        } catch (error) {
            console.error("Произошла ошибка при добавлении уровня");
        }
    },
}))