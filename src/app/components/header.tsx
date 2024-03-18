import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { DownOutlined, HeartFilled, HeartOutlined, HeartTwoTone, InfoCircleFilled, InfoCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { Spin, Tag, FloatButton, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { BlurhashImage } from './blurhashImage'
import FavDrawer from './favDrawer'
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel'

type Props = {
    menu: any
}
const DB_STORAGE_URL = process.env.DB_STORAGE_URL

const drawerStyles: DrawerStyles = {
    header: {
        height: "0",
        position: "absolute",
        display: "none"
    },
    body: {
        padding: 0,
    },
};

const Header = (props: Props) => {
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            {props.menu ? <BlurhashImage
                src={props.menu.banner_url ? props.menu.banner_url.includes('amazonaws.com') ? props.menu.banner_url : DB_STORAGE_URL + props.menu.banner_url : "/banner1.png"}
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
                blurhash={props.menu.blurhash}
            /> : ""}

            <div style={{ position: "absolute", top: "0", right: "0", padding: "1em", zIndex: "1" }}>
                <HeartTwoTone style={{ fontSize: "2em", color: "red" }} twoToneColor="red" onClick={() => setVisible(true)} />
            </div>

            <Drawer
                title={null}
                placement="bottom"
                closable={true}
                height="80%"
                open={visible}
                onClose={() => setVisible(false)}
                key="right"
                styles={drawerStyles}
            >
                <FloatButton
                    icon={<DownOutlined />}
                    style={{ top: "1em", right: "1em", position: "absolute" }}
                    onClick={() => setVisible(false)} />
                <FavDrawer />
            </Drawer>

        </div>
    )
}

export default Header