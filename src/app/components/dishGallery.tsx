import React, { use, useEffect, useState } from 'react'
import { Button, Card, Drawer, FloatButton, Image } from "antd";
import Link from 'next/link';
import ItemDrawer from './itemDrawer';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { createStyles, useTheme } from 'antd-style';
import FilterDrawer from './filterDrawer'
import { DownOutlined } from '@ant-design/icons';
import { BlurhashImage } from './blurhashImage';

const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 0,
    height: '35vw'
};
const DB_STORAGE_URL = process.env.DB_STORAGE_URL


type Props = {
    menu: any,
    menuItems: any[],
    filter: any,
    allergenFilter: any[]
    dietaryFilter: any[]
    setFavorites: any
}

const DishGallery = (props: Props) => {
    const [currentItem, setCurrentItem] = React.useState<any>(null)
    const [filteredItems, setFilteredItems] = React.useState<any[]>([])

    useEffect(() => {
        if (props.menuItems) {
            const menuItems = props.filter === "overview" ? props.menuItems.filter(i => i.on_overview) : props.menuItems.filter(i => i.categories == props.filter)
            if (menuItems.length === 0) {
                console.log("No items found for filter", props.filter)
            } else {
                // console.log("Items found for filter", props.filter)
                let items = menuItems
                items = items.filter((i: any) => !i.archived)
                if (props.allergenFilter.length > 0) {
                    items = items.filter((i: any) => {
                        // Check if none of the allergens in props.allergenFilter are included in i.allergens
                        return props.allergenFilter.every((allergen: any) => !i?.allergens?.includes(allergen));
                    });
                }

                if (props.dietaryFilter.length > 0) {
                    items = items.filter((i: any) => {
                        return props.dietaryFilter.every((dr: any) => i?.dietary_restrictions?.includes(dr));
                    });
                }
                setFilteredItems(items)
            }
        }
    }, [props])

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
            <Card style={{ marginRight: "-1px", }}>
                {filteredItems.map((item: any) => {
                    return (
                        <Card.Grid key={item.id} style={gridStyle} hoverable={false}>
                            {/* <Link href={`/view/menu/${menuId}/item/${item.uuid}`}>
                                
                            </Link> */}
                            <BlurhashImage
                                src={DB_STORAGE_URL + item.image_url}
                                height={'100%'}
                                width={'100%'}
                                style={{ objectFit: "cover" }}
                                blurhash={item.blurhash}
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
                <ItemDrawer item={currentItem} setVisible={setVisible} setFavorites={props.setFavorites} />
            </Drawer>

        </div>
    )
}

export default DishGallery