import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { CheckOutlined, CloseOutlined, DownCircleFilled, DownCircleOutlined, DownOutlined, FilterOutlined } from '@ant-design/icons'
import { Button, Drawer, FloatButton, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import ItemDrawer from "@/app/components/itemDrawer";
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { createStyles, useTheme } from 'antd-style';
import FilterDrawer from './filterDrawer'

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

    const [visible, setVisible] = useState(false)

    const useStyle = createStyles(() => ({
        'my-drawer-header': {
            background: "green",
        },
        'my-drawer-body': {
            background: "blue",
        },
    }));

    const { styles } = useStyle();

    const classNames: DrawerClassNames = {
        header: styles['my-drawer-header'],
        body: styles['my-drawer-body'],

    };

    const drawerStyles: DrawerStyles = {
        header: {
            display: "none",
        },
        body: {
            padding: 0,
        },
    };

    return (
        <div style={{ display: "flex", padding: "1.5vh 1vh 0 1vh", height: "5em", marginBottom: ".25em" }}>
            <div>
                <h1 style={{ marginBottom: "0", marginTop: "0" }}>{menu ? menu.title : ""}</h1>
                {/* <div className="stars">⭐️⭐️⭐️⭐️⭐️</div> */}
                <div style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "0.5em", textAlign: "right", paddingRight: "2vh", display: "flex" }}>
                    {/* <DownCircleOutlined /> */}
                    <div className="location" style={{ marginLeft: "1vw" }}>📍{menu ? menu.location : ""}</div>
                </div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "0" }}>
                <Button style={{ backgroundColor: "white", color: "black" }} onClick={() => setVisible(true)}>
                    Personalize  ✨
                </Button>
            </div>

            <Drawer
                title={null}
                placement="bottom"
                height="80%"
                closable={true}
                open={visible}
                key="bottom"
                onClose={() => setVisible(false)}
                styles={drawerStyles}
            >
                <FloatButton
                    icon={<CloseOutlined />}
                    style={{ top: "1em", right: "1em", position: "absolute" }}
                    onClick={() => setVisible(false)} />
                {/* <FilterDrawer setVisible={setVisible} /> */}
            </Drawer>
        </div>
    )
}

export default RestaurantInfo