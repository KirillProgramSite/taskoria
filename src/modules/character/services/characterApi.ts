import supabase from "@/utils/superbase"


export const post_character = async (user, username, avatar, email) => {
    const { error: insertError } = await supabase
        .from("character")
        .insert({
            user_id: user.id,
            email: email,
            username: username.trim(),
            avatar,
            xp: 0,
        })

    if (insertError) {
        console.log(insertError)
    }
}

export const upload_avatar = async (file, userId:string) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })


    const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

    return publicUrlData.publicUrl
}


export const fetch_user_character = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Пользователь не авторизован');
    }

    // Получаем данные персонажа по user_id
    const { data, error } = await supabase
        .from('character') // название вашей таблицы с персонажами
        .select('*')
        .eq('user_id', user.id) // поле, которое связывает пользователя и персонажа
        .single(); // если у пользователя только один персонаж

    if (error) throw error;

    return data;
}