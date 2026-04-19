import supabase from "@/utils/superbase";
import type { ICharacter } from "../types/types"
import { getExpNeededForLevel } from "@/utils/expNeedForLevel";


export const addExp = async (earnedXP: number) => {
  const audio = new Audio('../../public/sound/level.mp3')
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: character, error: fetchError } = await supabase
    .from('character')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  if (fetchError || !character) {
    console.error(fetchError || "Character not found");
    return null;
  }

  
  const newXP = (character.xp ?? 0) + earnedXP;

  
  let newLevel = character.level ?? 1;
  while (newXP >= getExpNeededForLevel(newLevel)) {
    newLevel++;
    setTimeout(() => {
      audio.currentTime = 0 
      audio.play()
    }, 500)
  }

  
  const { data, error } = await supabase
    .from('character')
    .update({ xp: newXP, level: newLevel })
    .eq('user_id', character.user_id)
    .select('*')
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  
  return data;
};