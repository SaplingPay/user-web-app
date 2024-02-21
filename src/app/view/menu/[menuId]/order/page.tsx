"use client"
import { Button, Divider, FloatButton, Image } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import Footer from '../../../../components/Footer'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { MenuItem } from '@/models/models'
import axios from 'axios'
import { getMenuItemAnon } from '@/utils/supabase/requests'

type Props = {
    params: any
}

const DEFAULT_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"
const examples: MenuItem[] = [
    { id: "1", created_at: "now", name: "test", description: "test", price: 10, image_url: "", uuid: "1" }
]
const PROXY = "/api/proxy?url=https://server-go.fly.dev"

const OrderItem = (item: MenuItem) => {
    return (
        <div key={item.uuid}>
            <div style={{ display: "flex" }}>
                <Link href="/items/1">
                    <Image
                        src={DEFAULT_URL + item.image_url}
                        preview={false}
                        style={{ height: "25vw", width: "25vw" }}
                    />
                </Link>
                <div style={{ paddingLeft: "2vw", width: "100%", paddingRight: "2vw" }}>
                    <Link href="/items/1" style={{ textDecoration: "none", color: "black" }}>
                        <h3 style={{ marginBottom: "0" }}>{item.name}</h3>
                        <h5 style={{ marginTop: ".25em", marginBottom: ".5", fontWeight: "normal", color: "gray" }}>{item.description}</h5>
                    </Link>
                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0" }}>€{item.price / 100}</p>
                        <div style={{ display: "flex", marginLeft: "auto" }}>
                            <Button> - </Button>
                            <p style={{ marginLeft: "1em", marginRight: "1em", marginTop: "auto", marginBottom: "auto" }}> 1 </p>
                            <Button onClick={() => {

                            }}> + </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
        </div>

    )
}
const OrderFooter = (menuId: any) => {
    return (
        <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "20vh", backgroundColor: "white", flexDirection: "column" }}>
            <div style={{ display: "flex", paddingLeft: "5vw", paddingRight: "5vw", fontWeight: "bold", marginBottom: "0" }}>
                <p>Total:</p>
                <p style={{ marginLeft: "auto" }}>€40.1</p>
            </div>

            <Link
                href={`/view/menu/${menuId}`}
                style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "2vh",
                    borderRadius: "10px",
                    margin: "0 auto auto auto",
                    height: "30%",
                }}>
                <Button
                    style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                >
                    Add more items
                </Button>
            </Link>
            <Link
                href="/bill"
                style={{
                    width: "80%",
                    textAlign: "center",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    margin: "auto",
                    height: "30%"

                }}>
                <Button
                    type="primary"
                    style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                >
                    Place Order
                </Button>
            </Link>
        </div>
    )
}

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

const OrderPage = (props: Props) => {
    const menuId = props.params.menuId

    const [order, setOrder] = useState<any[]>([]);
    const memoizedOrder = useMemo(() => getOrder(), []); // Memoize getOrder
    const memoizedGetMenuItemAnon = useMemo(() => getMenuItemAnon, []); // Memoize getMenuItemAnon

    useEffect(() => {
        const loadOrders = async () => {
            const uniqueIds = new Set();
            const uniqueOr = memoizedOrder.filter((el: any) => {
                if (uniqueIds.has(el.id)) {
                    return false;
                } else {
                    uniqueIds.add(el.id);
                    return true;
                }
            });

            // Use Promise.all to fetch menu items for unique orders
            const promises = uniqueOr.map((el: any) => memoizedGetMenuItemAnon({ itemId: el.id }));
            try {
                const results = await Promise.all(promises);
                setOrder(results.filter((res) => res)); // Filter out undefined results
            } catch (error) {
                console.error(error);
            }
        };

        loadOrders();
    }, [memoizedOrder, memoizedGetMenuItemAnon]);

    return (
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
            <div style={{ textAlign: "center", position: "fixed", width: "100%", height: "10vh", backgroundColor: "white", zIndex: "1" }}>
                <h2>Order for Table #21</h2>
                <Link href={`/view/menu/${menuId}`}><FloatButton icon={<ArrowLeftOutlined />} style={{ left: 24, top: 20 }} /></Link>
            </div>
            <div style={{ marginTop: "10vh" }}>
                {order.map((item: MenuItem[]) => {
                    return (
                        // <OrderItem key={item[0].uuid} uuid={item[0].uuid} id={item[0].id} name={item[0].name} image_url={item[0].image_url} created_at={item[0].created_at} description={item[0].description} price={item[0].price} />
                        <div key={item[0].uuid}>
                            <div style={{ display: "flex" }}>
                                <Link href={`/view/menu/${menuId}/item/${item[0].uuid}`}>
                                    <Image
                                        src={DEFAULT_URL + item[0].image_url}
                                        preview={false}
                                        style={{ height: "25vw", width: "25vw" }}
                                    />
                                </Link>
                                <div style={{ paddingLeft: "2vw", width: "100%", paddingRight: "2vw" }}>
                                    <Link href={`/view/menu/${menuId}/item/${item[0].uuid}`} style={{ textDecoration: "none", color: "black" }}>
                                        <h3 style={{ marginBottom: "0" }}>{item[0].name}</h3>
                                        <h5 style={{ marginTop: ".25em", marginBottom: ".5", fontWeight: "normal", color: "gray" }}>{item[0].description}</h5>
                                    </Link>
                                    <div style={{ display: "flex" }}>
                                        <p style={{ margin: "0" }}>€{item[0].price / 100}</p>
                                        <div style={{ display: "flex", marginLeft: "auto" }}>
                                            <Button> - </Button>
                                            <p style={{ marginLeft: "1em", marginRight: "1em", marginTop: "auto", marginBottom: "auto" }}> 1 </p>
                                            <Button onClick={() => {

                                            }}> + </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
                        </div>
                    )
                })}
            </div>

            <div style={{ width: "100%", height: "18vh", backgroundColor: "white" }}></div>
            <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "20vh", backgroundColor: "white", flexDirection: "column" }}>
                <div style={{ display: "flex", paddingLeft: "5vw", paddingRight: "5vw", fontWeight: "bold", marginBottom: "0" }}>
                    <p>Total:</p>
                    <p style={{ marginLeft: "auto" }}>€40.1</p>
                </div>

                <Link
                    href={`/view/menu/${menuId}`}
                    // href={"/"}
                    style={{
                        width: "80%",
                        textAlign: "center",
                        fontSize: "2vh",
                        borderRadius: "10px",
                        margin: "0 auto auto auto",
                        height: "30%",
                    }}>
                    <Button
                        style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                    >
                        Add more items
                    </Button>
                </Link>
                <Link
                    href={`/view/menu/${menuId}/bill`}
                    style={{
                        width: "80%",
                        textAlign: "center",
                        backgroundColor: "black",
                        borderRadius: "10px",
                        margin: "auto",
                        height: "30%"

                    }}>
                    <Button
                        type="primary"
                        style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                    >
                        Place Order
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default OrderPage