'use client'
import Header from '@/app/components/header'
import MenuCategories from '@/app/components/menuCategories'
import RestaurantInfo from '@/app/components/restaurantInfo'
import Title from 'antd/es/typography/Title'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

type Props = {
    params: any
}

const Page = (props: Props) => {
    const PROXY = "/api/proxy?request="
    const [menu, setMenu] = useState<any>()
    const [menuItems, setMenuItems] = useState<any[]>([])

    const [dietaryFilter, setDietaryFilter] = useState<any[]>([])
    const [allergenFilter, setAllergenFilter] = useState<any[]>([])

    const [favorites, setFavorites] = useState<any[]>([])

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

    const useWidth = () => {
        const [width, setWidth] = useState(0)
        const handleResize = () => setWidth(window.innerWidth)
        useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])
        return width
    }

    const size = useWidth();

    return (size <= 800 ?
        <main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Header menu={menu} />
            <RestaurantInfo menu={menu} setDietaryFilter={setDietaryFilter} setAllergenFilter={setAllergenFilter} />
            <MenuCategories menu={menu} dietaryFilter={dietaryFilter} allergenFilter={allergenFilter} setFavorites={setFavorites} />

        </main > :
        <div style={{ textAlign: "center", padding: "5em" }}>
            <Title level={2}>Please use a mobile device to view this page.</Title>
        </div>
    )
}

export default Page