import { ConfigProvider, Tabs, TabsProps } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import DishGalleryV2 from './dishGalleryV2';
import { getMenuCategoriesAnon, getMenuItemsAnon } from '@/utils/supabase/requests';

type Props = {
    menu: any
    dietaryFilter: any
    allergenFilter: any
}

function TabLabel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{ paddingLeft: "10px", paddingRight: "10px", }}>{children}</div>
    )
}

const MenuCategories = (props: Props) => {
    // console.log("MenuCategories props:", props)
    // const menuId = props.menuId
    const [menuItems, setMenuItems] = useState<any[]>([])
    const [categories, setCategories] = useState<any>([])

    const onChange = (key: string) => {
        // console.log(key);
    };

    function onlyUnique(value: any, index: any, array: any) {
        return array.indexOf(value) === index;
    }

    useEffect(() => {
        // Filter items based on dietry and allergen filters here
        console.log("MenuCategories props:", props)

        if (props.menu?.items) {
            let items = props.menu?.items

            if (categories.length === 0) {
                const cats = items.map((i: any) => i.categories?.[0]).filter((i: any) => i !== null && i !== undefined)
                console.log(cats)
                setCategories((prev: any[]) => [...prev, ...cats].filter(onlyUnique))
            }

            setMenuItems(items)

        }

    }, [props])

    return (
        <div className="menu-categories">
            <Tabs
                destroyInactiveTabPane
                defaultActiveKey="0"
                onChange={onChange}
                items={[
                    ...[1].map((_, i) => {
                        return {
                            key: "0",
                            label: <TabLabel>Overview</TabLabel>,
                            children: <DishGalleryV2 filter={"overview"} menuItems={menuItems} menu={props.menu} allergenFilter={props.allergenFilter} dietaryFilter={props.dietaryFilter} />,
                        }
                    }),
                    ...[...categories].map((cat, i) => {
                        const id = String(i + 1);
                        return {
                            key: id,
                            label: <TabLabel>{cat}</TabLabel>,
                            children: <DishGalleryV2 filter={cat} menuItems={menuItems} menu={props.menu} allergenFilter={props.allergenFilter} dietaryFilter={props.dietaryFilter} />,
                        }
                    }),

                ]}
            />
        </div>
    )
}

export default MenuCategories