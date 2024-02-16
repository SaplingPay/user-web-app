import { supabaseClient, supabaseClientAnon } from "./client"
import { v4 as uuidv4 } from 'uuid';

export const getMenus = async({userId, token}) => {
    const supabase = await supabaseClient(token);
    const {data: menus} = await supabase.from("Menus").select("*")

    return menus
}

export const getMenusAnon = async() => {
    const supabase = await supabaseClientAnon();
    const {data: menus} = await supabase.from("Menus").select("*")

    return menus
}

export const createMenu = async({userId, token, title}) => {
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

export const getMenuItems = async({userId, token, menuId}) => {
    const supabase = await supabaseClient(token);
    const {data: menuItems} = await supabase.from("MenuItems").select("*").eq('menu', menuId)

    return menuItems
}

export const getMenuItemsAnon = async({menuId}) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItems} = await supabase.from("MenuItems").select("*").eq('menu', menuId)

    return menuItems
}

export const getMenuItemAnon = async({itemId}) => {
    const supabase = await supabaseClientAnon();
    const {data: menuItem} = await supabase.from("MenuItems").select("*").eq('uuid', itemId)

    return menuItem
}

export const getFile = async({token, path}) => {
    const supabase = await supabaseClient(token);

    const { data } = supabase
        .storage.from('menu-assets')
        .getPublicUrl(path)

    return data
}

export const uploadFile = async({userId, token, fileName, file}) => {
    console.log(fileName, file)
    const supabase = await supabaseClient(token);
    // Use the JS library to create a bucket.

    const { data, error } = await supabase
        .storage
        .from('menu-assets')
        .upload(`${userId}/${uuidv4()}`, file.originFileObj, {
            contentType:file.type
        })

    if (error){
        console.error(error)
        return;
    }

    return data;    
}

export const createMenuItem = async({userId, token, name, description, price, menuUuid, imageUuid, imageURL}) => {
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