import React, { useEffect, useState } from 'react'
import { Button, Card, Drawer, FloatButton, Image } from "antd";
import Link from 'next/link';
import ItemDrawer from './itemDrawer';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { createStyles, useTheme } from 'antd-style';
import FilterDrawer from './filterDrawer'
import { DownOutlined } from '@ant-design/icons';

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
    const [currentItem, setCurrentItem] = React.useState<any>(null)

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
            height: "0",
            position: "absolute",
            display: "none"
        },
        body: {
            padding: 0,
        },
    };

    const openDrawer = (item: any) => {
        setCurrentItem(item)
        setVisible(true)

    }
    return (
        <div>
            <Card>
                {menuItems.map((item: any) => {
                    return (
                        <Card.Grid key={item.uuid} style={gridStyle} hoverable={false}>
                            {/* <Link href={`/view/menu/${menuId}/item/${item.uuid}`}>
                                
                            </Link> */}
                            <Image
                                src={DB_STORAGE_URL + item.image_url}
                                height={'100%'}
                                width={'100%'}
                                preview={false}
                                onClick={() => openDrawer(item)}
                            />
                        </Card.Grid>
                    )
                })}
            </Card>
            {/* <div style={{ width: "100%", height: "8vh", backgroundColor: "white" }}></div> */}

            <Drawer
                title={null}
                placement="bottom"
                height="80%"
                closable={true}
                open={visible}
                key="bottom"
                onClose={() => setVisible(false)}
                styles={drawerStyles}

            // extra={
            //     <Space>
            //         <Button type="primary" onClick={() => setVisible(false)}>
            //             Add to Order
            //         </Button>
            //     </Space>
            // }
            >
                <FloatButton
                    icon={<DownOutlined />}
                    style={{ top: "1em", right: "1em", position: "absolute" }}
                    onClick={() => setVisible(false)} />
                <ItemDrawer item={currentItem} setVisible={setVisible} />
            </Drawer>

        </div>
    )
}

export default DishGallery