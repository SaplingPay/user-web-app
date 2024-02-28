'use client'
import HeaderV2 from '@/app/components/headerV2'
import MenuCategoriesV2 from '@/app/components/menuCategoriesV2'
import RestaurantInfoV2 from '@/app/components/restaurantInfoV2'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

type Props = {
    params: any
}

const PROXY = "/api/proxy?url=http://localhost:8080" //https://server-go.fly.dev

const page = (props: Props) => {
    const [menu, setMenu] = useState<any>()
    const [menuItems, setMenuItems] = useState<any[]>([])

    const [dietaryFilter, setDietaryFilter] = useState<any[]>([])
    const [allergenFilter, setAllergenFilter] = useState<any[]>([])

    useEffect(() => {
        getMenu(props.params.menuId)
    }, [])

    const getMenu = async (menu_id: any) => {
        await axios.get(PROXY + '/menus/' + menu_id)
            .then((response) => {
                console.log("Menus data:");
                console.log(response.data?.data);
                setMenu(response?.data?.data ? response.data.data : null)
                setMenuItems(response?.data?.data ? response.data.data.items : [])
            })
            .catch((error: any) => {
                console.log("Error fetching menu data:", error);
                const status = error.response?.status;
                const data = error.response?.data;
                console.log(status, data)
            });
    }

    return (
        <main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <HeaderV2 menu={menu} />
            <RestaurantInfoV2 menu={menu} setDietaryFilter={setDietaryFilter} setAllergenFilter={setAllergenFilter} />
            <MenuCategoriesV2 menu={menu} dietaryFilter={dietaryFilter} allergenFilter={allergenFilter} />

        </main >
    )
}

export default page