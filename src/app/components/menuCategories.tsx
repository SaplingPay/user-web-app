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
// const items: TabsProps['items'] = [
//     {
//         key: '1',
//         label: <TabLabel>Overview</TabLabel>,
//         children: <DishGallery filter="Overview" />
//     },
//     {
//         key: '2',
//         label: <TabLabel>Specials</TabLabel>,
//         children: <DishGallery filter="Special" testAmount={1} />
//     },
//     {
//         key: '3',
//         label: <TabLabel>Appetizers</TabLabel>,
//         children: <DishGallery filter="Appetizers" testAmount={3} />
//     },
//     {
//         key: '4',
//         label: <TabLabel>Main Dishes</TabLabel>,
//         children: <DishGallery filter="Main-Dishes" testAmount={4} />
//     },
//     {
//         key: '5',
//         label: <TabLabel>Sides</TabLabel>,
//         children: <DishGallery filter="Sides" testAmount={7} />
//     },
//     {
//         key: '6',
//         label: <TabLabel>Drinks</TabLabel>,
//         children: <DishGallery filter="Drinks" testAmount={10} />
//     },
// ];

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

                    console.log("owkring", res)
                    if (res instanceof Array) {
                        setMenuItems(res)
                        // console.log("owkring 1", res)
                        if (categories.length === 0) {
                            const cats = res.filter((iCat: any) => iCat?.categories).map(i => i.categories)
                            console.log('cats', cats)
                            setCategories((prev: any[]) => [...prev, ...cats].filter(onlyUnique))

                        }



                    }
                })
            // console.log(menuId)
            // const menuCategories = getMenuCategoriesAnon({ menuId })
            // menuCategories
            //     .then(res => {
            //         console.log("cat: ", res)
            //         // if (res instanceof Array) {
            //         //     setMenuItems(res)
            //         // }
            //     })

        }
        loadMenuItems()
    }, [props])

    return (
        <div className="menu-categories">
            <Tabs
                defaultActiveKey="0"
                onChange={onChange}
                // items={items}
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