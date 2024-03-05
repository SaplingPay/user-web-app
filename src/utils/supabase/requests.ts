import { supabaseClient, supabaseClientAnon } from "./client"
import { v4 as uuidv4 } from 'uuid';

export const getMenus = async({token}: any) => {
    const supabase = await supabaseClient(token);
    const {data: menus} = await supabase.from("Menus").select("*")

    return menus
}

export const getMenusAnon = async() => {
    const supabase = await supabaseClientAnon();
    const {data: menus} = await supabase.from("Menus").select("*")

    return menus
}

export const createMenu = async({userId, token, title}: any) => {
    const supabase = await supabaseClient(token);
    const {data, error} = await supabase
        .from("Menus")
        .insert({
            "user_id": userId,
            "title": title,
        })
        .select()
    if (error){
        console.error(error)
        return;
    }

    return data;
}

export const getMenuAnon = async({menuId} : any) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItems} = await supabase.from("Menus").select("*").eq('uuid', menuId)

    return menuItems
}

export const getMenuItems = async({token, menuId} : any) => {
    const supabase = await supabaseClient(token);
    const {data: menuItems} = await supabase.from("MenuItems").select("*").eq('menu', menuId)

    return menuItems
}

export const getMenuItemsAnon = async({menuId} : any) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItems} = await supabase.from("MenuItems").select("*").eq('menu', menuId)

    return menuItems
}

export const getMenuCategoriesAnon = async({menuId} : any) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItems} = await supabase.from("MenuCategories").select("*").eq('menu', menuId)

    return menuItems
}

export const getMenuItemAnon = async({itemId} : any) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItem} = await supabase.from("MenuItems").select("*").eq('uuid', itemId)

    return menuItem
}

export const getFile = async({token, path} : any) => {
    const supabase = await supabaseClient(token);

    const { data } = supabase
        .storage.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string)
        .getPublicUrl(path)

    return data
}

export const uploadFile = async({userId, token, fileName, file} : any) => {
    console.log(fileName, file)
    const supabase = await supabaseClient(token);
    // Use the JS library to create a bucket.

    const { data, error } = await supabase
        .storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string)
        .upload(`${userId}/${uuidv4()}`, file.originFileObj, {
            contentType:file.type
        })

    if (error){
        console.error(error)
        return;
    }

    return data;    
}

export const createMenuItem = async({userId, token, name, description, price, menuUuid, imageUuid, imageURL}: any) => {
    const supabase = await supabaseClient(token);
    const {data, error} = await supabase
        .from("MenuItems")
        .insert({
            "name": name,
            "description": description,
            "price": price,
            "menu": menuUuid,
            "image": imageUuid,
            "image_url": imageURL
        })
        .select()
    if (error){
        console.error(error)
        return;
    }

    return data;
}