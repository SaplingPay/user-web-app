'use client'
import Header from "../../../components/header";
import RestaurantInfo from "../../../components/restaurantInfo";
import MenuCategories from "../../../components/menuCategories";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'

import { useEffect, useState } from "react";

type Props = { params: any }

const MenuPage = (props: Props) => {
    const menuId = props.params.menuId
    return (
        <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "sans-serif" }}>
            <Header menuId={menuId} />
            <RestaurantInfo menuId={menuId} />
            <MenuCategories menuId={menuId} />
            <Link href="/order"><Footer>View order</Footer></Link>
        </main>
    )
}

export default MenuPage