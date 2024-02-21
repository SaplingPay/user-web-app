import React, { useEffect } from 'react'
import { Button, Card, Image } from "antd";
import Link from 'next/link';
const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 0,
    height: '35vw'
};
const DB_STORAGE_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

type Props = {
    menuItems: any[],
    menuId: any,
    filter: any
}

const DishGallery = (props: Props) => {
    const menuItems = props.filter === "overview" ? props.menuItems : props.menuItems.filter(i => i.categories == props.filter)
    const menuId = props.menuId

    return (
        <div>
            <Card>
                {menuItems.map((item: any) => {
                    return (
                        <Card.Grid key={item.uuid} style={gridStyle} hoverable={false}>
                            <Link href={`/view/menu/${menuId}/item/${item.uuid}`}>
                                <Image
                                    src={DB_STORAGE_URL + item.image_url}
                                    height={'100%'}
                                    width={'100%'}
                                    preview={false}
                                />
                            </Link>
                        </Card.Grid>
                    )
                })}
            </Card>
            <div style={{ width: "100%", height: "8vh", backgroundColor: "white" }}></div>
        </div>
    )
}

export default DishGallery