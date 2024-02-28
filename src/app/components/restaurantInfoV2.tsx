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
    menu: any
    setAllergenFilter: any;
    setDietaryFilter: any;
}

const RestaurantInfo = (props: Props) => {
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
        <div style={{ display: "flex", padding: "1.5vh 1vh 0 1vh", height: "3em", marginBottom: ".25em" }}>
            <div>
                <h2 style={{ marginBottom: "0", marginTop: "0" }}>{props.menu ? props.menu.name : ""}</h2>
                {/* <div className="stars">⭐️⭐️⭐️⭐️⭐️</div> */}
                <div style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "0", textAlign: "right", paddingRight: "2vh", display: "flex" }}>
                    {/* <DownCircleOutlined /> */}
                    <div className="location" style={{ marginLeft: "1vw", fontSize: "1em" }}>📍{props.menu ? props.menu.location : ""}</div>
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
                <FilterDrawer setVisible={setVisible} setAllergenFilter={props.setAllergenFilter} setDietaryFilter={props.setDietaryFilter} menu={props.menu} />
            </Drawer>
        </div>
    )
}

export default RestaurantInfo