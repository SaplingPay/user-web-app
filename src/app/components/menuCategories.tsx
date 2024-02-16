import { ConfigProvider, Tabs, TabsProps } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
import DishGallery from './dishGallery';

type Props = {}

function TabLabel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{ paddingLeft: "10px", paddingRight: "10px", }}>{children}</div>
    )
}
const items: TabsProps['items'] = [
    {
        key: '1',
        label: <TabLabel>Overview</TabLabel>,
        children: <DishGallery testAmount={50} />
    },
    {
        key: '2',
        label: <TabLabel>Specials</TabLabel>,
        children: <DishGallery testAmount={1} />
    },
    {
        key: '3',
        label: <TabLabel>Appetizers</TabLabel>,
        children: <DishGallery testAmount={3} />
    },
    {
        key: '4',
        label: <TabLabel>Main Dishes</TabLabel>,
        children: <DishGallery testAmount={4} />
    },
    {
        key: '5',
        label: <TabLabel>Sides</TabLabel>,
        children: <DishGallery testAmount={7} />
    },
    {
        key: '6',
        label: <TabLabel>Drinks</TabLabel>,
        children: <DishGallery testAmount={10} />
    },
];

const MenuCategories = (props: Props) => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <div className="menu-categories">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default MenuCategories