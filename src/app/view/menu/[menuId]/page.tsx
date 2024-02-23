'use client'
import Header from "../../../components/header";
import RestaurantInfo from "../../../components/restaurantInfo";
import MenuCategories from "../../../components/menuCategories";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'

import { useEffect, useState } from "react";
import { useOrderStore } from "@/utils/provider/order-store-provider";
import { Button } from "antd";
import { MenuItem } from "@/models/models";


type Props = { params: any }

const MenuPage = (props: Props) => {
    const menuId = props.params.menuId

    const getOrder = () => {
        return window.localStorage.getItem('order') ? JSON.parse(window.localStorage.getItem('order') as any) : []
    }

    const updateOrder = (or: any[]) => {
        window.localStorage.setItem('order', JSON.stringify(or))
    }

    const updateOrderQuantity = (orderId: string, newQuantity: number) => {
        const order = getOrder();
        const updatedOrder = order.map((item: any) => {
            if (item.id === orderId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        updateOrder(updatedOrder);
    };

    useEffect(() => {
        // const or = getOrder()
        // const updatedOr = [...or, { id: "9970aaaf-ca93-455a-a435-c255b0067bed", quantity: 1 }]
        // console.log("order", getOrder())
        // updateOrder(updatedOr)
        console.log("order", getOrder())

        return () => {

        }
    }, [])


    return (
        <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "sans-serif" }}>
            <Header menuId={menuId} />
            <RestaurantInfo menuId={menuId} />
            <MenuCategories menuId={menuId} />
            {/* <Link href={`/view/menu/${menuId}/order`}><Footer>View order</Footer></Link> */}
        </main>
    )
}

export default MenuPage