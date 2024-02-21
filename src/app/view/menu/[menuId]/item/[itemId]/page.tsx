'use client'
import { getMenuItemAnon } from '@/utils/supabase/requests'
import { ArrowLeftOutlined, ArrowRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, FloatButton, Image, Tag } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
    params: any
}
const DB_STORAGE_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

export default function ItemPage(props: Props) {
    const menuId = props.params.menuId
    const itemId = props.params.itemId
    const [item, setItem] = useState<any>()
    const { push } = useRouter();

    useEffect(() => {
        const loadMenuItem = async () => {
            const menuItem = getMenuItemAnon({ itemId })
            menuItem
                .then(res => {
                    console.log(res)
                    if (res instanceof Array) {
                        setItem(res[0])
                    }
                })
        }
        loadMenuItem()

    }, [])

    const getOrder = () => {
        return window.localStorage.getItem('order') ? JSON.parse(window.localStorage.getItem('order') as any) : []
    }
    const updateOrder = (or: any[]) => {
        window.localStorage.setItem('order', JSON.stringify(or))
    }


    const addToOrder = () => {
        const or = getOrder()
        const updatedOr = [...or, { id: itemId, quantity: 1 }]
        console.log("order", getOrder())
        updateOrder(updatedOr)
        push(`/view/menu/${menuId}/order`)
    }

    return (
        (item ?
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
                <div>
                    <Link href={`/view/menu/${menuId}`}><FloatButton icon={<ArrowLeftOutlined />} style={{ left: 24, top: 20 }} /></Link>
                    <Image
                        style={{ maxHeight: "60vh", width: "100%" }}
                        src={DB_STORAGE_URL + item.image_url}
                        preview={false}
                        width="100%"
                    />
                </div>
                <div style={{ padding: "2vh 2vh 0 2vh ", marginBottom: "0" }}>
                    <div style={{ display: "flex" }}>
                        <h1 style={{ margin: "0" }}>{item.name}</h1>
                        <div style={{ marginLeft: "auto", marginTop: "0", paddingTop: "0" }}>
                            <h3 style={{ margin: "1vh 0 0 0", color: "orange" }}>€{parseInt(item.price) / 100}</h3>
                        </div>
                    </div>
                    <h3 style={{ color: "gray" }}>{item.description}</h3>
                </div>
                {/* <div style={{ display: "flex", marginLeft: "auto", paddingLeft: "2vh", paddingRight: "2vh" }}>
                <Button> - </Button>
                <h4 style={{ marginTop: "auto", marginBottom: "auto", marginLeft: "1em", marginRight: "1em" }}> 1 </h4>
                <Button> + </Button>
            </div> */}
                {/* <div style={{ paddingLeft: "2vh", paddingRight: "2vh", marginTop: "0" }}>
                <h3>Diet and Allergens</h3>
                <div style={{ display: "flex" }}>
                    <Tag color="magenta">Pescatarian</Tag>
                    <Tag color="volcano">Citrus</Tag>
                    <Tag color="orange">Kumquat</Tag>
                </div>
            </div> */}
                {/* <div style={{ paddingLeft: "2vh", paddingRight: "2vh", marginTop: "0" }}>
                <div>
                    <Button>Small</Button>
                    <Button style={{ marginLeft: "2vw" }}>Large</Button>
                </div>
                <div>
                    <h3>Customizations</h3>
                </div>
                <div>
                    <Button>Oat milk</Button>
                    <Button style={{ marginLeft: "2vw" }}>Coconut milk</Button>
                    <Button style={{ marginLeft: "2vw" }}>Iced</Button>
                </div>
            </div> */}

                <div style={{ width: "100%", height: "10vh", backgroundColor: "white" }}></div>
                {/* <Link href={"/order"}></Link> */}
                <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "8vh", backgroundColor: "white" }}>
                    <Button
                        onClick={addToOrder}
                        type="primary"
                        style={{
                            width: "80%",
                            textAlign: "center",
                            backgroundColor: "black",
                            fontSize: "2.5vh",
                            borderRadius: "10px",
                            margin: "auto",
                            height: "75%"
                        }}
                    >
                        Add to order
                    </Button>
                </div>
            </div>

            : "")

    )
}