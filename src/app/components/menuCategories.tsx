import { ConfigProvider, Tabs, TabsProps } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import DishGallery from './dishGallery';
import { getMenuCategoriesAnon, getMenuItemsAnon } from '@/utils/supabase/requests';

type Props = {
    menuId: any
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
    const menuId = props.menuId
    const [menuItems, setMenuItems] = useState<any[]>([])
    const [categories, setCategories] = useState<any>([])

    const onChange = (key: string) => {
        // console.log(key);
    };

    function onlyUnique(value: any, index: any, array: any) {
        return array.indexOf(value) === index;
    }


    console.log(categories)
    useEffect(() => {
        const loadMenuItems = async () => {
            const menuItems = getMenuItemsAnon({ menuId })
            menuItems
                .then(res => {
                    if (res instanceof Array) {
                        setMenuItems(res)
                        if (categories.length === 0) {
                            const cats = res.filter((iCat: any) => iCat?.categories).map(i => i.categories)
                            console.log('cats', cats)
                            setCategories((prev: any[]) => [...prev, ...cats].filter(onlyUnique))

                        }



                    }
                })
        }
        loadMenuItems()
    }, [props])

    return (
        <div className="menu-categories">
            <Tabs
                defaultActiveKey="0"
                onChange={onChange}
                items={[
                    ...[1].map((_, i) => {
                        return {
                            key: "0",
                            label: <TabLabel>Overview</TabLabel>,
                            children: <DishGallery filter={"overview"} menuItems={menuItems} menuId={menuId} />,
                        }
                    }),
                    ...[...categories].map((cat, i) => {
                        const id = String(i + 1);
                        return {
                            key: id,
                            label: <TabLabel>{cat}</TabLabel>,
                            children: <DishGallery filter={cat} menuItems={menuItems} menuId={menuId} />,
                        }
                    }),

                ]}
            />
        </div>
    )
}

export default MenuCategories