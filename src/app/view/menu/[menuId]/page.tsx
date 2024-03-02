'use client'
import HeaderV2 from '@/app/components/headerV2'
import MenuCategoriesV2 from '@/app/components/menuCategoriesV2'
import RestaurantInfoV2 from '@/app/components/restaurantInfoV2'
import Title from 'antd/es/typography/Title'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

type Props = {
    params: any
}

// const PROXY = "/api/proxy?url=" + process.env.PROXY_URL //"/api/proxy?url=http://localhost:8080" //https://server-go.fly.dev

const Page = (props: Props) => {
    const PROXY = "/api/proxy?url=" + process.env.PROXY_URL
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

    const useWidth = () => {
        const [width, setWidth] = useState(0)
        const handleResize = () => setWidth(window.innerWidth)
        useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return width
    }

    const size = useWidth();

    return (size <= 800 ?
        <main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <HeaderV2 menu={menu} />
            <RestaurantInfoV2 menu={menu} setDietaryFilter={setDietaryFilter} setAllergenFilter={setAllergenFilter} />
            <MenuCategoriesV2 menu={menu} dietaryFilter={dietaryFilter} allergenFilter={allergenFilter} />

        </main > :
        <div style={{ textAlign: "center", padding: "5em" }}>
            <Title level={2}>Please use a mobile device to view this page.</Title>
        </div>
    )
}

export default Page