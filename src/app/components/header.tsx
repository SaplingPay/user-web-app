import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { Spin, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    menuId: any
}
const DEFAULT_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

const Header = (props: Props) => {
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
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            {/* <Tag
                style={{
                    position: "absolute",
                    top: "24vh",
                    left: "2vw",
                    backgroundColor: "gray",
                    color: "white",
                    padding: ".5em",
                    fontStyle: "italic",
                    borderRadius: "15px"
                }}>Ordering for Table #21</Tag> */}
            {menu ? <img
                src={menu.banner_url ? DEFAULT_URL + menu.banner_url : "/banner1.png"}
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
            /> : ""}

        </div>
    )
}

export default Header