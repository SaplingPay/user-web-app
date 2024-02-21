import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { DownCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

type Props = {
    menuId: any
}

const RestaurantInfo = (props: Props) => {
    const [menu, setMenus] = useState<Menu>()

    useEffect(() => {
        const loadMenus = async () => {
            const menuId = props.menuId
            console.log(menuId)
            const menu = getMenuAnon({ menuId })
            menu
                .then(res => {
                    if (res instanceof Array) {
                        setMenus(res[0])
                    }
                    console.log('ok', res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
        loadMenus()

    }, [])

    return (
        <div style={{ display: "flex", padding: "1vh 1vh 0 1vh", height: "8vh" }}>
            <div>
                <h1 style={{ marginBottom: "0", marginTop: "0" }}>{menu ? menu.title : ""}</h1>
                <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "5px", textAlign: "right", paddingRight: "2vh", display: "flex" }}>
                <DownCircleOutlined />
                <div className="location" style={{ marginLeft: "1vw" }}>{menu ? menu.location : ""}</div>
            </div>
        </div>
    )
}

export default RestaurantInfo